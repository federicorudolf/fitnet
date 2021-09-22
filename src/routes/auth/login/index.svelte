<script>
  import auth from '../../../assets/firebase';
  import { userStore } from '../../../store/user';
  import { goto } from '$app/navigation';
  import Logo from '../../../components/Logo.svelte';

  let fbAuth = auth.auth;
	let email, password, proUser = false;

	$: email;
	$: password;
  $: proUser;
  
  const startLogin = () => {
    fbAuth.signInWithEmailAndPassword(fbAuth.auth, email, password)
      .then((res) => {
        const url = new URL(`http://localhost:4555/${proUser ? 'pro' : ''}userdata`);
        url.searchParams.append('uid', res.user.uid);
        url.searchParams.append('isPro', proUser ? 'true' : '');
        fetch(url.toString())
        .then(async (r) => {
          let { user } = await r.json();
          userStore.updateUser({ ...user });
          window.localStorage.setItem('fitnet-user', JSON.stringify(user));
          goto('/home');
        })
      })
  }

  const loginWithGoogle = async() => {
    const ggl = new fbAuth.GoogleAuthProvider();
    let user;
    try {
      user = await fbAuth.signInWithPopup(fbAuth.auth, ggl);
      /* TODO: Store response in local database */
      window.localStorage.setItem('fitnet-user', JSON.stringify(user.user));
      goto('/home');
    } catch (error) {
      alert('Error logueando, volve a intentarlo');
      goto('/auth/login');
    }
  }
</script>

<section class="login d-flex flex-column justify-content-center align-items-center w-100 h-100 text-center">
  <Logo size="6em" />
  <form>
    <div class="mt-5 mb-5">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control customInput" aria-describedby="emailHelp" bind:value="{email}">
      <div id="emailHelp" class="form-text">sample@email.com</div>
    </div>
    <div class="mt-5 mb-3">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control customInput" bind:value="{password}">
      <div id="emailHelp" class="form-text">Mínimo de seis caracteres</div>
    </div>
    <div class="mt-3 mb-5">
      <button
        type="button"
        class="btn"
        class:btn-primary="{proUser}"
        class:btn-outline-primary="{!proUser}"
        on:click="{() => proUser = !proUser}"> { proUser ? 'Soy un gimnasio' : 'No soy un gimnasio' } </button>
    </div>
    <button disabled="{!email || !password}" type="button" class="btn btn-primary" on:click="{startLogin}">Login</button>
  </form>

  <hr>

  <button type="button" class="btn btn-primary" on:click="{loginWithGoogle}">Google Signin</button>

  <hr>

  <a href="/auth/register">No tienes una cuenta?</a>
</section>

<style lang="scss">
  @import 'src/assets/variables.scss';

  .login {
    width: 100%;
    min-height: 500px;
  }

  hr {
    width: 3%;
    background-color: $maximum-blue;
  }

  .customInput {
    min-width: 300px;
    border-radius: 5px;
    background-color: transparent;
    height: 50px;
    color: $indigo-dye !important;
    margin: 0 0 0.5rem 0;
    border: 1px solid lightgray;
    font-size: 1.1em;
    width: 100%;
    padding: 0.5em 1em 0.3em 1em;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    text-align: center;
  }

	.customInput:focus-visible {
		box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);
		border: 1px solid #ff3e00 !important;
		outline: none;
	}

  label {
	  color: $usafa-blue !important;
    font-size: 1.25em;
  }

</style>