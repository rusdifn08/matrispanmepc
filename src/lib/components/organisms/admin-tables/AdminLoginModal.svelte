<script lang="ts">
  import { isAdminLoginModalOpen } from '../../../stores';
  import PhoenixLogo from '../../atoms/icons/PhoenixLogo.svelte';
  import LoginForm from '../admin/auth/LoginForm.svelte';
  import RegisterStaffForm from '../admin/auth/RegisterStaffForm.svelte';

  export let onSuccess: () => void = () => {};

  let activeTab: 'login' | 'signup' = 'login';
  let errorMessage = '';
  let successMessage = '';

  function closeModal() {
    isAdminLoginModalOpen.set(false);
    activeTab = 'login';
    errorMessage = '';
    successMessage = '';
  }

  function handleLoginSuccess() {
    closeModal();
    onSuccess();
  }

  function handleRegisterSuccess(event: CustomEvent<{ name: string; nik: string }>) {
    successMessage = `Registrasi staf ${event.detail.name} (NIK: ${event.detail.nik}) berhasil!`;
    closeModal();
    onSuccess();
  }
</script>

{#if $isAdminLoginModalOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
    <div class="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
      
      <!-- Top Header (No extra database status badges) -->
      <div class="bg-[#0B2D24] text-white p-5 sm:p-6 text-center border-b border-[#C88A2E]/40 relative flex-shrink-0">
        <button
          type="button"
          on:click={closeModal}
          class="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
          aria-label="Tutup"
        >
          <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>

        <div class="flex justify-center mb-2.5">
          <PhoenixLogo size="md" variant="light" />
        </div>
        <h3 class="text-base sm:text-lg font-bold font-heading text-white">
          {activeTab === 'login' ? 'Sistem Portal Internal PT. MEPC' : 'Registrasi Karyawan PT. MEPC'}
        </h3>
        <p class="text-xs text-amber-200/80 mt-0.5">
          {activeTab === 'login' ? 'Silakan masukkan NIK / Akun resmi Anda untuk masuk' : 'Lengkapi data kepegawaian resmi untuk mendaftar akun'}
        </p>
      </div>

      <!-- Scrollable Form Body -->
      <div class="p-5 sm:p-6 overflow-y-auto space-y-4">
        {#if errorMessage}
          <div class="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <svg class="w-4 h-4 text-rose-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            <span>{errorMessage}</span>
          </div>
        {/if}

        {#if successMessage}
          <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <svg class="w-4 h-4 text-emerald-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span>{successMessage}</span>
          </div>
        {/if}

        {#if activeTab === 'login'}
          <LoginForm
            on:success={handleLoginSuccess}
            on:error={(e) => (errorMessage = e.detail)}
            on:switchToRegister={() => { activeTab = 'signup'; errorMessage = ''; }}
          />
        {:else}
          <RegisterStaffForm
            on:success={handleRegisterSuccess}
            on:error={(e) => (errorMessage = e.detail)}
            on:switchToLogin={() => { activeTab = 'login'; errorMessage = ''; }}
          />
        {/if}
      </div>

      <!-- Footer Info -->
      <div class="p-3 bg-gray-50 border-t border-gray-100 text-center flex-shrink-0">
        <span class="text-[11px] text-gray-500">
          PT. Matrispan Exim Phoenix Corp • Portal Resmi Kepegawaian & Operasional B2B.
        </span>
      </div>

    </div>
  </div>
{/if}
