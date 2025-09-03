<script lang="ts">
  import { cart, clear, remove, updateQuantity } from '$lib/stores';
  import { formatPrice } from '$lib/utils';
  import { goto } from '$app/navigation';
  
  $: total = $cart.reduce((t, i) => t + i.product.price * i.qty, 0);
  $: cartCount = $cart.reduce((count, item) => count + item.qty, 0);

  async function handleCheckout() {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: $cart.map(item => ({
            name: item.product.name,
            amount: item.product.price,
            currency: item.product.currency,
            quantity: item.qty
          }))
        })
      });

      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url;
      } else {
        alert('Erreur lors de la création de la session de paiement');
      }
    } catch (error) {
      console.error('Erreur checkout:', error);
      alert('Erreur lors du processus de paiement');
    }
  }
</script>

<svelte:head>
  <title>Cart - SvelteKit Webshop</title>
  <meta name="description" content="Your shopping cart" />
</svelte:head>

<section class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

    {#if $cart.length === 0}
      <div class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Empty Cart</h3>
        <p class="mt-1 text-sm text-gray-500">Start adding products to your cart.</p>
        <div class="mt-6">
          <a href="/" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
            Continue Shopping
          </a>
        </div>
      </div>
    {:else}
      <!-- Cart Items -->
      <div class="bg-white shadow overflow-hidden sm:rounded-md mb-8">
        <ul class="divide-y divide-gray-200">
          {#each $cart as { product, qty }}
            <li class="px-6 py-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    class="h-16 w-16 object-contain rounded-lg bg-gray-100"
                  />
                  <div>
                    <h3 class="text-lg font-medium text-gray-900">{product.name}</h3>
                    <p class="text-sm text-gray-500">{product.description}</p>
                    <p class="text-sm font-medium text-primary-600">
                      {formatPrice(product.price, product.currency)}
                    </p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-4">
                  <div class="flex items-center border border-gray-300 rounded-md">
                    <button 
                      on:click={() => updateQuantity(product.id, qty - 1)}
                      class="px-3 py-1 text-gray-600 hover:bg-gray-100 focus:outline-none"
                      aria-label="Diminuer la quantité"
                    >
                      -
                    </button>
                    <span class="px-3 py-1 text-gray-900 min-w-[2rem] text-center">{qty}</span>
                    <button 
                      on:click={() => updateQuantity(product.id, qty + 1)}
                      class="px-3 py-1 text-gray-600 hover:bg-gray-100 focus:outline-none"
                      aria-label="Augmenter la quantité"
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    on:click={() => remove(product.id)}
                    class="text-red-600 hover:text-red-800 text-sm font-medium"
                    aria-label="Remove from cart"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Cart Summary -->
      <div class="bg-white shadow sm:rounded-lg">
        <div class="px-6 py-4">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Subtotal ({cartCount} item{cartCount > 1 ? 's' : ''})</span>
              <span class="text-gray-900">{formatPrice(total, 'EUR')}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Shipping</span>
              <span class="text-gray-900">Free</span>
            </div>
            <div class="border-t border-gray-200 pt-3">
              <div class="flex justify-between text-lg font-medium">
                <span class="text-gray-900">Total</span>
                <span class="text-primary-600">{formatPrice(total, 'EUR')}</span>
              </div>
            </div>
          </div>
          
          <div class="mt-6 space-y-3">
            <button
              on:click={handleCheckout}
              class="w-full bg-primary-600 text-white py-3 px-4 rounded-md font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            >
              Proceed to Payment
            </button>

            <button
              on:click={clear}
              class="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>
