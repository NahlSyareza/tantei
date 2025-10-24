<script>
  import { push } from "svelte-spa-router";
  import { toast } from "@zerodevx/svelte-toast";
  import { storedURL, name } from "../utils/shared.util";
  import { onDestroy, onMount } from "svelte";

  let showChoices = false;
  let currentURL = window.location.hash;

  let choices = [
    { id: "/dictionary", display: "Dictionary" },
    // { id: "/word/train", display: "Super Training" },
    { id: "/set_browser", display: "Set Browser" },
    { id: "/register", display: "Register" },
    { id: "/login", display: "Login" },
  ];

  window.addEventListener("hashchange", () => {
    currentURL = location.hash;
  });

  function handleBlankClick(e) {
    if (e.target.id === "navbar") {
      return;
    }
    console.log("Navbar clicked");
  }

  onMount(() => {
    window.addEventListener("click", handleBlankClick);
  });

  onDestroy(() => {
    window.removeEventListener("click", handleBlankClick);
  });
</script>

<main
  class="w-full h-24 bg-slate-500 font-montserrat flex text-black"
  id="navbar"
>
  <div class="w-1/2 h-auto flex items-center p-2">
    <img
      id="navbar"
      src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Kaito_Kid_signature.svg"
      class="h-5/6"
      alt="かいとキッド"
    />
    <div class="h-full mx-4 bg-gray-800 w-0.5"></div>
    <button
      on:click={() => {
        push("/");
      }}
      class="text-2xl">Tantei</button
    >
    <div class="mx-4"></div>
    <p>Hello, {$name}!</p>
    <!-- <p
      on:click={() => {
        toast.push(`${$storedURL}`);
      }}
    >
      Give URL
    </p> -->
  </div>
  <div class="w-1/2 h-auto flex items-center justify-end p-2">
    {#each choices as e}
      <div class="h-full mx-4 bg-gray-800 w-0.5"></div>
      <button
        class="text-center w-24"
        on:click={() => {
          console.log(currentURL);
          storedURL.set(currentURL);
          push(e.id);
        }}>{e.display}</button
      >
    {/each}
  </div>
</main>
