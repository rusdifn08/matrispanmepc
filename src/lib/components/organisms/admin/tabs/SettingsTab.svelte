<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import {
    productsStore,
    ordersStore,
    supplierRequestsStore,
    invoicesStore,
    currentUser,
    securityAuditLogs,
    securityReport,
    authActions,
    toastAction,
  } from '../../../../stores';
  import { formatDate } from '../../../../utils';
  import { BACKEND_URL } from '../../../../api/client';

  export let lastSyncTime: string = '';

  const dispatch = createEventDispatcher<{
    sync: void;
    testChime: void;
  }>();
</script>

<div class="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
  <!-- Corporate Info -->
  <div class="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
    <h3 class="text-base font-bold text-[#0B2D24] font-heading flex items-center gap-2">
      <svg class="w-5 h-5 text-[#C88A2E]" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd"/>
      </svg>
      Identitas Perusahaan & Rekening Devisa Ekspor
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
      <div class="p-4 rounded-2xl bg-[#F8F6F0] space-y-1.5">
        <span class="text-gray-400 block text-[10px] uppercase font-bold">Entitas Hukum Ekspor</span>
        <div class="font-bold text-gray-900 text-sm">PT. MATRISPAN EXIM PHOENIX CORP</div>
        <div class="text-gray-600">NIB: 2026-EXIM-PHOENIX-01</div>
        <div class="text-gray-600">Alamat: Jl. Ir. H. Juanda No. 21 LK. II, Kota Binjai, Sumatera Utara 20714</div>
        <div class="text-gray-600">Hub Pelabuhan: Pelabuhan Internasional Belawan (IDBLW)</div>
      </div>

      <div class="p-4 rounded-2xl bg-[#F8F6F0] space-y-1.5">
        <span class="text-gray-400 block text-[10px] uppercase font-bold">Instruksi Pembayaran Mandiri USD FX</span>
        <div class="font-bold text-gray-900 text-sm">PT. BANK MANDIRI (PERSERO) TBK</div>
        <div class="text-gray-700 font-mono font-bold">A/C: 106-00-1899214-7 (USD / IDR FX)</div>
        <div class="text-gray-700 font-mono">SWIFT Code: BMRIIDJA</div>
        <div class="text-gray-600">Cabang: KCP Binjai Juanda, Sumatera Utara</div>
      </div>
    </div>
  </div>

  <!-- System & Connectivity Status -->
  <div class="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
    <h3 class="text-base font-bold text-[#0B2D24] font-heading flex items-center gap-2">
      <svg class="w-5 h-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
      Status Integrasi Backend Axum & Polling Real-Time
    </h3>

    <div class="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <div class="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          REST API {BACKEND_URL} Siap Siaga
        </div>
        <p class="text-[11px] text-emerald-700 mt-0.5">
          Sinkronisasi otomatis setiap 8 detik. Terakhir disinkronkan pukul: <strong>{lastSyncTime}</strong> WIB.
        </p>
      </div>

      <button
        type="button"
        on:click={() => dispatch('sync')}
        class="px-4 py-2 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition-colors whitespace-nowrap self-start sm:self-center"
      >
        Sinkronisasi Manual
      </button>
    </div>

    <!-- Sound notification toggle & test -->
    <div class="p-4 rounded-2xl border border-gray-200 bg-gray-50 flex items-center justify-between">
      <div>
        <div class="text-xs font-bold text-gray-800">Notifikasi Audio Lonceng (Chime)</div>
        <p class="text-[11px] text-gray-500">
          Berbunyi saat order baru, pengajuan suplai, atau inquiry masuk tercatat.
        </p>
      </div>

      <button
        type="button"
        on:click={() => dispatch('testChime')}
        class="px-3.5 py-2 rounded-xl bg-white border border-gray-300 font-bold text-xs text-gray-700 hover:bg-gray-100"
      >
        Tes Suara Chime
      </button>
    </div>
  </div>

  <!-- NEONDB POSTGRESQL CLUSTER STATUS -->
  <div class="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
    <div class="flex items-center justify-between">
      <h3 class="text-base font-bold text-[#0B2D24] font-heading flex items-center gap-2">
        <svg class="w-5 h-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"/>
          <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"/>
          <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z"/>
        </svg>
        Koneksi Database Cloud NeonDB PostgreSQL
      </h3>
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        Online & Terenkripsi TLS
      </span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
      <div class="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 space-y-1">
        <span class="text-gray-400 block text-[10px] uppercase font-bold">Host Cluster Pooler</span>
        <div class="font-mono text-gray-900 font-bold truncate">ep-rough-cherry-b373m82z-pooler.c-4.ap-southeast-1.aws.neon.tech</div>
        <div class="text-gray-500 text-[11px]">Region: AWS Singapore (ap-southeast-1)</div>
      </div>

      <div class="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 space-y-1">
        <span class="text-gray-400 block text-[10px] uppercase font-bold">Protokol Keamanan Database</span>
        <div class="font-mono text-emerald-700 font-bold">sslmode=require & channel_binding=require</div>
        <div class="text-gray-500 text-[11px]">Rust TLS Driver: rustls-webpki / tokio-pg</div>
      </div>
    </div>

    <!-- Relational Entities Overview -->
    <div class="p-4 rounded-2xl bg-[#0B2D24] text-white">
      <span class="text-[10px] font-mono text-[#C88A2E] uppercase font-bold block mb-2">
        Tabel & Model Data Riil di NeonDB:
      </span>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div class="p-2.5 rounded-xl bg-white/10 border border-white/10">
          <div class="text-base font-bold text-amber-300">{$productsStore.length}</div>
          <div class="text-[10px] text-gray-300 font-mono">products</div>
        </div>
        <div class="p-2.5 rounded-xl bg-white/10 border border-white/10">
          <div class="text-base font-bold text-amber-300">{$ordersStore.length}</div>
          <div class="text-[10px] text-gray-300 font-mono">buyer_orders</div>
        </div>
        <div class="p-2.5 rounded-xl bg-white/10 border border-white/10">
          <div class="text-base font-bold text-amber-300">{$supplierRequestsStore.length}</div>
          <div class="text-[10px] text-gray-300 font-mono">supplier_requests</div>
        </div>
        <div class="p-2.5 rounded-xl bg-white/10 border border-white/10">
          <div class="text-base font-bold text-amber-300">{$invoicesStore.length}</div>
          <div class="text-[10px] text-gray-300 font-mono">invoices</div>
        </div>
      </div>
    </div>
  </div>

  <!-- ACTIVE STAFF PROFILE & RBAC -->
  {#if $currentUser}
    <div class="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
      <h3 class="text-base font-bold text-[#0B2D24] font-heading flex items-center gap-2">
        <svg class="w-5 h-5 text-[#C88A2E]" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
        </svg>
        Profil Karyawan Aktif & Hak Akses (RBAC)
      </h3>

      <div class="p-4 rounded-2xl bg-[#F8F6F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-[#0B2D24] text-white flex items-center justify-center font-bold text-lg border-2 border-[#C88A2E]">
            {$currentUser.name.charAt(0)}
          </div>
          <div>
            <div class="font-bold text-gray-900 text-sm">{$currentUser.name}</div>
            <div class="text-xs text-gray-600">{$currentUser.email} • {$currentUser.phone || '-'}</div>
            <div class="text-xs text-[#0B2D24] font-medium">{$currentUser.department}</div>
          </div>
        </div>

        <div class="flex flex-col items-start sm:items-end gap-1">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-900 font-mono font-bold text-xs border border-amber-300">
              NIK: {$currentUser.nik}
            </span>
            <span class="px-2.5 py-1 rounded-xl bg-[#0B2D24] text-white font-bold text-xs">
              {$currentUser.role}
            </span>
          </div>
          <span class="text-[10px] text-gray-400">
            Status: Terverifikasi Aktif di NeonDB
          </span>
        </div>
      </div>

      <div>
        <span class="text-[10px] uppercase font-bold text-gray-400 block mb-1.5">
          Daftar Izin & Otoritas Sistem (Granular Permissions):
        </span>
        <div class="flex flex-wrap gap-1.5">
          {#each $currentUser.permissions as perm}
            <span class="px-2 py-0.5 rounded-lg bg-gray-100 text-gray-700 font-mono text-[11px] border border-gray-200">
              {perm}
            </span>
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <!-- SECURITY AUDIT CENTER & AUTOMATED SECURITY TESTING -->
  <div class="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h3 class="text-base font-bold text-[#0B2D24] font-heading flex items-center gap-2">
          <svg class="w-5 h-5 text-rose-600" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          Pusat Audit Keamanan & Hasil Pengujian Keamanan
        </h3>
        <p class="text-xs text-gray-500 mt-0.5">
          Pengujian penetrasi otomatis, pertahanan SQL injection, enkripsi kata sandi, dan jejak audit aktivitas internal.
        </p>
      </div>

      <button
        type="button"
        on:click={() => {
          authActions.loadSecurityData();
          toastAction.show('Menjalankan audit keamanan dan pembaruan log...', 'info');
        }}
        class="px-4 py-2 rounded-xl bg-gray-900 text-white font-bold text-xs hover:bg-black transition-colors flex items-center gap-1.5 self-start sm:self-center"
      >
        <svg class="w-3.5 h-3.5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
        </svg>
        <span>Uji Ulang Keamanan</span>
      </button>
    </div>

    <!-- Security Score Banner -->
    {#if $securityReport}
      <div class="p-4 rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span class="text-[10px] uppercase font-mono text-emerald-300 font-bold block">Skor Keamanan Enterprise</span>
          <div class="text-xl font-bold font-heading text-emerald-400">
            {$securityReport.security_score}
          </div>
          <div class="text-xs text-gray-300 mt-0.5">
            Basis Data: {$securityReport.database_backend}
          </div>
        </div>

        <div class="flex flex-wrap gap-1.5 text-[10px]">
          {#each $securityReport.active_roles as roleStat}
            <span class="px-2 py-0.5 rounded-md bg-white/10 text-emerald-200 font-mono">
              {roleStat}
            </span>
          {/each}
        </div>
      </div>

      <div class="space-y-2">
        {#each $securityReport.security_tests as testItem}
          <div class="p-3 rounded-xl border border-gray-200 bg-gray-50 flex items-start justify-between gap-3 text-xs">
            <div>
              <div class="font-bold text-gray-800">{testItem.test}</div>
              <div class="text-gray-500 text-[11px] mt-0.5">{testItem.details}</div>
            </div>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-black {testItem.status === 'PASSED' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
              {testItem.status}
            </span>
          </div>
        {/each}
      </div>
    {/if}

    <!-- Security Audit Logs Table -->
    <div class="pt-2 space-y-2">
      <span class="text-xs font-bold text-gray-800 block">
        Jejak Audit Aktivitas Internal (Tercatat di NeonDB):
      </span>

      {#if $securityAuditLogs.length === 0}
        <div class="p-4 rounded-xl bg-gray-50 text-center text-xs text-gray-400">
          Memuat riwayat log audit dari NeonDB...
        </div>
      {:else}
        <div class="overflow-x-auto rounded-2xl border border-gray-200">
          <table class="w-full text-left text-xs">
            <thead class="bg-gray-100 text-gray-600 font-bold uppercase text-[10px]">
              <tr>
                <th class="p-3">Waktu (WIB)</th>
                <th class="p-3">NIK / User</th>
                <th class="p-3">Tindakan</th>
                <th class="p-3">Tingkat</th>
                <th class="p-3">Rincian</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              {#each $securityAuditLogs.slice(0, 8) as log}
                <tr class="hover:bg-gray-50">
                  <td class="p-3 font-mono text-[11px] text-gray-500 whitespace-nowrap">
                    {formatDate(log.created_at)}
                  </td>
                  <td class="p-3 whitespace-nowrap">
                    <span class="font-bold text-gray-900">{log.user_nik || 'SYSTEM'}</span>
                    {#if log.user_email}
                      <span class="block text-[10px] text-gray-400">{log.user_email}</span>
                    {/if}
                  </td>
                  <td class="p-3 font-mono font-bold text-[11px] text-indigo-700 whitespace-nowrap">
                    {log.action}
                  </td>
                  <td class="p-3 whitespace-nowrap">
                    <span class="px-2 py-0.5 rounded-md text-[10px] font-black {log.severity === 'INFO' ? 'bg-blue-50 text-blue-700' : log.severity === 'WARN' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'}">
                      {log.severity}
                    </span>
                  </td>
                  <td class="p-3 text-[11px] text-gray-600 max-w-xs truncate">
                    {log.details ? JSON.stringify(log.details) : '-'}
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>
  </div>
</div>
