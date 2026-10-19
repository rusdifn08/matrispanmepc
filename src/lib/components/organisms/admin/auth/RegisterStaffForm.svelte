<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { authActions, toastAction } from '../../../../stores';
  import GoldButton from '../../../atoms/buttons/GoldButton.svelte';
  import PasswordStrengthMeter from './PasswordStrengthMeter.svelte';

  const dispatch = createEventDispatcher<{
    success: { name: string; nik: string };
    error: string;
    switchToLogin: void;
  }>();

  let regNik = 'MEPC-EXP-';
  let regName = '';
  let regEmail = '';
  let regPhone = '';
  let regDepartment = 'Divisi Pemasaran & Operasional Ekspor';
  let regRole = 'EXPORT_STAFF';
  let regPassword = '';
  let showRegPassword = false;
  let isSubmitting = false;

  $: isNikValid = /^MEPC-[A-Z0-9]{3,4}-[0-9]{3}$/i.test(regNik.trim());

  async function handleRegister() {
    if (!regNik.trim() || !regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      dispatch('error', 'Seluruh bidang berbintang wajib diisi!');
      return;
    }

    if (!isNikValid) {
      dispatch('error', 'Format NIK tidak valid! Gunakan format MEPC-DIV-XXX (Contoh: MEPC-EXP-088 atau MEPC-LOG-015).');
      return;
    }

    if (regPassword.length < 8) {
      dispatch('error', 'Password wajib memiliki panjang minimal 8 karakter!');
      return;
    }

    isSubmitting = true;
    try {
      await authActions.register({
        nik: regNik.trim().toUpperCase(),
        name: regName.trim(),
        email: regEmail.trim(),
        password: regPassword,
        department: regDepartment,
        role: regRole,
        phone: regPhone.trim() || undefined,
      });
      dispatch('success', { name: regName, nik: regNik.toUpperCase() });
    } catch (err: any) {
      const errMsg = err.message || 'Pendaftaran akun staf gagal diproses.';
      dispatch('error', errMsg);
      toastAction.show(errMsg, 'error');
    } finally {
      isSubmitting = false;
    }
  }
</script>

