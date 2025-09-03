<script lang="ts">
  import { onMount } from 'svelte';
  import { orders, orderStats, updateOrderStatus } from '$lib/stores/orders';
  import { formatPrice } from '$lib/utils';
  import Modal from '$lib/components/Modal.svelte';
  import Toast from '$lib/components/Toast.svelte';
  import type { Order } from '$lib/types';

  let showModal = false;
  let showToast = false;
  let toastMessage = '';
  let toastType = 'success' as 'success' | 'error' | 'warning' | 'info';

  let selectedOrder: Order | null = null;
  let searchQuery = '';
  let selectedStatus = 'all';
  let currentPage = 1;
  const itemsPerPage = 10;

  let filteredOrders = [];

  $: {
    let filtered = Object.values($orders);

    // Filtre par recherche
    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtre par statut
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(order => order.status === selectedStatus);
    }

    // Trier par date (plus récent en premier)
    filtered = filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    filteredOrders = filtered;
  }

  $: totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  $: paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function viewOrderDetails(order: Order) {
    selectedOrder = order;
    showModal = true;
  }

  function updateStatus(orderId: string, newStatus: string) {
    try {
      updateOrderStatus(orderId, newStatus as any);
      showToast = true;
      toastMessage = `Order status updated to ${newStatus}`;
      toastType = 'success';
    } catch (error) {
      showToast = true;
      toastMessage = 'Error updating order status';
      toastType = 'error';
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function getStatusOptions(currentStatus: string) {
    const options = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    return options.filter(option => option !== currentStatus);
  }

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold text-gray-900">Order Management</h1>
  </div>

  <!-- Filters -->
  <div class="bg-white rounded-lg shadow p-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label for="search" class="block text-sm font-medium text-gray-700">Search</label>
        <input
          type="text"
          id="search"
          bind:value={searchQuery}
          placeholder="Search orders..."
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
        <select
          id="status"
          bind:value={selectedStatus}
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {#each statusOptions as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
      </div>

      <div class="flex items-end">
        <span class="text-sm text-gray-500">
          {filteredOrders.length} orders found
        </span>
      </div>
    </div>
  </div>

  <!-- Orders Table -->
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each paginatedOrders as order}
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">#{order.orderNumber}</div>
                <div class="text-sm text-gray-500">{order.items.length} items</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{order.customerEmail}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{formatPrice(order.total, 'EUR')}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <select
                  value={order.status}
                  on:change={(e) => updateStatus(order.id, e.target.value)}
                  class={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border-0 ${
                    getStatusColor(order.status)
                  }`}
                >
                  {#each getStatusOptions(order.status) as status}
                    <option value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                  {/each}
                </select>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</div>
                <div class="text-sm text-gray-500">{new Date(order.createdAt).toLocaleTimeString()}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  on:click={() => viewOrderDetails(order)}
                  class="text-blue-600 hover:text-blue-900 mr-4"
                >
                  View Details
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    {#if paginatedOrders.length === 0}
      <div class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
        <p class="mt-1 text-sm text-gray-500">Orders will appear here once customers place them.</p>
      </div>
    {/if}
  </div>

  <!-- Pagination -->
  {#if totalPages > 1}
    <div class="flex items-center justify-between">
      <div class="text-sm text-gray-700">
        Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} results
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

<!-- Order Details Modal -->
{#if selectedOrder}
  <Modal title="Order Details - #{selectedOrder.orderNumber}" bind:show={showModal}>
    <div class="space-y-6">
      <!-- Order Info -->
      <div class="bg-gray-50 rounded-lg p-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <h4 class="text-sm font-medium text-gray-500">Order Date</h4>
            <p class="text-sm text-gray-900">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <h4 class="text-sm font-medium text-gray-500">Status</h4>
            <span class={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
              {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
            </span>
          </div>
          <div>
            <h4 class="text-sm font-medium text-gray-500">Customer</h4>
            <p class="text-sm text-gray-900">{selectedOrder.customerEmail}</p>
          </div>
          <div>
            <h4 class="text-sm font-medium text-gray-500">Total</h4>
            <p class="text-sm font-medium text-gray-900">{formatPrice(selectedOrder.total, 'EUR')}</p>
          </div>
        </div>

        {#if selectedOrder.trackingNumber}
          <div class="mt-4">
            <h4 class="text-sm font-medium text-gray-500">Tracking Number</h4>
            <p class="text-sm text-gray-900">{selectedOrder.trackingNumber}</p>
          </div>
        {/if}

        {#if selectedOrder.estimatedDelivery}
          <div class="mt-4">
            <h4 class="text-sm font-medium text-gray-500">Estimated Delivery</h4>
            <p class="text-sm text-gray-900">{new Date(selectedOrder.estimatedDelivery).toLocaleDateString()}</p>
          </div>
        {/if}
      </div>

      <!-- Order Items -->
      <div>
        <h3 class="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
        <div class="space-y-4">
          {#each selectedOrder.items as item}
            <div class="flex items-center space-x-4 p-4 border rounded-lg">
              <div class="flex-shrink-0">
                <img class="w-16 h-16 object-cover rounded-md" src={item.product.image} alt={item.product.name} />
              </div>
              <div class="flex-1">
                <h4 class="text-sm font-medium text-gray-900">{item.product.name}</h4>
                <p class="text-sm text-gray-500">Quantity: {item.quantity}</p>
                <p class="text-sm font-medium text-gray-900">{formatPrice(item.product.price * item.quantity, item.product.currency)}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Shipping Info -->
      {#if selectedOrder.shippingInfo}
        <div>
          <h3 class="text-lg font-medium text-gray-900 mb-4">Shipping Information</h3>
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <h4 class="text-sm font-medium text-gray-500">Name</h4>
                <p class="text-sm text-gray-900">{selectedOrder.shippingInfo.firstName} {selectedOrder.shippingInfo.lastName}</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500">Phone</h4>
                <p class="text-sm text-gray-900">{selectedOrder.shippingInfo.phone || 'Not provided'}</p>
              </div>
            </div>
            <div class="mt-4">
              <h4 class="text-sm font-medium text-gray-500">Address</h4>
              <p class="text-sm text-gray-900">
                {selectedOrder.shippingInfo.address}<br />
                {selectedOrder.shippingInfo.city}, {selectedOrder.shippingInfo.postalCode}<br />
                {selectedOrder.shippingInfo.country}
              </p>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </Modal>
{/if}

<!-- Toast -->
<Toast bind:show={showToast} message={toastMessage} type={toastType} />
