<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { Toast } from '$lib/components';
  import type { User } from '$lib/types';

  // Debug: log when component loads
  console.log('🧑 Profile page component loading...');

  let user: User | null = null;
  let isLoading = true;
  let isEditing = false;
  let showToast = false;
  let message = '';
  let type: 'success' | 'error' | 'warning' | 'info' = 'info';

  console.log('📝 Profile component initialized with variables:', { user, isLoading, isEditing });

  // Form data
  let formData = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  };

  onMount(() => {
    console.log('🚀 Profile onMount triggered');
    loadUserProfile();
  });

  function loadUserProfile() {
    console.log('⏳ Loading user profile data...');
    // Simulate loading user data
    // In a real app, this would come from an API
    setTimeout(() => {
      user = {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+33 6 12 34 56 78',
        address: '123 Rue de la Paix',
        city: 'Paris',
        postalCode: '75001',
        country: 'France',
        createdAt: new Date('2024-01-15'),
        lastLogin: new Date()
      };

      // Populate form data
      formData = {
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        postalCode: user.postalCode || '',
        country: user.country || ''
      };

      isLoading = false;
    }, 1000);
  }

  function toggleEdit() {
    isEditing = !isEditing;
    if (!isEditing) {
      // Reset form data when canceling edit
      if (user) {
        formData = {
          name: user.name,
          email: user.email,
          phone: user.phone || '',
          address: user.address || '',
          city: user.city || '',
          postalCode: user.postalCode || '',
          country: user.country || ''
        };
      }
    }
  }

  function saveProfile() {
    // Simulate saving profile
    showNotification('Profile updated successfully!', 'success');

    // Update user data
    if (user) {
      user = {
        ...user,
        ...formData
      };
    }

    isEditing = false;
  }

  function showNotification(notificationMessage: string, notificationType: 'success' | 'error' | 'warning' | 'info') {
    showToast = true;
    message = notificationMessage;
    type = notificationType;
  }

  function closeToast() {
    showToast = false;
  }

  function goToOrders() {
    goto('/orders');
  }

  function goToFavorites() {
    goto('/favorites');
  }

  function logout() {
    // Simulate logout
    showNotification('Logged out successfully', 'success');
    setTimeout(() => {
      goto('/');
    }, 1500);
  }
</script>

<svelte:head>
  <title>My Profile - SvelteKit Webshop</title>
  <meta name="description" content="Manage your account profile and preferences" />
</svelte:head>

