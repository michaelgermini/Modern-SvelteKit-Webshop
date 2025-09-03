<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { auth, isAdmin } from '$lib/stores/auth';
  import { page } from '$app/stores';

  let isLoading = true;

  onMount(() => {
    // Vérifier l'authentification au montage
    const unsubscribe = auth.subscribe(state => {
      if (!state.isAuthenticated) {
        goto('/auth?redirect=' + encodeURIComponent($page.url.pathname));
        return;
      }

      if (state.user && state.user.role !== 'admin') {
        goto('/?error=access-denied');
        return;
      }

      isLoading = false;
    });

    return unsubscribe;
  });

  $: if (!$isAdmin && !isLoading) {
    goto('/?error=access-denied');
  }
</script>

{#if isLoading}
  <div class="min-h-screen flex items-center justify-center">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
{:else if $isAdmin}
  <div class="min-h-screen bg-gray-50">
    <!-- Admin Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">
              Welcome, {$auth.user?.firstName}
            </span>
            <button
              on:click={() => goto('/')}
              class="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Back to Shop
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Admin Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex space-x-8 py-4">
          <a
            href="/admin"
            class="text-gray-900 hover:text-blue-600 font-medium {$page.url.pathname === '/admin' ? 'text-blue-600 border-b-2 border-blue-600' : ''}"
          >
            Dashboard
          </a>
          <a
            href="/admin/products"
            class="text-gray-900 hover:text-blue-600 font-medium {$page.url.pathname === '/admin/products' ? 'text-blue-600 border-b-2 border-blue-600' : ''}"
          >
            Products
          </a>
          <a
            href="/admin/orders"
            class="text-gray-900 hover:text-blue-600 font-medium {$page.url.pathname === '/admin/orders' ? 'text-blue-600 border-b-2 border-blue-600' : ''}"
          >
            Orders
          </a>
          <a
            href="/admin/customers"
            class="text-gray-900 hover:text-blue-600 font-medium {$page.url.pathname === '/admin/customers' ? 'text-blue-600 border-b-2 border-blue-600' : ''}"
          >
            Customers
          </a>
          <a
            href="/admin/analytics"
            class="text-gray-900 hover:text-blue-600 font-medium {$page.url.pathname === '/admin/analytics' ? 'text-blue-600 border-b-2 border-blue-600' : ''}"
          >
            Analytics
          </a>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
  </div>
{:else}
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
      <p class="text-gray-600 mb-4">You don't have permission to access this area.</p>
      <button
        on:click={() => goto('/')}
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Go to Shop
      </button>
    </div>
  </div>
{/if}
