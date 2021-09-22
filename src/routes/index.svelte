<script>
import { userStore } from '../store/user';
import { goto } from '$app/navigation';
import { onMount } from 'svelte';

onMount(() => {
	let local = window.localStorage;
	let user = JSON.parse(local.getItem('fitnet-user'));
	userStore.subscribe(u => {
		if (!u?.uid && !user?.uid) {
			goto('/auth/login');
		} else {
			goto('/home');
		}
	});
});

</script>

<main>
</main>

<style lang="scss">
	@import 'src/assets/variables.scss';

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>