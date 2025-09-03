<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  let deferredPrompt: any = null;
  let isInstallable = false;
  let isInstalled = false;
  let showInstallPrompt = false;

  // Écouter l'événement beforeinstallprompt
  onMount(() => {
    if (!browser) return;

    // Vérifier si l'app est déjà installée
    if ('standalone' in window.navigator && (window.navigator as any).standalone) {
      isInstalled = true;
      return;
    }

    // Pour iOS Safari
    if (window.navigator.userAgent.includes('Safari') && !window.navigator.userAgent.includes('Chrome')) {
      // iOS PWA detection
      const isInStandaloneMode = ('standalone' in window.navigator) && ((window.navigator as any).standalone);
      if (isInStandaloneMode) {
        isInstalled = true;
        return;
      }
    }

    // Écouter l'événement beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      isInstallable = true;
    });

    // Écouter l'événement appinstalled
    window.addEventListener('appinstalled', () => {
      isInstalled = true;
      isInstallable = false;
      deferredPrompt = null;
    });

    // Vérifier périodiquement si l'app est installée
    const checkInstallStatus = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        isInstalled = true;
        isInstallable = false;
      }
    };

    // Vérifier immédiatement et toutes les 2 secondes
    checkInstallStatus();
    const interval = setInterval(checkInstallStatus, 2000);

    return () => {
      clearInterval(interval);
    };
  });

  async function installPWA() {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    deferredPrompt = null;
    isInstallable = false;
  }

  function showIOSInstructions() {
    showInstallPrompt = true;
  }

  function hideInstallPrompt() {
    showInstallPrompt = false;
  }
</script>

{#if isInstallable && !isInstalled}
  <!-- Bouton d'installation pour Android/Chrome -->
  <button
    on:click={installPWA}
    class="fixed bottom-4 right-4 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 z-50"
    aria-label="Install Webshop App"
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
    </svg>
  </button>
{:else if !isInstalled && browser && window.navigator.userAgent.includes('Safari') && !window.navigator.userAgent.includes('Chrome')}
  <!-- Instructions pour iOS Safari -->
  <button
    on:click={showIOSInstructions}
    class="fixed bottom-4 right-4 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 z-50"
    aria-label="Install Webshop App"
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
    </svg>
  </button>
{/if}

<!-- Modal d'instructions iOS -->
{#if showInstallPrompt}
  <div class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
    <div class="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <!-- Modal panel -->
      <div class="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg class="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Install Webshop on iOS
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500 mb-4">
                  To install Webshop on your iOS device:
                </p>
                <ol class="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                  <li>Tap the Share button <span class="inline-block w-4 h-4 bg-gray-300 rounded ml-2"></span></li>
                  <li>Scroll down and tap "Add to Home Screen"</li>
                  <li>Tap "Add" to confirm</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            on:click={hideInstallPrompt}
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
