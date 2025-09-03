<script lang="ts">
  import { onMount } from 'svelte';
  import { products, getProductsByCategory } from '$lib/services/products';
  import { formatPrice } from '$lib/utils';
  import Modal from '$lib/components/Modal.svelte';
  import Toast from '$lib/components/Toast.svelte';
  import type { Product } from '$lib/types';

  let showModal = false;
  let showToast = false;
  let toastMessage = '';
  let toastType = 'success' as 'success' | 'error' | 'warning' | 'info';

  let editingProduct: Product | null = null;
  let productForm = {
    name: '',
    description: '',
    price: 0,
    currency: 'EUR' as 'EUR' | 'CHF' | 'USD',
    image: '',
    tags: [] as string[],
    stock: 0,
    active: true,
    category: ''
  };

  let searchQuery = '';
  let selectedCategory = 'all';
  let currentPage = 1;
  const itemsPerPage = 10;

  let filteredProducts = [];

  $: {
    let filtered = [...products];

    // Filtre par recherche
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtre par catégorie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.tags?.includes(selectedCategory));
    }

    filteredProducts = filtered;
  }

  $: totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  $: paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function openAddModal() {
    editingProduct = null;
    resetForm();
    showModal = true;
  }

  function openEditModal(product: Product) {
    editingProduct = product;
    productForm = {
      name: product.name,
      description: product.description,
      price: product.price,
      currency: product.currency,
      image: product.image,
      tags: product.tags || [],
      stock: product.stock || 0,
      active: product.active,
      category: product.tags?.[0] || ''
    };
    showModal = true;
  }

  function resetForm() {
    productForm = {
      name: '',
      description: '',
      price: 0,
      currency: 'EUR',
      image: '',
      tags: [],
      stock: 0,
      active: true,
      category: ''
    };
  }

  function saveProduct() {
    try {
      if (editingProduct) {
        // Mise à jour du produit existant
        const index = products.findIndex(p => p.id === editingProduct!.id);
        if (index !== -1) {
          products[index] = {
            ...editingProduct,
            ...productForm,
            tags: productForm.category ? [productForm.category] : []
          };
        }
      } else {
        // Nouveau produit
        const newProduct: Product = {
          id: Date.now().toString(),
          slug: productForm.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
          name: productForm.name,
          description: productForm.description,
          price: productForm.price,
          currency: productForm.currency,
          image: productForm.image,
          tags: productForm.category ? [productForm.category] : [],
          stock: productForm.stock,
          active: productForm.active
        };
        products.push(newProduct);
      }

      // Sauvegarder dans localStorage (simulation)
      localStorage.setItem('webshop_products', JSON.stringify(products));

      showModal = false;
      showToast = true;
      toastMessage = editingProduct ? 'Product updated successfully!' : 'Product added successfully!';
      toastType = 'success';

      resetForm();
    } catch (error) {
      showToast = true;
      toastMessage = 'Error saving product';
      toastType = 'error';
    }
  }

  function deleteProduct(productId: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      const index = products.findIndex(p => p.id === productId);
      if (index !== -1) {
        products.splice(index, 1);
        localStorage.setItem('webshop_products', JSON.stringify(products));

        showToast = true;
        toastMessage = 'Product deleted successfully!';
        toastType = 'success';
      }
    }
  }

  function toggleProductStatus(product: Product) {
    product.active = !product.active;
    localStorage.setItem('webshop_products', JSON.stringify(products));

    showToast = true;
    toastMessage = `Product ${product.active ? 'activated' : 'deactivated'} successfully!`;
    toastType = 'success';
  }

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'sports', label: 'Sports' }
  ];
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold text-gray-900">Product Management</h1>
    <button
      on:click={openAddModal}
      class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
    >
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
      Add Product
    </button>
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
          placeholder="Search products..."
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
        <select
          id="category"
          bind:value={selectedCategory}
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {#each categories as category}
            <option value={category.value}>{category.label}</option>
          {/each}
        </select>
      </div>

      <div class="flex items-end">
        <span class="text-sm text-gray-500">
          {filteredProducts.length} products found
        </span>
      </div>
    </div>
  </div>

  <!-- Products Table -->
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each paginatedProducts as product}
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full object-cover" src={product.image} alt={product.name} />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{product.name}</div>
                    <div class="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{formatPrice(product.price, product.currency)}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm text-gray-900">{product.stock ?? 0}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  product.active
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  on:click={() => openEditModal(product)}
                  class="text-blue-600 hover:text-blue-900"
                >
                  Edit
                </button>
                <button
                  on:click={() => toggleProductStatus(product)}
                  class={`hover:text-${product.active ? 'red' : 'green'}-900 ${product.active ? 'text-red-600' : 'text-green-600'}`}
                >
                  {product.active ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  on:click={() => deleteProduct(product.id)}
                  class="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    {#if paginatedProducts.length === 0}
      <div class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No products found</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by creating a new product.</p>
      </div>
    {/if}
  </div>

  <!-- Pagination -->
  {#if totalPages > 1}
    <div class="flex items-center justify-between">
      <div class="text-sm text-gray-700">
        Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} results
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

<!-- Product Modal -->
<Modal title={editingProduct ? 'Edit Product' : 'Add New Product'} bind:show={showModal}>
  <form on:submit|preventDefault={saveProduct} class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="md:col-span-2">
        <label for="name" class="block text-sm font-medium text-gray-700">Product Name</label>
        <input
          type="text"
          id="name"
          bind:value={productForm.name}
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div class="md:col-span-2">
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          bind:value={productForm.description}
          rows="3"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        ></textarea>
      </div>

      <div>
        <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          id="price"
          bind:value={productForm.price}
          min="0"
          step="0.01"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label for="currency" class="block text-sm font-medium text-gray-700">Currency</label>
        <select
          id="currency"
          bind:value={productForm.currency}
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="EUR">EUR (€)</option>
          <option value="CHF">CHF (Fr)</option>
          <option value="USD">USD ($)</option>
        </select>
      </div>

      <div class="md:col-span-2">
        <label for="image" class="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="url"
          id="image"
          bind:value={productForm.image}
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
        <select
          id="category"
          bind:value={productForm.category}
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select Category</option>
          <option value="clothing">Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="accessories">Accessories</option>
          <option value="home">Home & Garden</option>
          <option value="sports">Sports</option>
        </select>
      </div>

      <div>
        <label for="stock" class="block text-sm font-medium text-gray-700">Stock</label>
        <input
          type="number"
          id="stock"
          bind:value={productForm.stock}
          min="0"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>

    <div class="flex items-center">
      <input
        type="checkbox"
        id="active"
        bind:checked={productForm.active}
        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <label for="active" class="ml-2 block text-sm text-gray-900">
        Active product
      </label>
    </div>

    <div class="flex justify-end space-x-3 pt-6 border-t">
      <button
        type="button"
        on:click={() => showModal = false}
        class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
      >
        {editingProduct ? 'Update Product' : 'Create Product'}
      </button>
    </div>
  </form>
</Modal>

<!-- Toast -->
<Toast bind:show={showToast} message={toastMessage} type={toastType} />