<form on:submit|preventDefault={handleRegister} class="space-y-3.5">
  <div class="p-3 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 text-xs">
    <strong class="font-bold block mb-0.5">Ketentuan Registrasi Karyawan:</strong>
    NIK (Nomor Induk Karyawan) terikat dengan SK resmi dan database kepegawaian internal PT. MEPC.
  </div>

  <!-- NIK Input -->
  <div>
    <div class="flex items-center justify-between mb-1">
      <label for="reg-nik" class="text-xs font-semibold text-gray-700">
        Nomor Induk Karyawan (NIK) *
      </label>
      {#if regNik.length > 8}
        <span class="text-[10px] font-bold {isNikValid ? 'text-emerald-600' : 'text-rose-500'}">
          {isNikValid ? '✓ Format NIK Valid' : 'Format: MEPC-DIV-001'}
        </span>
      {/if}
    </div>
    <div class="relative">
      <input
        id="reg-nik"
        type="text"
        bind:value={regNik}
        placeholder="MEPC-EXP-088"
        class="w-full pl-10 pr-4 py-2 text-xs sm:text-sm font-mono uppercase rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E]"
        required
      />
      <svg class="w-4 h-4 text-gray-400 absolute left-3.5 top-2.5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2 5a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
      </svg>
    </div>
    <span class="text-[10px] text-gray-400 block mt-0.5">
      Format: <code>MEPC-DIV-XXX</code> (Contoh: MEPC-EXP-088, MEPC-LOG-012, MEPC-FIN-005)
    </span>
  </div>

  <!-- Nama Lengkap -->
  <div>
    <label for="reg-name" class="text-xs font-semibold text-gray-700 block mb-1">
      Nama Lengkap Karyawan *
    </label>
    <input
      id="reg-name"
      type="text"
      bind:value={regName}
      placeholder="Contoh: Ahmad Fadhilah, S.T."
      class="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E]"
      required
    />
  </div>

  <!-- Email & Telepon -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
    <div>
      <label for="reg-email" class="text-xs font-semibold text-gray-700 block mb-1">
        Email Dinas Perusahaan *
      </label>
      <input
        id="reg-email"
        type="email"
        bind:value={regEmail}
        placeholder="ahmad@matrispanmepc.com"
        class="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E]"
        required
      />
    </div>

    <div>
      <label for="reg-phone" class="text-xs font-semibold text-gray-700 block mb-1">
        No. Telepon / WhatsApp
      </label>
      <input
        id="reg-phone"
        type="tel"
        bind:value={regPhone}
        placeholder="+62 812-3456-7890"
        class="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E]"
      />
    </div>
  </div>

  <!-- Bagian / Departemen & Jabatan / Role RBAC -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
    <div>
      <label for="reg-dept" class="text-xs font-semibold text-gray-700 block mb-1">
        Bagian / Departemen *
      </label>
      <select
        id="reg-dept"
        bind:value={regDepartment}
        class="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E]"
        required
      >
        <option value="Direksi & Manajemen Eksekutif">Direksi & Manajemen Eksekutif</option>
        <option value="Divisi Pemasaran & Operasional Ekspor">Divisi Pemasaran & Operasional Ekspor</option>
        <option value="Divisi Logistik, Surveyor & Muatan Pelabuhan">Divisi Logistik & Muatan Pelabuhan</option>
        <option value="Divisi Sourcing & Kemitraan Petani">Divisi Sourcing & Kemitraan Petani</option>
        <option value="Divisi Keuangan & Devisa Kargo">Divisi Keuangan & Devisa Kargo</option>
      </select>
    </div>

    <div>
      <label for="reg-role" class="text-xs font-semibold text-gray-700 block mb-1">
        Jabatan / Tingkat Akses (RBAC) *
      </label>
      <select
        id="reg-role"
        bind:value={regRole}
        class="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E]"
        required
      >
        <option value="EXPORT_STAFF">Staff Operasional Ekspor</option>
        <option value="EXPORT_MANAGER">Manajer Operasional Ekspor</option>
        <option value="LOGISTICS_OFFICER">Staff Logistik Pelabuhan Belawan</option>
        <option value="SOURCING_OFFICER">Staff Sourcing & Kemitraan Petani</option>
        <option value="FINANCE_OFFICER">Staff Keuangan & Devisa Kargo</option>
        <option value="SUPER_ADMIN">Owner & Direktur Utama (Akses Penuh)</option>
      </select>
    </div>
  </div>

  <!-- Password -->
  <div>
    <label for="reg-pass" class="text-xs font-semibold text-gray-700 block mb-1">
      Password Baru *
    </label>
    <div class="relative">
      <input
        id="reg-pass"
        type={showRegPassword ? 'text' : 'password'}
        bind:value={regPassword}
        placeholder="Minimal 8 karakter unik..."
        class="w-full pl-10 pr-10 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E]"
        required
      />
      <svg class="w-4 h-4 text-gray-400 absolute left-3.5 top-2.5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
      </svg>

      <button
        type="button"
        on:click={() => (showRegPassword = !showRegPassword)}
        class="absolute right-3.5 top-2.5 text-gray-400 hover:text-gray-600"
        aria-label="Toggle password"
      >
        {#if showRegPassword}
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
          </svg>
        {:else}
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
          </svg>
        {/if}
      </button>
    </div>

    <!-- Password strength meter -->
    <PasswordStrengthMeter password={regPassword} />
  </div>

  <div class="pt-2">
    <GoldButton
      type="submit"
      size="md"
      className="w-full py-3"
      disabled={isSubmitting || !isNikValid}
    >
      {#if isSubmitting}
        <span class="inline-flex items-center gap-2">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Mendaftarkan ke NeonDB Cloud...
        </span>
      {:else}
        Daftarkan Akun Karyawan & Dapatkan Akses
      {/if}
    </GoldButton>
  </div>

  <!-- Direct Login Link under Register button (no card wrapper) -->
  <div class="text-center pt-2 text-xs text-gray-600">
    Sudah punya akun?
    <button
      type="button"
      on:click={() => dispatch('switchToLogin')}
      class="text-blue-600 hover:text-blue-700 font-semibold hover:underline ml-1"
    >
      Masuk Disini
    </button>
  </div>
</form>
