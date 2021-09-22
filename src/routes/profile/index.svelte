<script>
import { onMount } from 'svelte';
import { userStore } from '../../store/user';

let user;

onMount(() => {
  let local = window.localStorage;
  userStore.subscribe(u => user = u);
  if(!user.uid) {
    user = JSON.parse(local.getItem('fitnet-user'));
  }
})
</script>

<section class="profileContainer d-flex flex-column justify-content-center align-items-center w-100 h-100 mt-2 mb-2 p-5">
  {#if user?.photourl}
    <img src="{user?.photourl}" alt="profile picture">
    {:else}
    <span class="material-icons">face</span>
  {/if}
  <h1> {user?.name} </h1>
  <h3 class="mt-3 mb-3"> FitCoins disponibles: </h3> 
  <h3> {user?.fitcoins} </h3>
</section>

<style lang="scss">
  @import 'src/assets/variables.scss';

  .profileContainer{
    background-color: $white;
    border-radius: 10px;
    box-shadow: 2px 2px 10px 2px rgb(230, 230, 230);
  }

  .material-icons {
    font-size: 200px;
  }
</style>