<div class="min-h-screen bg-gray-50 py-8">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">

      <!-- Header -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">My Profile</h1>
            <p class="text-gray-600 mt-1">Manage your account information and preferences</p>
          </div>
          <div class="flex space-x-3">
            <button
              on:click={goToOrders}
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              My Orders
            </button>
            <button
              on:click={goToFavorites}
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              Favorites
            </button>
          </div>
        </div>
      </div>

      {#if isLoading}
        <!-- Loading State -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div class="animate-pulse">
            <div class="flex items-center space-x-4 mb-6">
              <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
              <div>
                <div class="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                <div class="h-3 bg-gray-300 rounded w-24"></div>
              </div>
            </div>
            <div class="space-y-3">
              <div class="h-4 bg-gray-300 rounded w-full"></div>
              <div class="h-4 bg-gray-300 rounded w-3/4"></div>
              <div class="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      {:else if user}
        <!-- Profile Content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <!-- Profile Sidebar -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div class="text-center">
                <div class="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">{user.name}</h3>
                <p class="text-gray-600 text-sm">{user.email}</p>

                <div class="mt-4 space-y-2">
                  <div class="text-xs text-gray-500">
                    Member since {user.createdAt.toLocaleDateString()}
                  </div>
                  <div class="text-xs text-gray-500">
                    Last login: {user.lastLogin.toLocaleDateString()}
                  </div>
                </div>

                <button
                  on:click={logout}
                  class="mt-6 w-full inline-flex items-center justify-center px-4 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-700 bg-white hover:bg-red-50 transition-colors"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  Logout
                </button>
              </div>
            </div>

            <!-- Quick Stats -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h4>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Orders</span>
                  <span class="font-medium">12</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Favorites</span>
                  <span class="font-medium">8</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Reviews</span>
                  <span class="font-medium">5</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Profile Form -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-semibold text-gray-900">Personal Information</h2>
                <button
                  on:click={toggleEdit}
                  class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  {#if isEditing}
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    Cancel
                  {:else}
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Edit Profile
                  {/if}
                </button>
              </div>

              {#if isEditing}
                <!-- Edit Form -->
                <form on:submit|preventDefault={saveProfile} class="space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        bind:value={formData.name}
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        aria-describedby="name-error"
                      />
                    </div>

                    <div>
                      <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        bind:value={formData.email}
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        aria-describedby="email-error"
                      />
                    </div>

                    <div>
                      <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        bind:value={formData.phone}
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        aria-describedby="phone-error"
                      />
                    </div>

                    <div>
                      <label for="country" class="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <select
                        id="country"
                        bind:value={formData.country}
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        aria-describedby="country-error"
                      >
                        <option value="France">France</option>
                        <option value="Germany">Germany</option>
                        <option value="Italy">Italy</option>
                        <option value="Spain">Spain</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label for="address" class="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      bind:value={formData.address}
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      aria-describedby="address-error"
                    />
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label for="city" class="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        id="city"
                        type="text"
                        bind:value={formData.city}
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        aria-describedby="city-error"
                      />
                    </div>

                    <div>
                      <label for="postalCode" class="block text-sm font-medium text-gray-700 mb-2">
                        Postal Code
                      </label>
                      <input
                        id="postalCode"
                        type="text"
                        bind:value={formData.postalCode}
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        aria-describedby="postalCode-error"
                      />
                    </div>
                  </div>

                  <div class="flex justify-end space-x-3">
                    <button
                      type="button"
                      on:click={toggleEdit}
                      class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              {:else}
                <!-- View Mode -->
                <div class="space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div class="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </div>
                      <p class="text-gray-900">{user.name}</p>
                    </div>

                    <div>
                      <div class="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </div>
                      <p class="text-gray-900">{user.email}</p>
                    </div>

                    {#if user.phone}
                      <div>
                        <div class="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </div>
                        <p class="text-gray-900">{user.phone}</p>
                      </div>
                    {/if}

                    {#if user.country}
                      <div>
                        <div class="block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </div>
                        <p class="text-gray-900">{user.country}</p>
                      </div>
                    {/if}
                  </div>

                  {#if user.address}
                    <div>
                      <div class="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </div>
                      <p class="text-gray-900">
                        {user.address}<br />
                        {#if user.city && user.postalCode}
                          {user.city}, {user.postalCode}
                        {/if}
                      </p>
                    </div>
                  {/if}
                </div>
              {/if}
            </div>

            <!-- Account Settings -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>

              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 class="text-sm font-medium text-gray-900">Email Notifications</h4>
                    <p class="text-sm text-gray-600">Receive order updates and promotions</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer" checked>
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 class="text-sm font-medium text-gray-900">SMS Notifications</h4>
                    <p class="text-sm text-gray-600">Receive order updates via SMS</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 class="text-sm font-medium text-gray-900">Marketing Emails</h4>
                    <p class="text-sm text-gray-600">Receive promotional emails and newsletters</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer" checked>
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      {:else}
        <!-- Not logged in state -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div class="mb-6">
            <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Please sign in</h2>
          <p class="text-gray-600 mb-6">
            You need to be logged in to view your profile.
          </p>
          <button
            on:click={() => goto('/')}
            class="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            Go to Home
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>

<!-- Toast Notifications -->
{#if showToast}
  <Toast
    show={showToast}
    message={message}
    type={type}
    on:close={closeToast}
  />
{/if}
