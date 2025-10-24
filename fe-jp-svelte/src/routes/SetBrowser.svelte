<script>
  import { URL } from "../utils/url.util";
  // import Navbar from "./Navbar.svelte";
  import { push } from "svelte-spa-router";
  import { name } from "../utils/shared.util";

  const p = "owner items";
  const s = "";

  let onlyYours = false;
  let sets = [];

  URL.get(`/set/getAll/?p=${p}&s=${s}`)
    .then((e) => {
      const r = e.data;
      console.log(r);
      sets = r.payload;
    })
    .catch((e) => {
      console.error(e);
    });
</script>

<main class="w-full h-full bg-gray-700 font-montserrat">
  <!-- <Navbar /> -->
  <div class="w-full flex flex-col space-y-4">
    <div class="flex space-x-4 text-white mt-4 px-8">
      <input type="checkbox" bind:checked={onlyYours} />
      <p>Owned</p>
    </div>
    <div
      class="w-full grid lg:grid-cols-10 md:grid-cols-6 sm:grid-cols-4 grid-cols-2 text-white"
    >
      {#if sets.length}
        {#each sets as e}
          {#if !onlyYours || (onlyYours && e.owner.name == $name)}
            <div class="flex justify-center items-center">
              <button
                on:click={() => {
                  push(`/set/view/${e._id}`);
                }}
                class="aspect-square w-32 bg-slate-800 flex flex-col items-center justify-center space-y-4 rounded-xl m-2"
              >
                <p>{e.name}</p>
                <!-- <p>By: {e.owner.name}</p> -->
              </button>
            </div>
          {/if}
        {/each}
      {/if}
    </div>
  </div>
</main>
