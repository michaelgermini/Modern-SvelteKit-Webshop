<script lang="ts">
  import { auth, isLoggedIn } from '$lib/stores';
  import AuthModal from './AuthModal.svelte';
  import { createEventDispatcher } from 'svelte';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  const dispatch = createEventDispatcher();

  let showAuthModal = false;
  let authMode: 'login' | 'register' = 'login';
  let showUserMenu = false;

  function handleLogin() {
    authMode = 'login';
    showAuthModal = true;
  }

  function handleRegister() {
    authMode = 'register';
    showAuthModal = true;
  }

  function handleLogout() {
    auth.logout();
    showUserMenu = false;
    dispatch('logout');
  }

  function handleAuthSuccess(event: CustomEvent) {
    showAuthModal = false;
    showUserMenu = false;
    dispatch('authSuccess', event.detail);
  }

  // Fermer le menu quand on clique ailleurs
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu')) {
      showUserMenu = false;
    }
  }

  // Gérer les événements clavier
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      showUserMenu = false;
      showAuthModal = false;
    }
  }

  // Ajouter les event listeners seulement côté client
  onMount(() => {
    if (!browser) return;

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

{#if $isLoggedIn && $auth.user}
  <!-- Menu utilisateur connecté -->
  <div class="relative user-menu">
    <button
      on:click={() => showUserMenu = !showUserMenu}
      class="flex items-center space-x-3 text-gray-700 hover:text-primary-600 transition-colors"
      aria-label="User menu"
      aria-expanded={showUserMenu}
    >
      <!-- Avatar -->
      {#if $auth.user.avatar}
        <img
          src={$auth.user.avatar}
          alt={$auth.user.firstName}
          class="w-8 h-8 rounded-full object-cover"
        />
      {:else}
        <div class="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
          <span class="text-white font-medium text-sm">
            {$auth.user.firstName.charAt(0)}{$auth.user.lastName.charAt(0)}
          </span>
        </div>
      {/if}

      <!-- Nom et rôle -->
      <div class="hidden sm:block text-left">
        <div class="text-sm font-medium">
          {$auth.user.firstName} {$auth.user.lastName}
        </div>
        <div class="text-xs text-gray-500 capitalize">
          {$auth.user.role}
        </div>
      </div>

      <!-- Chevron -->
      <svg
        class="w-4 h-4 transition-transform {showUserMenu ? 'rotate-180' : ''}"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>

    <!-- Dropdown menu -->
    {#if showUserMenu}
      <div class="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
        <div class="py-1">
          <!-- Profile -->
          <div class="px-4 py-2 border-b border-gray-200">
            <div class="flex items-center space-x-3">
              {#if $auth.user.avatar}
                <img
                  src={$auth.user.avatar}
                  alt={$auth.user.firstName}
                  class="w-10 h-10 rounded-full object-cover"
                />
              {:else}
                <div class="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                  <span class="text-white font-medium">
                    {$auth.user.firstName.charAt(0)}{$auth.user.lastName.charAt(0)}
                  </span>
                </div>
              {/if}
              <div>
                <div class="text-sm font-medium text-gray-900">
                  {$auth.user.firstName} {$auth.user.lastName}
                </div>
                <div class="text-xs text-gray-500">
                  {$auth.user.email}
                </div>
                <div class="text-xs text-primary-600 capitalize font-medium">
                  {$auth.user.role}
                </div>
              </div>
            </div>
          </div>

          <!-- Menu items -->
          <a
            href="/profile"
            class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            on:click={() => showUserMenu = false}
          >
            <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Profile
          </a>

          <a
            href="/orders"
            class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            on:click={() => showUserMenu = false}
          >
            <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            My Orders
          </a>

          {#if $auth.user.role === 'admin'}
            <a
              href="/admin"
              class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              on:click={() => showUserMenu = false}
            >
              <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Admin Panel
            </a>
          {/if}

          <!-- Separator -->
          <div class="border-t border-gray-200 my-1"></div>

          <!-- Logout -->
          <button
            on:click={handleLogout}
            class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    {/if}
  </div>
{:else}
  <!-- Boutons connexion/inscription pour utilisateurs non connectés -->
  <div class="flex items-center space-x-4">
    <button
      on:click={handleLogin}
      class="text-gray-700 hover:text-primary-600 transition-colors text-sm font-medium"
    >
      Sign In
    </button>
    <button
      on:click={handleRegister}
      class="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
    >
      Sign Up
    </button>
  </div>
{/if}

<!-- Modal d'authentification -->
<AuthModal
  show={showAuthModal}
  mode={authMode}
  on:login={handleAuthSuccess}
  on:register={handleAuthSuccess}
  on:close={() => showAuthModal = false}
/>
