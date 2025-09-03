<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import PWAInstall from '$lib/components/PWAInstall.svelte';
  import PWARegister from '$lib/components/PWARegister.svelte';
  import '../app.css';


</script>

<div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <Header />

  <main class="flex-1">
    <slot />
  </main>

  <Footer />

  <!-- PWA Components -->
  <PWAInstall />
  <PWARegister />
</div>
