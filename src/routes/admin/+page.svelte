<script lang="ts">
  import { onMount } from 'svelte';
  import { orders, orderStats } from '$lib/stores/orders';
  import { products } from '$lib/services/products';

  let stats = {
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalCustomers: 0,
    recentOrders: [],
    lowStockProducts: []
  };

  onMount(() => {
    calculateStats();
  });

  function calculateStats() {
    // Calculer les statistiques des commandes
    const allOrders = Object.values($orders);
    stats.totalOrders = allOrders.length;
    stats.totalRevenue = allOrders.reduce((sum, order) => sum + order.total, 0);

    // Produits
    stats.totalProducts = products.length;

    // Produits en stock faible (moins de 5 unités)
    stats.lowStockProducts = products.filter(p => (p.stock ?? 0) < 5);

    // Commandes récentes (derniers 7 jours)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    stats.recentOrders = allOrders
      .filter(order => new Date(order.createdAt) >= sevenDaysAgo)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

    // Nombre unique de clients
    const uniqueCustomers = new Set(allOrders.map(order => order.customerEmail));
    stats.totalCustomers = uniqueCustomers.size;
  }

  $: if ($orders) {
    calculateStats();
  }
</script>

<div class="space-y-8">
  <!-- Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <svg class="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <div class="ml-5 w-0 flex-1">
          <dl>
            <dt class="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
            <dd class="text-lg font-medium text-gray-900">{stats.totalOrders}</dd>
          </dl>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
          </svg>
        </div>
        <div class="ml-5 w-0 flex-1">
          <dl>
            <dt class="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
            <dd class="text-lg font-medium text-gray-900">${stats.totalRevenue.toFixed(2)}</dd>
          </dl>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <svg class="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
          </svg>
        </div>
        <div class="ml-5 w-0 flex-1">
          <dl>
            <dt class="text-sm font-medium text-gray-500 truncate">Total Products</dt>
            <dd class="text-lg font-medium text-gray-900">{stats.totalProducts}</dd>
          </dl>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <svg class="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
          </svg>
        </div>
        <div class="ml-5 w-0 flex-1">
          <dl>
            <dt class="text-sm font-medium text-gray-500 truncate">Total Customers</dt>
            <dd class="text-lg font-medium text-gray-900">{stats.totalCustomers}</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>

  <!-- Recent Activity -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <!-- Recent Orders -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Recent Orders</h3>
      </div>
      <div class="divide-y divide-gray-200">
        {#each stats.recentOrders as order}
          <div class="px-6 py-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900">Order #{order.orderNumber}</p>
                <p class="text-sm text-gray-500">{order.customerEmail}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">${order.total.toFixed(2)}</p>
                <p class="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        {:else}
          <div class="px-6 py-8 text-center text-gray-500">
            No recent orders
          </div>
        {/each}
      </div>
      <div class="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <a href="/admin/orders" class="text-sm font-medium text-blue-600 hover:text-blue-500">
          View all orders →
        </a>
      </div>
    </div>

    <!-- Low Stock Alert -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Low Stock Alert</h3>
      </div>
      <div class="divide-y divide-gray-200">
        {#each stats.lowStockProducts.slice(0, 5) as product}
          <div class="px-6 py-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900">{product.name}</p>
                <p class="text-sm text-gray-500">Stock: {product.stock ?? 0}</p>
              </div>
              <div class="text-right">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Low Stock
                </span>
              </div>
            </div>
          </div>
        {:else}
          <div class="px-6 py-8 text-center text-gray-500">
            All products are well stocked
          </div>
        {/each}
      </div>
      <div class="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <a href="/admin/products" class="text-sm font-medium text-blue-600 hover:text-blue-500">
          Manage products →
        </a>
      </div>
    </div>
  </div>
</div>
