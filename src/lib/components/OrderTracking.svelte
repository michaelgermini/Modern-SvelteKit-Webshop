<script lang="ts">
  import { ORDER_STATUS_CONFIG, type Order, type StatusHistory } from '$lib/stores/orders';

  export let order: Order;
  export let showDetails: boolean = true;

  function formatDate(date: Date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function formatCurrency(amount: number, currency: string = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  // Obtenir les étapes de la timeline
  $: statusSteps = Object.keys(ORDER_STATUS_CONFIG);
  $: currentStepIndex = statusSteps.indexOf(order.status);

  // Obtenir l'historique formaté
  $: formattedHistory = order.statusHistory
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .map((history, index) => ({
      ...history,
      isCompleted: index === 0 || statusSteps.indexOf(history.status) <= currentStepIndex,
      isCurrent: index === 0
    }));
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
  <!-- En-tête -->
  <div class="flex items-center justify-between mb-6">
    <div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        Order #{order.orderNumber}
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-300">
        Placed on {formatDate(order.createdAt)}
      </p>
    </div>
    <div class="text-right">
      <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium {ORDER_STATUS_CONFIG[order.status].color}">
        {ORDER_STATUS_CONFIG[order.status].icon} {ORDER_STATUS_CONFIG[order.status].label}
      </div>
    </div>
  </div>

  <!-- Timeline des statuts -->
  <div class="mb-8">
    <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">
      Order Status
    </h4>

    <div class="relative">
      <!-- Ligne de progression -->
      <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
      <div
        class="absolute left-4 top-0 w-0.5 bg-primary-600 transition-all duration-500"
        style="height: {(currentStepIndex / (statusSteps.length - 1)) * 100}%"
      ></div>

      <!-- Étapes -->
      <div class="space-y-6">
        {#each formattedHistory as history, index}
          <div class="relative flex items-start">
            <!-- Cercle de statut -->
            <div class="relative z-10 flex-shrink-0">
              <div class="w-8 h-8 rounded-full flex items-center justify-center {history.isCompleted ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}">
                {#if history.isCurrent}
                  <div class="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                {:else}
                  <span class="text-sm">{ORDER_STATUS_CONFIG[history.status].icon}</span>
                {/if}
              </div>
            </div>

            <!-- Contenu de l'étape -->
            <div class="ml-4 flex-1">
              <div class="flex items-center justify-between">
                <h5 class="font-medium text-gray-900 dark:text-white">
                  {ORDER_STATUS_CONFIG[history.status].label}
                </h5>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(history.timestamp)}
                </span>
              </div>

              {#if history.note}
                <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {history.note}
                </p>
              {/if}

              <!-- Informations supplémentaires pour certains statuts -->
              {#if history.status === 'shipped' && order.trackingNumber}
                <div class="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                    <div>
                      <p class="text-sm font-medium text-blue-800 dark:text-blue-200">
                        Tracking Number
                      </p>
                      <p class="text-sm text-blue-600 dark:text-blue-300 font-mono">
                        {order.trackingNumber}
                      </p>
                    </div>
                  </div>
                </div>
              {/if}

              {#if history.status === 'delivered'}
                <div class="mt-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <p class="text-sm font-medium text-green-800 dark:text-green-200">
                        Package Delivered
                      </p>
                      <p class="text-sm text-green-600 dark:text-green-300">
                        Thank you for shopping with us!
                      </p>
                    </div>
                  </div>
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  {#if showDetails}
    <!-- Détails de la commande -->
    <div class="border-t border-gray-200 dark:border-gray-600 pt-6">
      <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">
        Order Details
      </h4>

      <!-- Produits -->
      <div class="space-y-4 mb-6">
        {#each order.items as item}
          <div class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <img
              src={item.image}
              alt={item.name}
              class="w-16 h-16 object-cover rounded-lg"
            />
            <div class="flex-1">
              <h5 class="font-medium text-gray-900 dark:text-white">
                {item.name}
              </h5>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Quantity: {item.quantity}
              </p>
            </div>
            <div class="text-right">
              <p class="font-medium text-gray-900 dark:text-white">
                {formatCurrency(item.price * item.quantity, order.currency)}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {formatCurrency(item.price, order.currency)} each
              </p>
            </div>
          </div>
        {/each}
      </div>

      <!-- Résumé des coûts -->
      <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-300">Subtotal</span>
            <span class="text-gray-900 dark:text-white">{formatCurrency(order.subtotal, order.currency)}</span>
          </div>
          {#if order.shipping > 0}
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-300">Shipping</span>
              <span class="text-gray-900 dark:text-white">{formatCurrency(order.shipping, order.currency)}</span>
            </div>
          {/if}
          {#if order.discount > 0}
            <div class="flex justify-between text-sm">
              <span class="text-green-600 dark:text-green-400">Discount</span>
              <span class="text-green-600 dark:text-green-400">-{formatCurrency(order.discount, order.currency)}</span>
            </div>
          {/if}
          {#if order.tax > 0}
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-300">Tax</span>
              <span class="text-gray-900 dark:text-white">{formatCurrency(order.tax, order.currency)}</span>
            </div>
          {/if}
          <div class="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
            <div class="flex justify-between font-medium">
              <span class="text-gray-900 dark:text-white">Total</span>
              <span class="text-gray-900 dark:text-white">{formatCurrency(order.total, order.currency)}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Informations de livraison -->
      <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h5 class="font-medium text-gray-900 dark:text-white mb-2">
            Shipping Address
          </h5>
          <div class="text-sm text-gray-600 dark:text-gray-300">
            <p>{order.customerInfo.firstName} {order.customerInfo.lastName}</p>
            <p>{order.customerInfo.address}</p>
            <p>{order.customerInfo.city}, {order.customerInfo.zipCode}</p>
            <p>{order.customerInfo.country}</p>
            <p class="mt-2">{order.customerInfo.email}</p>
            {#if order.customerInfo.phone}
              <p>{order.customerInfo.phone}</p>
            {/if}
          </div>
        </div>

        <div>
          <h5 class="font-medium text-gray-900 dark:text-white mb-2">
            Payment Information
          </h5>
          <div class="text-sm text-gray-600 dark:text-gray-300">
            <p>Method: {order.paymentInfo.method}</p>
            <p>Status: <span class="capitalize">{order.paymentInfo.status}</span></p>
            {#if order.paymentInfo.transactionId}
              <p>Transaction ID: {order.paymentInfo.transactionId}</p>
            {/if}
          </div>

          {#if order.estimatedDelivery}
            <div class="mt-4">
              <h5 class="font-medium text-gray-900 dark:text-white mb-2">
                Estimated Delivery
              </h5>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {formatDate(order.estimatedDelivery)}
              </p>
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>
