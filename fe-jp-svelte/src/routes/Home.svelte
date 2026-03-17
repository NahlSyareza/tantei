<script>
  import { URL } from "../utils/url.util";
  import Navbar from "./Navbar.svelte";
  import { onMount } from "svelte";

  onMount(() => {
    const changeWord = setInterval(() => {
      wordIndex = (wordIndex + 1) % randomWords.length;
    }, 2000);

    return () => {
      clearInterval(changeWord);
    };
  });

  let randomWords = [];
  let wordIndex = 0;
  URL.get("/word/getLimit/10")
    .then((e) => {
      console.log(e.data);
      randomWords = e.data.payload;
    })
    .catch((e) => console.error(e));
</script>

<main class="w-full h-full bg-[#FFFFEF]"></main>
<!-- <main class="w-full h-full bg-gray-700 font-montserrat">
  <div class="text-white p-16 flex flex-col items-center space-y-8">
    {#if randomWords.length}
      <div class="space-y-3">
        <p class="text-7xl text-center">{randomWords[wordIndex].japanese}</p>
        <p class="text-5xl text-center">{randomWords[wordIndex].kanji}</p>
        <p class="text-5xl text-center">{randomWords[wordIndex].translation}</p>
      </div>
    {/if}
    <p class="text-xl">Random japanese words</p>
  </div>
</main> -->
