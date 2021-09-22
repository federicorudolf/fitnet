<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
	import { userStore } from '../../store/user';
	import FitnetLogo from '../../components/fitnetlogo.svelte';
  import FitClass from '../../components/class.svelte';
  import Modal from '../../components/modal.svelte';

  let user, classes = [], loading, isModalOpen, errorModal = false, deleteModal = false, filteredClasses = [],
  fitclass = {
    name: 'Mi Clase',
    url: '',
    price: null,
    image: ''
   };

  $: classes;
  $: filteredClasses;
  
  function getClasses() {
    const url = new URL('http://localhost:4555/classes');
    url.searchParams.append('userId', user.id);
    url.searchParams.append('isPro', user.isPro);
    fetch(url.toString())
      .then(res => res.ok ? res.json() : new Error('error'))
      .then(r => filteredClasses = classes = r.classes)
      .catch(err => console.log(err));
  }
  
  onMount(() => {
    let local = window.localStorage;
    user = JSON.parse(local.getItem('fitnet-user'));
    userStore.subscribe(u => {
      if (!u?.uid && !user?.uid) {
        return;
      }
      getClasses();
    });
  });

  function onCardClicked(event) {
    event.preventDefault();
    goto(`class/${event.detail}`)
  }

  function addClass() {
    isModalOpen = true;
  }

  function createClass() {
    fetch(`//localhost:4555/addclass`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(
        { 
          uid: user.uid,
          userId: user.id,
          isPro: user.isPro,
          added: Date.now(),
          duration: 12,
          tags: JSON.stringify(['core', 'runners', 'intenso']),
          ...fitclass
        })
    }).then(res => {
      return res.json();
    }).then(c => {
      classes = [ ...classes, c.class ];
      isModalOpen = false;
    })
  }
  
  function editClass() {
    fetch(`//localhost:4555/addclass`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(
        { 
          uid: user.uid,
          added: Date.now(),
          duration: 30,
          tags: JSON.stringify(['zumba', 'dance', 'baile']),
          ...fitclass
        })
    }).then(res => {
      return res.json();
    }).then(c => {
      getClasses();
      isModalOpen = false;
    })
  }

  function filterClasses(event) {
    console.log(classes);
    filteredClasses = classes.filter(c => c.name.toLowerCase().includes(event.target.value.toLowerCase()));
  }

  function deleteClass(event) {
    fetch(`//localhost:4555/classes/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(
        { 
          id: event.detail,
          userId: user.id,
          isPro: user.isPro
        })
      })
      .then((res) => {
        if(res.ok) {
          classes = classes.filter(el => el.id !== event.detail)
        } else {
          throw new Error('Hubo un error');
        }
      })
      .catch((e) => {
        console.log(e);
        errorModal = true;
      });
  }

</script>
<FitnetLogo size="6em" />

{#if isModalOpen}
  <Modal title="Crear nueva clase">
    <form>
      <div class="mt-3 mb-3">
        <label for="name" class="form-label">Nombre</label>
        <input type="namne" class="form-control" bind:value="{fitclass.name}">
        <label for="image" class="form-label">Imagen</label>
        <input type="url" class="form-control" bind:value="{fitclass.image}">
        <label for="price" class="form-label">Precio</label>
        <input type="number" class="form-control" bind:value="{fitclass.price}">
        <label for="url" class="form-label">Url</label>
        <input type="string" class="form-control" bind:value="{fitclass.url}">
      </div>
    </form>
    <div slot="footer">
      <button class="btn btn-primary" on:click="{createClass}"> Guardar Clase</button>
      <button class="btn btn-outline-primary" on:click="{ () => isModalOpen = false }"> Cancelar</button>
    </div>
  </Modal>
{/if}

{#if errorModal}
  <Modal title="Hubo un error" >
    <h3 class="text-center"> No puedes eliminar la clase </h3>
    <div slot="footer">
      <button class="btn btn-outline-danger float-end" on:click="{ () => errorModal = false }"> Ok</button>
    </div>
  </Modal>
{/if}

{#if deleteModal}
  <Modal title="Confirma" >
    <h3 class="text-center"> ¿Seguro quieres eliminar esta clase? </h3>
    <div slot="footer">
      <button class="btn btn-outline-danger float-end ms-2" on:click="{ deleteClass }"> Eliminar</button>
      <button class="btn btn-primary float-end" on:click="{ () => deleteModal = false }"> Cancelar</button>
    </div>
  </Modal>
{/if}

<section class="homeContainer w-100 h-100">
  {#if !user?.isPro}
    <input
      class="w-100 homeContainer__input"
      type="text"
      name="filter"
      id="filter"
      placeholder="Ecuentra tu clase favorita"
      on:keyup="{filterClasses}">
    {:else}
    <button class="btn btn-primary add-button" on:click="{addClass}">
      <span class="material-icons">add</span>
    </button>
  {/if}

  <div class="homeContainer__classes w-100 h-100 d-flex flex-row flex-wrap justify-content-center align-items-center">
    { #if filteredClasses.length }
      { #each filteredClasses as fitClass}
        <FitClass
          { ...fitClass }
          on:card-clicked="{onCardClicked}"
          on:delete-class="{() => deleteModal = true}"
          on:edit-class="{editClass}"
          showProButtons="{user?.isPro}" />
      {/each }
      {:else if user?.isPro}
        <h1> Todavía no publicaste ninguna clase </h1>
      {:else}
        <h1> No hay clases para mostrar </h1>
    {/if }
  </div>
</section>

<style lang="scss">
@import 'src/assets/variables.scss';

.homeContainer {
  &__input {
    border-radius: 5px;
    background-color: transparent;
    height: 50px;
    color: $indigo-dye !important;
    margin: 0 0 0.5rem 0;
    border: 1px solid lightgray;
    font-size: 1.3em;
    width: 100%;
    padding: 0.5em 1em 0.3em 1em;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    text-align: center;
  }

  &__input::placeholder {
    font-weight: 100;
  }
}

.add-button {
  position: absolute;
  top: 100px;
  right: 50px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>