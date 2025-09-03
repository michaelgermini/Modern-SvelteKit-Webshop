<script lang="ts">
  import { bySlug, getProductDetails, getRelatedProducts } from '$lib/services/products';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { add } from '$lib/stores';
  import { formatPrice } from '$lib/utils';
  import { reviews } from '$lib/stores';
  import ProductReviews from '$lib/components/ProductReviews.svelte';
  import ReviewForm from '$lib/components/ReviewForm.svelte';
  import { Toast } from '$lib/components';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import type { Product } from '$lib/types';

  let slug: string;
  let product: Product | undefined;

  // Initialiser le slug depuis les paramètres de la page
  $: slug = $page?.params?.slug || '';

  // Rechercher le produit quand le slug change
  $: product = slug ? bySlug(slug) : undefined;

  // Debug: log the result (only in development)
  $: if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.log('Page slug:', slug);
    console.log('Found product:', product ? product.name : 'null');
    if (!product && slug) {
      console.warn(`Produit "${slug}" introuvable`);
    }
  }

  // Détails enrichis du produit
  $: productDetails = product ? getProductDetails(product) : null;
  $: relatedProducts = product ? getRelatedProducts(product, 4) : [];

  let productReviews: any[] = [];
  let showReviewForm = false;
  let showToast = false;
  let message = '';
  let type: 'success' | 'error' | 'warning' | 'info' = 'info';
  let selectedShipping = 'standard';

  // Charger les avis du produit
  $: if (product) {
    reviews.subscribe((allReviews: any[]) => {
      productReviews = allReviews.filter(review => review.productId === product.id);
    });
  }

  function handleAddToCart() {
    if (!product) return;
    add({ product, qty: 1 });
    showNotification(`${product.name} added to cart!`, 'success');
  }

  function handleReviewAdded(event: any) {
    const { review } = event.detail;
    showNotification('Review added successfully!', 'success');
    // Les avis se mettent à jour automatiquement via la subscription
  }

  function handleRelatedProductClick(event: any) {
    const relatedProduct = event.detail.product;
    // Navigation vers le produit connexe
    goto(`/product/${relatedProduct.slug}`);
  }

  function showNotification(notificationMessage: string, notificationType: 'success' | 'error' | 'warning' | 'info') {
    showToast = true;
    message = notificationMessage;
    type = notificationType;
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goToRelatedProduct(relatedProduct: Product) {
    goto(`/product/${relatedProduct.slug}`);
  }

  function goToCategory(category: string) {
    goto(`/products?category=${category}`);
  }

  function goToProductsPage() {
    goto('/products');
  }

  // Show/hide back to top button
  function handleScroll() {
    const button = document.getElementById('back-to-top');
    if (button) {
      if (window.scrollY > 300) {
        button.style.display = 'block';
        setTimeout(() => {
          button.classList.remove('opacity-0', 'translate-y-4');
          button.classList.add('opacity-100', 'translate-y-0');
        }, 10);
      } else {
        button.classList.remove('opacity-100', 'translate-y-0');
        button.classList.add('opacity-0', 'translate-y-4');
        setTimeout(() => {
          button.style.display = 'none';
        }, 200);
      }
    }
  }

  // Add scroll event listener
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
  }
</script>

<svelte:head>
  <title>{product?.name || 'Product'} - SvelteKit Webshop</title>
  <meta name="description" content={product?.description || 'Product details'} />
</svelte:head>

