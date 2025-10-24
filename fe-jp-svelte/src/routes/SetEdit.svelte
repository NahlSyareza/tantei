<script>
  import Navbar from "./Navbar.svelte";
  import { URL } from "../utils/url.util";
  import { onMount } from "svelte";
  import { toast } from "@zerodevx/svelte-toast";

  export let params = {};
  let items = [];
  let included = [];
  let filterJapanese = "";
  let filterLatin = "";
  let filterTranslation = "";
  let filterKanji = "";
  let markako = [];

  let selectedSortType = "createdAt";

  let optionsSortType = ["createdAt", "tabola", "bale", "nonae"];

  function nakaNi(e, f) {
    const ret = f.some((g) => {
      return g._id == e._id;
    });

    return ret;
  }

  function reapplySort() {
    URL.get(`/word/getAll/${selectedSortType}?sort_type=-1`)
      .then((e) => {
        const r = e.data;
        console.log(r);
        items = [...r.payload];
      })
      .catch((e) => console.error(e));
  }

  onMount(async () => {
    const getAll = await URL.get("/word/getAll");
    const getLimit = await URL.get("/word/getLimit/5");
    const setContents = await URL.get(`/set/get/${params.set}?p=items`);
    console.log(getAll.data);
    console.log(getLimit.data);
    console.log(setContents.data);
    items = getAll.data.payload;
    included = setContents.data.payload.items;
  });
</script>

<main class="w-full h-full bg-gray-700 font-montserrat">
  <!-- <Navbar /> -->
  <div class="w-full h-auto flex flex-col p-16 bg-gray-700 space-y-4">
    {#if items.length}
      <div class="space-x-2 text-black">
        <input bind:value={filterJapanese} type="text" placeholder="Kana" />
        <input bind:value={filterKanji} type="text" placeholder="Kanji" />
        <input bind:value={filterLatin} type="text" placeholder="Latin" />
        <input
          bind:value={filterTranslation}
          type="text"
          placeholder="Translation"
        />
        <select bind:value={selectedSortType} on:change={reapplySort}>
          {#each optionsSortType as o}
            <option value={o}> {o} </option>
          {/each}
        </select>
      </div>
      <ul class="space-y-4 text-white">
        {#each items as e, i}
          <li class={`${nakaNi(e, included) ? "opacity-25" : "opacity-100"}`}>
            {#if e.japanese.includes(filterJapanese.toLowerCase()) && e.latin.includes(filterLatin.toLowerCase()) && e.translation.includes(filterTranslation.toLowerCase()) && e.kanji.includes(filterKanji.toLowerCase())}
              <button
                on:click={async () => {
                  if (nakaNi(e, included)) {
                    const q = await URL.post("/set/remove", {
                      set: params.set,
                      item: e._id,
                    });

                    toast.push(q.data.msg, {
                      theme: {
                        "--toastBackground": "red",
                      },
                    });

                    included = included.filter((ind) => ind._id !== e._id);
                    console.log(markako);
                    return;
                  }

                  const q = await URL.post("/set/add", {
                    set: params.set,
                    item: e._id,
                  });

                  included = [...included, items[i]];

                  toast.push(q.data.msg, {
                    theme: {
                      "--toastBackground": "green",
                    },
                  });
                }}
                class="w-full flex flex-col items-start"
              >
                <p>{e.japanese}</p>
                <p>{e.kanji}</p>
                <p>{e.latin}</p>
                <p>
                  {e.translation}
                </p>
                <div class="bg-white h-0.5 w-full mt-4"></div>
              </button>
            {/if}
          </li>
        {/each}
      </ul>
    {:else}
      <p class="text-white">...</p>
    {/if}
  </div>
</main>
