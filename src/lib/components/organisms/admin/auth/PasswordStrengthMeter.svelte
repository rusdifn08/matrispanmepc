<script lang="ts">
  export let password: string = '';

  $: strength = calculatePasswordStrength(password);

  function calculatePasswordStrength(pass: string): { score: number; label: string; color: string } {
    if (!pass) return { score: 0, label: 'Belum diisi', color: 'bg-gray-200' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 25, label: 'Lemah (min. 8 char & angka)', color: 'bg-rose-500' };
    if (score === 2) return { score: 50, label: 'Sedang (tambahkan simbol/huruf besar)', color: 'bg-amber-500' };
    if (score === 3) return { score: 75, label: 'Kuat (standar perbankan aman)', color: 'bg-teal-500' };
    return { score: 100, label: 'Sangat Kuat (Enterprise Grade)', color: 'bg-emerald-500' };
  }
</script>

<div class="mt-1.5 space-y-1">
  <div class="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
    <div
      class="h-full transition-all duration-300 {strength.color}"
      style="width: {strength.score}%"
    ></div>
  </div>
  <div class="flex items-center justify-between text-[10px] text-gray-500">
    <span>Kekuatan Password: <strong>{strength.label}</strong></span>
    <span>Enkripsi: Bcrypt Cost 10</span>
  </div>
</div>
