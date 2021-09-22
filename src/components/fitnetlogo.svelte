<script>
	import { createEventDispatcher } from 'svelte';
	export let size;

	const dispatch = createEventDispatcher();
</script>

<h1 on:click="{ () => dispatch('clickedTitle') }" style="{`font-size:${size}`}"> fitnet </h1>

<style lang="scss">
  h1 {
		text-transform: uppercase;
		font-weight: 100;
		background: linear-gradient(45deg, #012a4aff, #013a63ff, #89c2d9ff, #a9d6e5ff);
  	-webkit-background-clip: text;
  	-webkit-text-fill-color: transparent;
    margin: 0 1em;
		cursor: pointer;
		text-align: center;
	}
</style>