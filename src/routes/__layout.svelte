<script>
  import Header from '../components/header.svelte';
  import { onMount } from 'svelte';
	import { userStore } from '../store/user';
  
  let user, local;

  $: user;

  onMount(() => {
    local = window.localStorage;
    userStore.subscribe(u => user = u);
    if(!user.uid) {
      try {
        user = JSON.parse(local.getItem('fitnet-user'))
      } catch {
        console.log('error obteniendo usuario de localstorage');
      }
    }
  });
</script>

<Header userName="{user?.name}" />

<slot></slot>