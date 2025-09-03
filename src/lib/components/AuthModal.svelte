<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { auth } from '$lib/stores';

  export let show = false;
  export let mode: 'login' | 'register' = 'login';

  const dispatch = createEventDispatcher();

  let formData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  let isSubmitting = false;
  let errors: Record<string, string> = {};

  $: if (mode === 'login') {
    formData.firstName = '';
    formData.lastName = '';
    formData.confirmPassword = '';
  }

  // Validation du formulaire
  function validateForm(): boolean {
    errors = {};

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'register') {
      if (!formData.firstName.trim()) {
        errors.firstName = 'First name is required';
      }

      if (!formData.lastName.trim()) {
        errors.lastName = 'Last name is required';
      }

      if (!formData.confirmPassword.trim()) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }

    return Object.keys(errors).length === 0;
  }

  // Gestionnaire de soumission
  async function handleSubmit(event: Event) {
    event.preventDefault();

    if (!validateForm()) return;

    isSubmitting = true;

    try {
      if (mode === 'login') {
        await auth.login(formData.email, formData.password);
        dispatch('login', { email: formData.email });
      } else {
        await auth.register({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        });
        dispatch('register', { email: formData.email });
      }

      // Réinitialiser le formulaire
      formData = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      };

      show = false;

    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      isSubmitting = false;
    }
  }

  function handleClose() {
    show = false;
    formData = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    errors = {};
  }

  function switchMode() {
    mode = mode === 'login' ? 'register' : 'login';
    formData = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    errors = {};
  }

  // Gestionnaire pour l'événement d'erreur du store
  $: if ($auth.error) {
    errors.general = $auth.error;
    auth.clearError();
  }

  function showNotification(message: string, type: 'success' | 'error' | 'warning' | 'info') {
    // Pour l'instant, juste un console.log
    console.log(`${type}: ${message}`);
  }
</script>

{#if show}
  <div class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
    <div class="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <button
        type="button"
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        on:click={handleClose}
        aria-label="Close modal"
      ></button>

      <!-- Modal panel -->
      <div class="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:align-middle">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg class="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </h3>
              <p class="mt-2 text-sm text-gray-500">
                {mode === 'login'
                  ? 'Welcome back! Please sign in to your account.'
                  : 'Join us today! Create your account to get started.'
                }
              </p>
            </div>
          </div>

          <!-- Formulaire -->
          <form on:submit={handleSubmit} class="mt-6 space-y-4">
            {#if errors.general}
              <div class="p-3 bg-red-50 border border-red-200 rounded-md">
                <p class="text-sm text-red-800">{errors.general}</p>
              </div>
            {/if}

            {#if mode === 'register'}
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    bind:value={formData.firstName}
                    placeholder="John"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    class:border-red-500={errors.firstName}
                    required
                  />
                  {#if errors.firstName}
                    <p class="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  {/if}
                </div>

                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    bind:value={formData.lastName}
                    placeholder="Doe"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    class:border-red-500={errors.lastName}
                    required
                  />
                  {#if errors.lastName}
                    <p class="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  {/if}
                </div>
              </div>
            {/if}

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                bind:value={formData.email}
                placeholder="john@example.com"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                class:border-red-500={errors.email}
                required
              />
              {#if errors.email}
                <p class="mt-1 text-sm text-red-600">{errors.email}</p>
              {/if}
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password *
              </label>
              <input
                type="password"
                id="password"
                bind:value={formData.password}
                placeholder="Enter your password"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                class:border-red-500={errors.password}
                required
              />
              {#if errors.password}
                <p class="mt-1 text-sm text-red-600">{errors.password}</p>
              {/if}
            </div>

            {#if mode === 'register'}
              <div>
                <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  bind:value={formData.confirmPassword}
                  placeholder="Confirm your password"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  class:border-red-500={errors.confirmPassword}
                  required
                />
                {#if errors.confirmPassword}
                  <p class="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                {/if}
              </div>
            {/if}

            {#if mode === 'login'}
              <div class="flex items-center justify-between">
                <div class="text-sm">
                  <button
                    type="button"
                    class="font-medium text-primary-600 hover:text-primary-500 underline"
                    on:click={() => showNotification('Password reset feature coming soon!', 'info')}
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>
            {/if}

            {#if mode === 'register'}
              <div class="text-sm text-gray-600">
                By creating an account, you agree to our
                <a href="/terms" class="text-primary-600 hover:text-primary-500">Terms of Service</a>
                and
                <a href="/privacy" class="text-primary-600 hover:text-primary-500">Privacy Policy</a>
              </div>
            {/if}
          </form>
        </div>

        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            on:click={handleSubmit}
            disabled={isSubmitting || $auth.isLoading}
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {#if isSubmitting || $auth.isLoading}
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
            {:else}
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            {/if}
          </button>

          <button
            type="button"
            on:click={handleClose}
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>

        <!-- Switch between login/register -->
        <div class="bg-gray-50 px-4 py-3 border-t border-gray-200">
          <div class="text-center">
            <p class="text-sm text-gray-600">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
              <button
                on:click={switchMode}
                class="font-medium text-primary-600 hover:text-primary-500 ml-1"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          <!-- Demo credentials -->
          {#if mode === 'login'}
            <div class="mt-4 p-3 bg-blue-50 rounded-md">
              <p class="text-xs text-blue-800 font-medium mb-2">Demo Credentials:</p>
              <div class="text-xs text-blue-700 space-y-1">
                <p><strong>User:</strong> user@example.com / password123</p>
                <p><strong>Admin:</strong> admin@example.com / admin123</p>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}
