<script>
  import Navbar from "./Navbar.svelte";
  import { push } from "svelte-spa-router";
  import { URL } from "../utils/url.util";
  import { name } from "../utils/shared.util";

  export let params = {};
  const p = "items owner";
  const s = "";
  let set = {};
  let owner = "";

  URL.get(`/set/get/${params.set}?p=${p}&s=${s}`)
    .then((e) => {
      const r = e.data;
      if (r.success) {
        set = r;
        console.log(r);
        owner = r.payload.owner.name;
      }
    })
    .catch((e) => {
      console.error(e);
    });
</script>

<main class="w-full h-full bg-gray-700 font-montserrat">
  <!-- <Navbar /> -->
  <div class="text-white p-16 bg-gray-700 flex flex-col items-center space-y-8">
    {#if Object.keys(set).length}
      <p>{set.payload.name}</p>
      <!-- <p>By: {owner}</p> -->
      <p>Set of {set.payload.__t}</p>
      <div class="lg:w-1/3 w-full flex justify-evenly">
        <button
          on:click={() => {
            push(`/set/train/${params.set}`);
          }}
          class="w-auto h-auto bg-sky-800 p-4 rounded-md hover:bg-sky-900"
        >
          Train
        </button>
        <!-- {#if $name === owner} -->
        <button
          on:click={() => {
            push(`/set/edit/${params.set}`);
          }}
          class="w-auto h-auto bg-sky-800 p-4 rounded-md hover:bg-sky-900"
        >
          Edit
        </button>
        <!-- {/if} -->
      </div>
      <div class="grid lg:grid-cols-6 grid-cols-1 w-full">
        {#each set.payload.items as e}
          <div class="flex flex-col items-center bg-gray-800 m-2 p-2">
            <p>{e.japanese}</p>
            <p>{e.kanji}</p>
            <p>{e.latin}</p>
            <p>{e.translation}</p>
          </div>
        {/each}
      </div>
    {:else}
      <p>...</p>
    {/if}
  </div>
</main>
