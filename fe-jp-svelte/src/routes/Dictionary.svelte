<script>
  import Navbar from "./Navbar.svelte";
  import { URL } from "../utils/url.util";

  let words = [];

  // Deprecated
  let letters = [];
  let filterJapanese = "";
  let filterLatin = "";
  let filterTranslation = "";

  // Deprecated
  let filterType = "words";
  let filterKanji = "";
  let filterClass = "";

  let selectedSortType = "createdAt";
  let optionsSortType = ["createdAt", "tabola", "bale", "nonae"];

  // Used to select the type of a kanji word
  let filterTypeType = "";
  let optionsTypeType = ["", "adjective", "noun", "verb"];

  function resetFilters() {
    filterJapanese = "";
    filterLatin = "";
    filterTranslation = "";
    filterClass = "";
  }

  function reapplySort() {
    URL.get(`/word/getAll/${selectedSortType}?sort_type=-1`)
      .then((e) => {
        const r = e.data;
        console.log(r);
        words = [...r.payload];
      })
      .catch((e) => console.error(e));
  }

  URL.get("/word/getAll")
    .then((e) => {
      console.log(e.data);
      words = e.data.payload;
    })
    .catch((e) => {
      console.error(e);
    });

  // Deprecated
  URL.get("/letter/getAll")
    .then((e) => {
      const r = e.data;
      console.log(r);
      letters = r.payload;
    })
    .catch((e) => {
      console.error(e);
    });
</script>

<main class="w-full h-auto flex flex-col font-montserrat bg-gray-700">
  <!-- <Navbar /> -->
  <div class="w-full h-auto flex flex-col p-16 bg-gray-700 space-y-4">
    <div class="w-full text-white flex justify-evenly">
      <button
        on:click={() => {
          resetFilters();
          filterType = "words";
        }}
        class={`w-1/3 p-2 rounded-xl ${filterType === "words" ? "bg-sky-950" : "bg-sky-800"}`}
        >Words</button
      >
      <button
        on:click={() => {
          resetFilters();
          filterType = "letters";
        }}
        class={`w-1/3 p-2 rounded-xl ${filterType !== "words" ? "bg-sky-950" : "bg-sky-800"}`}
        >Letters</button
      >
    </div>
    {#if words.length && filterType === "words"}
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
        <select bind:value={filterTypeType}>
          {#each optionsTypeType as o}
            <option value={o}>{o}</option>
          {/each}
        </select>
      </div>
      <ul class="space-y-4 text-white">
        {#each words as e}
          {#if e.japanese.includes(filterJapanese.toLowerCase()) && e.latin.includes(filterLatin.toLowerCase()) && e.translation.includes(filterTranslation.toLowerCase()) && e.kanji.includes(filterKanji.toLowerCase()) && e.type.includes(filterTypeType.toLowerCase())}
            <li>
              <p>{e.japanese}</p>
              <p>{e.kanji}</p>
              <p>{e.latin}</p>
              <p>{e.translation}</p>
              <p class="italic">{e.type}</p>
              <div class="bg-white h-0.5 w-full mt-4"></div>
            </li>
          {/if}
        {/each}
      </ul>
      <!-- Deprecated -->
    {:else if letters.length && filterType == "letters"}
      <div class="space-x-2 text-black">
        <input bind:value={filterJapanese} type="text" placeholder="Japanese" />
        <input bind:value={filterLatin} type="text" placeholder="Latin" />
        <input bind:value={filterClass} type="text" placeholder="Class" />
      </div>
      <ul class="space-y-4 text-white">
        {#each letters as e}
          {#if e.japanese.includes(filterJapanese.toLowerCase()) && e.latin.includes(filterLatin.toLowerCase()) && e.clas.includes(filterClass.toLowerCase())}
            <li>
              <p>{e.japanese}</p>
              <p>{e.latin}</p>
              <p>{e.clas}</p>
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
