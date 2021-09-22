<script>
  import Logo from '../../../components/Logo.svelte';
  import auth from '../../../assets/firebase';
  import { goto } from '$app/navigation';
  import { userStore } from '../../../store/user';

	let email, password, name, age, valid, username;
	$: email;
	$: password;
  $: name;
  $: age;
  $: username;
  $: activeTab = 'fitter';

  const registerUser = async () => {
    const { user } = await auth.auth.createUserWithEmailAndPassword(auth.auth.auth, email, password);
    fetch(`//localhost:4555/${activeTab === 'profitter' ? 'pro' : ''}registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(
        { 
          uid: user.uid,
          name,
          username,
          age: age ? age : null,
          email: user.email,
          joined: Date.now(),
          fitcoins: 0,
          photourl: user.photoURL,
          isPro: activeTab === 'profitter'
        })
    })
    .then(async (res) => {
      let user = await res.json();
      window.localStorage.setItem('fitnet-user', JSON.stringify(user.user));
      userStore.updateUser(user.user);
      goto('/home');
    })
    .catch(err => console.log(err));
  }

  const validatePassword = (event) => valid = event.target.value === password && password.length >= 6;

</script>

<section class="login d-flex flex-column justify-content-center align-items-center w-100 h-100">
  <Logo size="6em" />

  <section class="tabContainer d-flex flex-row">
    <button
      class="ps-0 me-3 tabContainer__button { activeTab === 'fitter' ? 'tabContainer__button--active' : '' }"
      type="button"
      on:click="{ () => activeTab = 'fitter' }"> Soy atleta </button>
    <button
      class="pe-0 ms-3 tabContainer__button { activeTab === 'profitter' ? 'tabContainer__button--active' : '' }"
      type="button"
      on:click="{ () => activeTab = 'profitter' }"> Soy un gimnasio </button>
  </section>
  <form class="text-center">
    <div class="mt-5 mb-3">
      <label for="name" class="form-label"> { activeTab === 'fitter' ? 'Nombre y Apellido' : 'Nombre del gimnasio' } </label>
      <input type="name" class="form-control" bind:value="{name}">
    </div>
    <div class="mt-3 mb-3">
      <label for="name" class="form-label">Usuario</label>
      <input type="name" class="form-control" bind:value="{username}">
    </div>
    {#if activeTab === 'fitter'}
      <div class="mt-3 mb-3">
        <label for="age" class="form-label">Edad</label>
        <input type="number" class="form-control" bind:value="{age}">
      </div>
    {/if}
    <div class="mt-3 mb-3">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control" aria-describedby="emailHelp" bind:value="{email}">
      <div id="emailHelp" class="form-text">sample@email.com</div>
    </div>
    <div class="mt-3 mb-3">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control" bind:value="{password}">
      <div id="emailHelp" class="form-text">Mínimo de seis caracteres</div>
    </div>
    <div class="mt-3 mb-5">
      <label for="password" class="form-label">Confirma tu password</label>
      <input type="password" class="form-control" on:keyup="{validatePassword}">
      <div id="emailHelp" class="form-text">Debe ser igual a la anterior</div>
    </div>
    <button disabled="{!valid}" type="button" class="btn btn-primary" on:click="{registerUser}">Crear perfil</button>
  </form>

</section>

<style lang="scss">
  @import 'src/assets/variables.scss';

  .login {
    width: 100%;
    min-height: 500px;
  }

  input {
    min-width: 300px;
    background-color: transparent;
    height: 30px;
    color: $indigo-dye !important;
    margin: 0 0 0.5rem 0;
    border: 1px solid lightgray;
    font-size: 15px;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    text-align: center;
  }

	input:focus-visible {
		box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);
		border: 1px solid #ff3e00 !important;
		outline: none;
	}

  label {
	  color: $usafa-blue !important;
    font-size: 15px;
  }

  .tabContainer {
    padding: 0;
    margin: 10px 0;

    &__button {
      border: none;
      background: none;
      padding: 20px;
      margin: 20px;
      margin-bottom: 0;
      color: $light-blue;
      min-width: 200px;

      &--active {
        color: $usafa-blue;
        border-bottom: 1px solid $usafa-blue;

      }
    }

  }

</style>