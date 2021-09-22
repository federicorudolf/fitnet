<script context="module">
  export async function load(page) {
    const fitClassId = page.page.params.id;
    let fitClass;
    await fetch(`//localhost:4555/classes/id/${fitClassId}`)
      .then(res => res.json())
      .then(f => {
        fitClass = f.fitClass;
        fitClass.url = fitClass.url.substr(fitClass.url.indexOf('=') + 1);
      })
      .catch(err => console.log(err));
    return {
			props: {
				fitClass: fitClass
			}
		};
  }

</script>

<script>
  import { onMount } from 'svelte';
  import Fitnetlogo from '../../components/fitnetlogo.svelte';
	export let fitClass;

  onMount(() => {
    console.log(fitClass);
  })
</script>

<Fitnetlogo size="6em" />
<h1 class="text-center mt-2 mb-3"> { fitClass.name } </h1>

<iframe src="https://www.youtube.com/embed/{fitClass.url}" frameborder="0" width="100%"></iframe>

<style>
  iframe {
    height: 56.25vw;
  }
</style>