<script lang="ts">
  import { onMount } from 'svelte';
  import { orders } from '$lib/stores/orders';
  import { formatPrice } from '$lib/utils';

  let customers = [];
  let searchQuery = '';
  let currentPage = 1;
  const itemsPerPage = 10;

  $: {
    // Agréger les données clients depuis les commandes
    const customerMap = new Map();

    Object.values($orders).forEach(order => {
      if (!customerMap.has(order.customerEmail)) {
        customerMap.set(order.customerEmail, {
          email: order.customerEmail,
          totalOrders: 0,
          totalSpent: 0,
          lastOrderDate: null,
          firstOrderDate: null,
          orders: []
        });
      }

      const customer = customerMap.get(order.customerEmail);
      customer.totalOrders += 1;
      customer.totalSpent += order.total;
      customer.orders.push(order);

      const orderDate = new Date(order.createdAt);
      if (!customer.lastOrderDate || orderDate > customer.lastOrderDate) {
        customer.lastOrderDate = orderDate;
      }
      if (!customer.firstOrderDate || orderDate < customer.firstOrderDate) {
        customer.firstOrderDate = orderDate;
      }
    });

    let filtered = Array.from(customerMap.values());

    // Filtre par recherche
    if (searchQuery) {
      filtered = filtered.filter(customer =>
        customer.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Trier par date de dernière commande
    filtered = filtered.sort((a, b) => {
      if (!a.lastOrderDate && !b.lastOrderDate) return 0;
      if (!a.lastOrderDate) return 1;
      if (!b.lastOrderDate) return -1;
      return b.lastOrderDate.getTime() - a.lastOrderDate.getTime();
    });

    customers = filtered;
  }

  $: totalPages = Math.ceil(customers.length / itemsPerPage);
  $: paginatedCustomers = customers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold text-gray-900">Customer Management</h1>
  </div>

  <!-- Search -->
  <div class="bg-white rounded-lg shadow p-6">
    <div class="max-w-md">
      <label for="search" class="block text-sm font-medium text-gray-700">Search Customers</label>
      <input
        type="text"
        id="search"
        bind:value={searchQuery}
        placeholder="Search by email..."
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
    <div class="mt-4">
      <span class="text-sm text-gray-500">
        {customers.length} customers found
      </span>
    </div>
  </div>

  <!-- Customers Table -->
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Order</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Order</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each paginatedCustomers as customer}
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{customer.email}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{customer.totalOrders}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{formatPrice(customer.totalSpent, 'EUR')}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {customer.lastOrderDate ? customer.lastOrderDate.toLocaleDateString() : 'Never'}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {customer.firstOrderDate ? customer.firstOrderDate.toLocaleDateString() : 'Never'}
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    {#if paginatedCustomers.length === 0}
      <div class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No customers found</h3>
        <p class="mt-1 text-sm text-gray-500">Customer data will appear here once orders are placed.</p>
      </div>
    {/if}
  </div>

  <!-- Pagination -->
  {#if totalPages > 1}
    <div class="flex items-center justify-between">
      <div class="text-sm text-gray-700">
        Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, customers.length)} of {customers.length} results
      </div>
      <div class="flex space-x-2">
        <button
          on:click={() => currentPage--}
          disabled={currentPage === 1}
          class="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Previous
        </button>

        {#each Array(totalPages) as _, i}
          <button
            on:click={() => currentPage = i + 1}
            class={`px-3 py-1 border rounded-md text-sm ${
              currentPage === i + 1
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {i + 1}
          </button>
        {/each}

        <button
          on:click={() => currentPage++}
          disabled={currentPage === totalPages}
          class="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
  {/if}
</div>
