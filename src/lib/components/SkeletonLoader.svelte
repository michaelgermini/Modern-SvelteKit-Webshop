<script lang="ts">
  export let lines: number = 3;
  export let height: string = 'h-4';
  export let className: string = '';
</script>

<div class="animate-pulse space-y-3 {className}">
  {#each Array(lines) as _}
    <div class="bg-gray-200 dark:bg-gray-700 rounded {height}"></div>
  {/each}
</div>
