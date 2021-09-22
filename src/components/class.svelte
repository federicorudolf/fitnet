<script>
  import { createEventDispatcher, onMount } from 'svelte';
  export let name;
  export let id;
  export let url;
  export let image;
  export let duration;
  export let added;
  export let price;
  export let tags;
  export let showProButtons;
  export let owner;
  export let views;
  export let proFitterId;

  $: {
    tags;
    added;
    if (tags && typeof tags === 'string') {
      tags = JSON.parse(tags);
    }
  }

  const dispatch = createEventDispatcher();

  const colors = [ 'primary', 'secondary', 'danger', 'success', 'warning', 'info', 'dark'];

  function cardClicked() {
    dispatch('card-clicked', id);
  }
  function editClass() {
    dispatch('edit-class', id);
  }
  function deleteClass() {
    dispatch('delete-class', id);
  }

  onMount(() => {
    added = added.substring(0, added.indexOf('T'));
  });

</script>

<div class="card classContainer me-4 mt-3 mb-3">
  <span class="classContainer__date badge rounded-pill bg-light text-dark"> { added } </span>
  {#if image}
    <img src="{image}" class="card-img-top classContainer__image" alt="...">
    {:else}
    <video src="../src/assets/defaultcover.mp4"></video>
  {/if}
  <div class="card-body d-flex flex-column justify-content-between">
    <h5 class="card-title"> { name } </h5>
    { #if tags && typeof tags === 'object'}
      <div class="d-flex flex-row justify-content-around flex-wrap mt-1 mb-1">
        { #each tags as tag}
        <h6><span class="badge bg-{colors[Math.floor(Math.random() * colors.length)]}">{ tag }</span></h6>
        {/each }
      </div>
    {/if }
    <p class="card-text"> Duration { duration } | { price } FitCoins </p>
    {#if showProButtons}
      <div class="d-flex flex-row flex-nowrap justify-content-between">
        <button on:click="{editClass}" class="btn btn-outline-info"> Editar Clase </button>
        <button on:click="{deleteClass}" class="btn btn-danger"> Eliminar Clase </button>
      </div>
      {:else}
      <button on:click|preventDefault="{cardClicked}" class="btn btn-primary"> Ver clase </button>
    {/if}
  </div>
</div>

<style lang="scss">
  @import '../src/assets/variables.scss';
  .classContainer {
    max-width: 350px;
    max-height: 450px;
    min-width: 350px;
    min-height: 450px;
    box-shadow: 2px 2px 10px 2px rgb(230, 230, 230);
    border-radius: 15px;
    cursor: pointer;

    &__image {
      width: 100%;
      height: auto;
    }

    &__date {
      position: absolute;
      top: 15px;
      right: 15px;
    }
  }
</style>