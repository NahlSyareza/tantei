<script>
  import Navbar from "./Navbar.svelte";
  import { URL } from "../utils/url.util";
  import random, { MathRandomRNG } from "random";
  import { toast } from "@zerodevx/svelte-toast";

  const user = localStorage.getItem("user");

  let words = [];
  let options = [];
  let max = 0;
  let question = -1;

  function generateIndexes(m) {
    const a = [];
    const realMax = Math.min(4, words.length);
    while (a.length < realMax) {
      const r = random.int(0, m);
      if (a.includes(r)) {
        continue;
      }
      a.push(r);
    }

    return a;
  }

  function randomizeFour(arr) {
    const realMax = Math.min(4, words.length);
    const r = random.int(0, realMax - 1);
    return arr[r];
  }

  function rerandomize() {
    options = generateIndexes(max - 1);
    console.log(options);
    question = randomizeFour(options);
    console.log(question);
  }

  function testType(o, e) {
    switch (e) {
      case "latin":
        return o.latin;

      case "japanese":
        return o.japanese;

      default:
        return o.english;
    }
  }

  URL.get("/word/getAll")
    .then((e) => {
      console.log(e.data);
      words = e.data.payload;
      max = e.data.payload.length;
      options = generateIndexes(max - 1);
      console.log(options);
      question = randomizeFour(options);
      console.log(question);
    })
    .catch((e) => {
      console.error(e);
    });
</script>

<main class="w-full h-full flex flex-col font-montserrat bg-gray-700">
  <!-- <Navbar /> -->
  <div
    class="w-full h-full flex flex-col p-16 bg-gray-700 space-y-2 items-center justify-center"
  >
    {#if words.length > 0 && options.length > 0 && question > -1}
      <div class="w-full h-full flex flex-col space-y-4 items-center">
        <div
          class="w-5/6 h-1/2 bg-slate-800 rounded-xl flex items-center justify-center"
        >
          <p class="text-white text-6xl">
            {testType(words[question], "japanese")}
          </p>
        </div>
        <div class="w-5/6 h-1/2 grid grid-cols-2 grid-rows-2">
          {#each options as o}
            <button
              class="m-2 text-xl bg-slate-800 hover:bg-slate-900 rounded-md text-white flex items-center justify-center"
              on:click={() => {
                if (question == o) {
                  toast.push("Correct", {
                    theme: {
                      "--toastBackground": "green",
                    },
                  });
                } else {
                  toast.push("False", {
                    theme: {
                      "--toastBackground": "red",
                    },
                  });
                }
                rerandomize();
              }}
            >
              {testType(words[o], "english")}
            </button>
          {/each}
        </div>
      </div>
    {:else}
      <p class="text-white">...</p>
    {/if}
  </div>
</main>
