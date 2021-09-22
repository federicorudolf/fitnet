<script context="module">
  export function load(page) {
    console.log(page);
  }
</script>
<script>
  import { goto } from '$app/navigation';
  import auth from '../assets/firebase';
  import Logo from './Logo.svelte';
  import { page } from '$app/stores';
  import { userStore } from '../store/user';

  export let userName;

  let url;

  page.subscribe(p => url = p.path);

  $: url;

  function logout() {
    if (userName) {
      window.localStorage.clear();
      userStore.updateUser({
        id: null,
        uid: null,
        username: null,
        name: null,
        email: null,
        age: null,
        joined: null,
        fitcoins: null
      });
      auth.auth.auth.signOut();
      goto('/auth/login');
    }
  }
</script>

<nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <Logo on:clickedTitle="{ () => goto('/') }" size="2em" />
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse" id="navbarNav">
      {#if userName}
        <ul class="navbar-nav d-flex flex-row">
          <li class="nav-item">
            <a class="{`nav-link ${ url }`}" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/blog">Blog</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/trainings">Trainings</a>
          </li>
          { #if url === '/profile'}
            <li class="nav-item username">
              <a class="nav-link d-flex flex-row justify-content-center align-items-center" href="/">
                <span class="ms-2" on:click="{logout}"> Logout </span>
              </a>
            </li>
            {:else}
            <li class="nav-item username">
              <a class="nav-link d-flex flex-row justify-content-center align-items-center" href="/profile">
                <span class="material-icons">face</span>
                <span class="ms-2">{ userName } </span>
              </a>
            </li>
          {/if }
        </ul>

        {:else}
          <ul class="navbar-nav d-flex flex-row-reverse">
            <li class="nav-item">
              <a class="{`nav-link ${ url }`}" href="/auth/login">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/auth/register">Register</a>
            </li>
          </ul>
      {/if}
    </div>
  </div>
</nav>

<style lang="scss">
  @import 'src/assets/variables.scss';

  .navbar {
    backdrop-filter: blur(2px);
    position: sticky;
    top: 10px;
    background: linear-gradient(225deg, #2a6f97ff, #2c7da0ff, #468fafff, #61a5c2ff);
    border-radius: 5px;
    box-shadow: 2px 2px 10px 2px rgb(230, 230, 230);
    z-index: 10000;
  }

  .nav-item {
    margin-right: 1em;
  }

  .navbar-nav {
    width: 100%;
  }

  .username {
    margin-left: auto;
    
  }
  .nav-link {
    color: $indigo-dye-2;
  }

  .nav-link .active {
    color: $indigo-dye;
    border-bottom: 1px solid $indigo-dye;
  }
</style>
