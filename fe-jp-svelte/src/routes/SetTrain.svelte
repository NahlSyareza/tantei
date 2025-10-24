<script>
  // import Navbar from "./Navbar.svelte";
  import { URL } from "../utils/url.util";
  import random from "random";
  import { toast } from "@zerodevx/svelte-toast";

  export let params = {};

  const p = "items";
  const s = "items";
  let max = 0;
  let items = [];
  let questions = [];
  let answers = [];
  let question = -1;
  let practice = false;
  let questionType = "kanji";
  let answerType = "translation";

  let reveal = false;

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

  function handleQuestion(q) {
    const r = random.int(0, q.length - 1);
    return q[r];
  }

  function handleQuestions(m) {
    let arr = [];
    for (let i = 0; i < m; i++) {
      arr[i] = i;
    }

    return arr;
  }

  function handleAnswers(incl) {
    let arr = [];
    let kagi = random.int(0, 3);
    let sentinel = 0;
    while (arr.length < 4) {
      if (sentinel == kagi) {
        arr.push(incl);
      } else {
        let e = random.int(0, items.length - 1);
        if (e != incl) {
          arr.push(e);
        }
      }
      sentinel++;
    }

    return arr;
  }

  function handleSubmit() {
    console.log("Was: ", questions.length);
    console.log(questions);
    if (questions.length == 1) {
      console.log("Ja ikuyoo");
      questions = handleQuestions(max);
    } else {
      questions = questions.filter((e) => {
        return e != question;
      });
    }
    console.log("Is: ", questions.length);
    console.log(questions);
    question = handleQuestion(questions);
    answers = handleAnswers(question);
  }

  URL.get(`/set/get/${params.set}?p=${p}&s=${s}`)
    .then((e) => {
      const r = e.data;
      items = r.payload.items;
      console.log(r);
      console.log(items);
      max = items.length;
      questions = handleQuestions(max);
      console.log(questions);
      question = handleQuestion(questions);
      answers = handleAnswers(question);
      console.log(answers);
    })
    .catch((e) => {
      console.error(e);
    });

  function handleMouseEnter() {
    reveal = true;
  }

  function handleMouseLeave() {
    reveal = false;
  }
</script>

<main class="w-full flex flex-col font-montserrat bg-gray-700 text-white">
  <!-- <Navbar /> -->
  <div
    class="w-full h-full flex flex-col p-8 bg-gray-700 space-y-2 items-center justify-center"
  >
    {#if items.length > 0 && answers.length > 0 && question > -1 && questions.length > 0}
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
          on:mouseenter={handleMouseEnter}
          on:mouseleave={handleMouseLeave}
        >
          <p class="text-white lg:text-6xl text-3xl text-wrap py-32">
            {testType(items[question], !reveal ? questionType : "japanese")}
          </p>
        </div>
        <div class="lg:w-5/6 w-full h-1/2 grid grid-cols-2 grid-rows-2">
          {#each answers as o}
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
                // rerandomize();
                handleSubmit();
              }}
            >
              {testType(items[o], answerType)}
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
      <p>Answer Type</p>
      <select bind:value={answerType} class="bg-gray-600 lg:w-1/12 w-auto p-4">
        <option value="translation">Translation</option>
        <option value="latin">Latin</option>
        <option value="japanese">Japanese</option>
        <option value="kanji">Kanji</option>
      </select>
      <!-- <p>Hint Type</p>
      <select bind:value={answerType} class="bg-gray-600 lg:w-1/12 w-auto p-4">
        <option value="translation">Translation</option>
        <option value="latin">Latin</option>
        <option value="japanese">Japanese</option>
        <option value="kanji">Kanji</option>
      </select> -->
    </div>
  </div>
</main>
