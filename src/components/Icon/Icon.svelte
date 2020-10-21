<script context="module">
  import pathsByName from "./icon-paths"
  export const icons = Object.keys(pathsByName)
  export const directions = ["n", "ne", "e", "se", "s", "sw", "w", "nw"]
</script>

<script>
  export let name = '';
  export let direction = 'n';

  $: paths = pathsByName[name] || []
  $: rotation = directions.indexOf(direction) * 45
</script>

<svg
  class="v_icon"
  viewBox="0 0 48 48"
  fill-rule="evenodd"
  clip-rule="evenodd"
  style="{`transform: rotate(${rotation}deg)`}">
	{#if name === ''}
		<slot />
  {:else}
		{#each paths as path}
			<path d={path} />
		{/each}
  {/if}
</svg>

<style>
  .v_icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    transition: all 0.3s ease-out;
    overflow: visible;
  }
</style>
