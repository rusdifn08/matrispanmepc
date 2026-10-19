<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { authActions, toastAction } from '../../../../stores';
  import GoldButton from '../../../atoms/buttons/GoldButton.svelte';

  const dispatch = createEventDispatcher<{
    success: void;
    error: string;
    switchToRegister: void;
  }>();

  let loginIdentifier = '';
  let loginPassword = '';
  let showLoginPassword = false;
  let isSubmitting = false;

  async function handleLogin() {
    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      dispatch('error', 'Harap isi NIK / Email / Username dan Password Anda!');
      return;
    }

    isSubmitting = true;
    try {
      await authActions.login(loginIdentifier.trim(), loginPassword.trim());
      dispatch('success');
    } catch (err: any) {
      const errMsg = err.message || 'Login gagal. Periksa kembali NIK dan password Anda.';
      dispatch('error', errMsg);
      toastAction.show(errMsg, 'error');
    } finally {
      isSubmitting = false;
    }
  }
</script>

<form on:submit|preventDefault={handleLogin} class="space-y-4">
  <div>
    <label for="login-id" class="text-xs font-semibold text-gray-700 block mb-1">
      NIK Karyawan, Email Resmi, atau Username
    </label>
    <div class="relative">
      <input
        id="login-id"
        type="text"
        bind:value={loginIdentifier}
        placeholder="Contoh: MEPC-DIR-001 atau admin"
        class="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E]"
        required
      />
      <svg class="w-4 h-4 text-gray-400 absolute left-3.5 top-3" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
      </svg>
    </div>
    <span class="text-[10px] text-gray-400 block mt-1">
      Bisa menggunakan NIK (MEPC-XXX-XXX), email terdaftar, atau username.
    </span>
  </div>

  <div>
    <label for="login-pass" class="text-xs font-semibold text-gray-700 block mb-1">
      Password
    </label>
    <div class="relative">
      <input
        id="login-pass"
        type={showLoginPassword ? 'text' : 'password'}
        bind:value={loginPassword}
        placeholder="Masukkan password Anda"
        class="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E]"
        required
      />
      <svg class="w-4 h-4 text-gray-400 absolute left-3.5 top-3" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
      </svg>

      <button
        type="button"
        on:click={() => (showLoginPassword = !showLoginPassword)}
        class="absolute right-3.5 top-3 text-gray-400 hover:text-gray-600"
        aria-label="Toggle password"
      >
        {#if showLoginPassword}
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
  </div>

  <div class="pt-2">
    <GoldButton
      type="submit"
      size="md"
      className="w-full py-3"
      disabled={isSubmitting}
    >
      {#if isSubmitting}
        <span class="inline-flex items-center gap-2">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Memvalidasi Akun...
        </span>
      {:else}
        Sign In
      {/if}
    </GoldButton>
  </div>

  <!-- Direct Register Link under Sign In button (no card wrapper) -->
  <div class="text-center pt-2 text-xs text-gray-600">
    Belum ada akun,
    <button
      type="button"
      on:click={() => dispatch('switchToRegister')}
      class="text-blue-600 hover:text-blue-700 font-semibold hover:underline ml-1"
    >
      Daftar Disini
    </button>
  </div>
</form>
