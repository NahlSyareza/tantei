<script>
  import Navbar from "./Navbar.svelte";
  import { URL } from "../utils/url.util";

  let words = [];

  let filterJapanese = "";
  let filterLatin = "";
  let filterTranslation = "";

  let filterKanji = "";
  let filterClass = "";

  let filterSort = "createdAt";
  let filterSortOptions = ["createdAt", "kanji", "latin"];

  let filterSortOrder = "-1";
  let filterSortOrderOptions = ["1", "-1"];

  // Used to select the type of a kanji word
  let filterType = "";
  let filterTypeOptions = ["", "adjective", "noun", "verb"];

  function resetFilters() {
    filterJapanese = "";
    filterLatin = "";
    filterTranslation = "";
    filterClass = "";
  }

  function reapplySort() {
    URL.get(`/word/getAll/${filterSort}?sort_type=${filterSortOrder}`)
      .then((e) => {
        const r = e.data;
        console.log(r);
        words = [...r.payload];
      })
      .catch((e) => console.error(e));
  }
  URL.get(`/word/getAll/${filterSort}?sort_type=${filterSortOrder}`)
    .then((e) => {
      console.log(e.data);
      words = e.data.payload;
      console.log("Shot from /dictionary");
    })
    .catch((e) => {
      console.error(e);
    });
</script>

<main class="w-full h-auto flex flex-col font-montserrat bg-gray-700">
  <!-- <Navbar /> -->
  <div class="w-full h-auto flex flex-col p-16 bg-gray-700 space-y-4">
    <div class="w-full text-white flex justify-evenly"></div>
    {#if words.length}
      <div class="space-x-2 text-black">
        <input bind:value={filterJapanese} type="text" placeholder="Kana" />
        <input bind:value={filterKanji} type="text" placeholder="Kanji" />
        <input bind:value={filterLatin} type="text" placeholder="Latin" />
        <input
          bind:value={filterTranslation}
          type="text"
          placeholder="Translation"
        />
        <select bind:value={filterSort} on:change={reapplySort}>
          {#each filterSortOptions as o}
            <option value={o}> {o} </option>
          {/each}
        </select>
        <select bind:value={filterSortOrder} on:change={reapplySort}>
          {#each filterSortOrderOptions as o}
            <option value={o}> {o} </option>
          {/each}
        </select>
        <select bind:value={filterType}>
          {#each filterTypeOptions as o}
            <option value={o}>{o}</option>
          {/each}
        </select>
      </div>
      <ul class="space-y-4 text-white">
        {#each words as e}
          {#if e.japanese.includes(filterJapanese.toLowerCase()) && e.latin.includes(filterLatin.toLowerCase()) && e.translation.includes(filterTranslation.toLowerCase()) && e.kanji.includes(filterKanji.toLowerCase()) && e.type.includes(filterType.toLowerCase())}
            <li>
              <p>{e.japanese}</p>
              <p>{e.kanji}</p>
              <p>{e.latin}</p>
              <p>{e.translation}</p>
              <p class="italic">{e.type}</p>
              <div class="flex font-bold">
                <pre class="font-montserrat">Included in: </pre>
                {#if e.sets == null}
                  <p>None</p>
                {/if}
                {#each e.sets as s}
                  <pre class="font-montserrat">{s.name} </pre>
                {/each}
              </div>
              <div class="bg-white h-0.5 w-full mt-4"></div>
            </li>
          {/if}
        {/each}
      </ul>
    {:else}
      <p class="text-white">...</p>
    {/if}
  </div>
</main>
