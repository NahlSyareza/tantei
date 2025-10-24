<script>
  import { push } from "svelte-spa-router";
  import { URL } from "../utils/url.util";
  import { name } from "../utils/shared.util";
  import random from "random";

  let set = {};
  let items = [];
  let questions = [];
  let options = [];
  let current = 0;
  let v = 0;
  let count = 8;

  function deb(state) {
    if (state) {
      v = random.int(0, 2);
    }
  }

  function chooseRand(items, length) {
    questions = [];
    options = [];
    let c = 0;
    let filter = [];
    while (c < length) {
      let num = random.int(0, items.length - 1);
      while (filter.includes(num)) {
        num = random.int(0, items.length - 1);
      }
      filter.push(num);
      questions = [...questions, items[num]];
      c++;
    }

    c = 0;
    filter = [];
    while (c < length) {
      let num = random.int(0, questions.length - 1);
      while (filter.includes(num)) {
        num = random.int(0, questions.length - 1);
      }
      filter.push(num);
      options = [...options, questions[num]];
      c++;
    }
  }

  URL.get("/set/get/6852c9875789492bf4b9b5c9?p=items")
    .then((r) => {
      console.log(r.data);
      set = r.data.payload;
      items = set.items;
      chooseRand(items, count);
      deb(true);
    })
    .catch((e) => {
      console.error(e);
    });
</script>

<main class="w-full h-full bg-gray-700 font-montserrat">
  <div
    class="flex flex-col space-y-10 w-full h-full justify-center items-center"
  >
    <div class="flex w-full justify-center text-white">
      {#if questions.length}
        {#each questions as q, i}
          <!-- <p>SSS</p> -->
          <p
            class={`text-4xl ${i < current ? "text-green-600" : "text-white"}`}
          >
            {@html q.kanji + ""}
          </p>
        {/each}
      {/if}
    </div>

    <div class={`flex w-full text-white justify-center space-x-4`}>
      {#if options}
        {#each options as i}
          <button
            on:click={() => {
              if (i.kanji == questions[current].kanji) {
                current++;
                if (current >= count) {
                  chooseRand(items, count);
                  current = 0;
                }
              }
            }}
            class="text-3xl bg-slate-800 hover:bg-slate-900 p-4 rounded-md"
            >{i.translation}</button
          >
        {/each}
      {/if}
    </div>

    <p>{current}</p>

    <!-- <p>{v}</p> -->
  </div>
</main>
