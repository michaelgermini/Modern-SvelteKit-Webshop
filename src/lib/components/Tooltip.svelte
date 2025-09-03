<script lang="ts">
  import { onMount } from 'svelte';

  export let content: string;
  export let position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  export let delay: number = 300;
  export let disabled: boolean = false;

  let show = false;
  let timeoutId: number;
  let tooltipElement: HTMLElement;
  let triggerElement: HTMLElement;

  function showTooltip() {
    if (disabled) return;
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      show = true;
    }, delay);
  }

  function hideTooltip() {
    clearTimeout(timeoutId);
    show = false;
  }

  function getTooltipClasses(): string {
    const baseClasses = 'absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm transition-opacity duration-200 pointer-events-none';
    const positionClasses = {
      top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
    };

    return `${baseClasses} ${positionClasses[position]} ${show ? 'opacity-100' : 'opacity-0'}`;
  }

  function getArrowClasses(): string {
    const baseClasses = 'absolute w-2 h-2 bg-gray-900 transform rotate-45';
    const positionClasses = {
      top: 'top-full left-1/2 transform -translate-x-1/2 -mt-1',
      bottom: 'bottom-full left-1/2 transform -translate-x-1/2 -mb-1',
      left: 'left-full top-1/2 transform -translate-y-1/2 -ml-1',
      right: 'right-full top-1/2 transform -translate-y-1/2 -mr-1'
    };

    return `${baseClasses} ${positionClasses[position]}`;
  }

  onMount(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  });
</script>

<div class="relative inline-block">
  <div
    bind:this={triggerElement}
    on:mouseenter={showTooltip}
    on:mouseleave={hideTooltip}
    on:focus={showTooltip}
    on:blur={hideTooltip}
    role="button"
    tabindex="0"
    aria-describedby={show ? 'tooltip-content' : undefined}
  >
    <slot />
  </div>

  {#if show}
    <div
      id="tooltip-content"
      bind:this={tooltipElement}
      class={getTooltipClasses()}
      role="tooltip"
    >
      {content}
      <div class={getArrowClasses()}></div>
    </div>
  {/if}
</div>
