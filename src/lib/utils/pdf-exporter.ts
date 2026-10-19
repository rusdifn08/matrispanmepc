import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PdfExportOptions {
  filename: string;
  orientation?: 'portrait' | 'landscape';
  title?: string;
  autoDownload?: boolean;
}

/**
 * Robust High-Resolution PDF Exporter using jsPDF + html2canvas
 * Converts any DOM element into an authentic, downloadable A4 PDF document.
 */
export async function exportElementToPdf(
  elementId: string,
  options: PdfExportOptions
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Elemen dengan ID "${elementId}" tidak ditemukan.`);
    return false;
  }

  const orientation = options.orientation || 'portrait';
  const filename = options.filename.endsWith('.pdf') ? options.filename : `${options.filename}.pdf`;

  // Temporarily ensure element styles are optimal for rendering
  const prevOverflow = element.style.overflow;
  element.style.overflow = 'visible';

  try {
    const canvas = await html2canvas(element, {
      scale: 2, // High resolution (Retina/Print quality)
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: orientation === 'landscape' ? 1440 : 1024,
    });

    element.style.overflow = prevOverflow;

    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    const pdf = new jsPDF({
      orientation: orientation,
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfPageWidth = pdf.internal.pageSize.getWidth();
    const pdfPageHeight = pdf.internal.pageSize.getHeight();

    const marginX = 8; // 8mm margin
    const marginY = 8;
    const contentWidth = pdfPageWidth - marginX * 2;
    const contentHeight = (canvas.height * contentWidth) / canvas.width;

    let heightLeft = contentHeight;
    let position = marginY;

    // First page
    pdf.addImage(imgData, 'JPEG', marginX, position, contentWidth, contentHeight);
    heightLeft -= (pdfPageHeight - marginY * 2);

    // Multi-page handling for long tables or multi-page documents
    while (heightLeft > 0) {
      position = heightLeft - contentHeight + marginY;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', marginX, position, contentWidth, contentHeight);
      heightLeft -= (pdfPageHeight - marginY * 2);
    }

    // Save/Download PDF directly to client machine
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Gagal menghasilkan file PDF:', error);
    element.style.overflow = prevOverflow;
    return false;
  }
}

/**
 * Isolated Clean Print Tool
 * Creates an isolated hidden iframe containing only the target printable element
 * to guarantee that zero background elements, toasts, or navbars are printed.
 */
export function printElementIsolated(
  elementId: string,
  title: string,
  orientation: 'portrait' | 'landscape' = 'portrait'
) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Elemen "${elementId}" tidak ditemukan.`);
    window.print();
    return;
  }

  // Create isolated iframe
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    window.print();
    return;
  }

  // Extract all stylesheets from parent document
  const styleSheets = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .map((s) => s.outerHTML)
    .join('\n');

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html lang="id">
      <head>
        <meta charset="utf-8" />
        <title>${title}</title>
        ${styleSheets}
        <style>
          @page {
            size: A4 ${orientation};
            margin: 8mm 10mm;
          }
          html, body {
            background: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
            height: auto !important;
            width: 100% !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print { display: none !important; }
          table { width: 100% !important; page-break-inside: auto; }
          tr { page-break-inside: avoid; page-break-after: auto; }
          thead { display: table-header-group; }
        </style>
      </head>
      <body>
        <div style="width: 100%; max-width: 100%; margin: 0; padding: 0;">
          ${element.innerHTML}
        </div>
      </body>
    </html>
  `);
  doc.close();

  iframe.contentWindow?.focus();
  setTimeout(() => {
    try {
      iframe.contentWindow?.print();
    } catch (e) {
      console.warn('Iframe print fallback to window.print', e);
      window.print();
    } finally {
      setTimeout(() => {
        if (iframe.parentNode) {
          iframe.parentNode.removeChild(iframe);
        }
      }, 2000);
    }
  }, 500);
}
