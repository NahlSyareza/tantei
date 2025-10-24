<script>
  // import Navbar from "./Navbar.svelte";
  import { URL } from "../../utils/url.util";
  import random from "random";
  import { toast } from "@zerodevx/svelte-toast";

  export let params = {};
  const p = "items";
  const s = "items";
  let max = 0;
  let items = [];
  let options = [];
  let question = -1;
  let practice = false;
  let questionType = "kanji";
  let optionsType = "translation";

  function generateIndexes(m) {
    const a = [];
    const realMax = Math.min(4, items.length);
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
    const r = random.int(0, Math.min(4, items.length) - 1);
    return arr[r];
  }

  function rerandomize() {
    generateIndexes(max - 1);
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

      case "kanji":
        return o.kanji;

      default:
        return o.translation;
    }
  }

  console.log(params.set);

  URL.get(`/set/get/${params.set}?p=${p}&s=${s}`)
    .then((e) => {
      const r = e.data;
      items = r.payload.items;
      console.log(r);
      console.log(items);
      max = items.length;
      options = generateIndexes(max - 1);
      question = randomizeFour(options);
    })
    .catch((e) => {
      console.error(e);
    });
</script>

<main class="w-full flex flex-col font-montserrat bg-gray-700 text-white">
  <!-- <Navbar /> -->
  <div
    class="w-full h-full flex flex-col p-8 bg-gray-700 space-y-2 items-center justify-center"
  >
    {#if items.length > 0 && options.length > 0 && question > -1}
      <div class="w-full h-full flex flex-col space-y-4 items-center">
        <button
          on:click={() => {
            practice = !practice;
          }}
          class={`${!practice ? "bg-slate-800" : "bg-slate-900"} text-white p-2 rounded-md`}
        >
          Practice
        </button>
        <div
          class="lg:w-5/6 w-full h-1/2 bg-slate-800 rounded-xl flex items-center justify-center"
        >
          <p class="text-white lg:text-6xl text-3xl text-wrap py-32">
            {testType(items[question], questionType)}
          </p>
        </div>
        <div class="lg:w-5/6 w-full h-1/2 grid grid-cols-2 grid-rows-2">
          {#each options as o}
            <button
              class={`py-14 m-2 text-4xl ${practice && question == o ? "bg-green-700 hover:bg-emerald-800" : "bg-slate-800 hover:bg-slate-900"}  rounded-md text-white flex items-center justify-center`}
              on:click={() => {
                if (items[question].kanji == items[o].kanji) {
                  toast.push(
                    // `${items[question].kanji} mo ${items[o].kanji} | ${question} mo ${o}`,
                    "Correct",
                    {
                      theme: {
                        "--toastBackground": "green",
                      },
                    }
                  );
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
              {testType(items[o], optionsType)}
            </button>
          {/each}
        </div>
      </div>
    {:else}
      <p class="text-white">...</p>
    {/if}

    <div class="flex flex-col w-full space-y-2">
      <p>Question Type</p>
      <select
        bind:value={questionType}
        class="bg-gray-600 lg:w-1/12 w-auto p-4"
      >
        <option value="translation">Translation</option>
        <option value="latin">Latin</option>
        <option value="japanese">Japanese</option>
        <option value="kanji">Kanji</option>
      </select>
      <p>Options Type</p>
      <select bind:value={optionsType} class="bg-gray-600 lg:w-1/12 w-auto p-4">
        <option value="translation">Translation</option>
        <option value="latin">Latin</option>
        <option value="japanese">Japanese</option>
        <option value="kanji">Kanji</option>
      </select>
    </div>
  </div>
</main>