{#if !product}
  <section class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="max-w-2xl mx-auto text-center">
      <div class="mb-8">
        <svg class="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-.966-5.618-2.479a1 1 0 10-1.264 1.55A9.96 9.96 0 0012 17c2.34 0 4.29-.966 5.618-2.479a1 1 0 10-1.264-1.55A7.962 7.962 0 0112 13z"></path>
        </svg>
      </div>

      <h1 class="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
      <p class="text-gray-600 mb-8">
        The product "{slug || 'requested product'}" doesn't exist or has been removed from our catalog.
      </p>

      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h3 class="text-lg font-semibold text-yellow-900 mb-2">🔍 How to find available products:</h3>
        <ul class="text-sm text-yellow-800 space-y-1 text-left">
          <li>• Go back to the <a href="/" class="underline hover:text-yellow-900">homepage</a> and browse our product sections</li>
          <li>• Use the <a href="/products" class="underline hover:text-yellow-900">products page</a> with filters and search</li>
          <li>• Check the debug section at the bottom of the homepage for all available product URLs</li>
          <li>• Open your browser's developer console (F12) to see available slugs</li>
        </ul>


      </div>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          on:click={() => window.location.href = '/'}
          class="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          Back to Home
        </button>
        <button
          on:click={() => window.location.href = '/products'}
          class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
          Browse Products
        </button>
      </div>
    </div>
  </section>
{:else}
  <section class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="max-w-6xl mx-auto">
      <!-- Breadcrumb -->
      <nav class="mb-8">
        <ol class="flex items-center space-x-2 text-sm text-gray-500">
          <li><a href="/" class="hover:text-primary-600">Home</a></li>
          <li>/</li>
          <li><a href="/products" class="hover:text-primary-600">Products</a></li>
          <li>/</li>
          <li class="text-gray-900">{product.name}</li>
        </ol>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Product Image -->
        <div class="space-y-4">
          <div class="aspect-square bg-gray-100 rounded-2xl p-8">
            <img 
              src={product.image} 
              alt={product.name} 
              class="w-full h-full object-contain"
            />
          </div>
          
          {#if product?.tags && product.tags.length > 0}
            <div class="flex flex-wrap gap-2">
              {#each product.tags as tag}
                <button
                  on:click={() => goToCategory(tag)}
                  class="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full hover:bg-primary-200 transition-colors cursor-pointer"
                >
                  {tag}
                  <svg class="w-3 h-3 ml-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              {/each}
            </div>
          {/if}
        </div>

        <!-- Product Info -->
        <div class="space-y-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p class="text-lg text-gray-600">{product.description}</p>
          </div>

          <div class="text-3xl font-bold text-primary-600">
            {formatPrice(product.price, product.currency)}
          </div>

          <!-- Quick Navigation -->
          <div class="flex flex-wrap gap-3 pt-4">
            <button
              on:click={goToProductsPage}
              class="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
              </svg>
              All Products
            </button>
            {#if product?.tags && product.tags.length > 0}
              <button
                on:click={() => goToCategory(product.tags[0])}
                class="inline-flex items-center px-4 py-2 border border-primary-300 text-primary-700 text-sm rounded-lg hover:bg-primary-50 transition-colors"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
                More {product?.tags?.[0]}
              </button>
            {/if}
          </div>

          {#if product.stock !== undefined}
            <div class="flex items-center space-x-2">
              {#if product.stock > 0}
                <span class="text-green-600 text-sm font-medium">
                  ✓ In stock ({product.stock} available)
                </span>
              {:else}
                <span class="text-red-600 text-sm font-medium">
                  ✗ Out of stock
                </span>
              {/if}
            </div>
          {/if}

          <div class="space-y-4">
            <button
              on:click={handleAddToCart}
              disabled={product.stock === 0}
              class="w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {(product.stock ?? 0) > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>

            <button
              on:click={handleAddToCart}
              disabled={!product || product.stock === 0}
              class="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Buy Now
            </button>
          </div>

          <!-- Product Details -->
          <div class="border-t border-gray-200 pt-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
            <dl class="space-y-3">
              {#each Object.entries(productDetails?.specs || {}) as [key, value]}
                <div class="flex justify-between">
                  <dt class="text-gray-600">{key}</dt>
                  <dd class="text-gray-900 font-medium">{value}</dd>
                </div>
              {/each}
            </dl>
          </div>

          <!-- Shipping Information -->
          {#if productDetails?.shipping}
            <div class="border-t border-gray-200 pt-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Shipping & Delivery</h3>
              <div class="space-y-4">
                <!-- Free Shipping -->
                {#if productDetails.shipping.free.enabled}
                  <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div class="flex items-center">
                      <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div class="ml-3">
                        <p class="text-sm font-medium text-green-800">
                          🎉 Free shipping on this order!
                        </p>
                      </div>
                    </div>
                  </div>
                {/if}

                <!-- Shipping Options -->
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <div class="font-medium text-gray-900">Standard Shipping</div>
                      <div class="text-sm text-gray-600">{productDetails.shipping.standard.time}</div>
                    </div>
                    <div class="text-right">
                      <div class="font-medium text-gray-900">{formatPrice(productDetails.shipping.standard.cost, 'EUR')}</div>
                      <div class="text-sm text-gray-600">Tracked</div>
                    </div>
                  </div>

                  <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <div class="font-medium text-gray-900">Express Shipping</div>
                      <div class="text-sm text-gray-600">{productDetails.shipping.express.time}</div>
                    </div>
                    <div class="text-right">
                      <div class="font-medium text-gray-900">{formatPrice(productDetails.shipping.express.cost, 'EUR')}</div>
                      <div class="text-sm text-gray-600">Tracked</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {/if}

          <!-- Warranty Information -->
          {#if productDetails?.warranty}
            <div class="border-t border-gray-200 pt-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Warranty & Support</h3>
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h4 class="text-sm font-medium text-blue-800">
                      {productDetails.warranty.duration} Warranty
                    </h4>
                    <div class="mt-2 text-sm text-blue-700">
                      <p>{productDetails.warranty.coverage}</p>
                      <p class="mt-1">{productDetails.warranty.support}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {/if}
        </div>
      </div>

      <!-- Customer Reviews Section -->
      <div class="mt-16 pt-16 border-t border-gray-200">
        <ProductReviews
          productId={product.id}
          reviews={productReviews}
          showForm={showReviewForm}
          on:addReview={handleReviewAdded}
        >
          <div slot="review-form">
            <ReviewForm
              productId={product.id}
              showForm={showReviewForm}
              on:reviewAdded={handleReviewAdded}
              on:cancel={() => showReviewForm = false}
            />
          </div>
        </ProductReviews>
      </div>

      <!-- Related Products Section -->
      {#if relatedProducts.length > 0}
        <div class="mt-16 pt-16 border-t border-gray-200">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">You might also like</h2>
            <p class="text-gray-600">Products similar to {product.name}</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {#each relatedProducts as relatedProduct}
              <div
                class="group cursor-pointer transform hover:scale-105 transition-transform duration-200"
                on:click={() => goToRelatedProduct(relatedProduct)}
                on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goToRelatedProduct(relatedProduct); } }}
                role="button"
                tabindex="0"
                aria-label="View {relatedProduct.name} details"
              >
                <ProductCard product={relatedProduct} />
                <div class="mt-2 text-center">
                  <button
                    on:click={(e) => {
                      e.stopPropagation();
                      goToRelatedProduct(relatedProduct);
                    }}
                    class="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            {/each}
          </div>

          <div class="text-center mt-8">
            <a
              href="/products"
              class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              View All Products
              <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      {/if}
    </div>
  </section>

  <!-- Toast Notifications -->
  <Toast
    show={showToast}
    message={message}
    type={type}
    on:close={() => showToast = false}
  />

  <!-- Back to Top Button -->
  <button
    on:click={scrollToTop}
    class="fixed bottom-8 right-8 bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 opacity-0 transform translate-y-4"
    id="back-to-top"
    style="display: none;"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
    </svg>
  </button>
{/if}
