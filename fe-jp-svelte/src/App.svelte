<script>
  import "./app.css";
  import Router from "svelte-spa-router";
  import Home from "./routes/Home.svelte";
  import Land from "./routes/Land.svelte";
  import Dictionary from "./routes/Dictionary.svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import Login from "./routes/Login.svelte";
  import Register from "./routes/Register.svelte";
  import SetBrowser from "./routes/SetBrowser.svelte";
  import SetView from "./routes/SetView.svelte";
  import SetTrain from "./routes/SetTrain.svelte";
  import SetEdit from "./routes/SetEdit.svelte";
  import WordTrain from "./routes/WordTrain.svelte";
  import SetSort from "./routes/SetSort.svelte";
  import Navbar from "./routes/Navbar.svelte";

  const routes = {
    "/": Home,
    "/dictionary": Dictionary,
    "/word/train": WordTrain,
    "/login": Login,
    "/register": Register,
    "/set_browser": SetBrowser,
    "/set/view/:set": SetView,
    "/set/edit/:set": SetEdit,
    "/set/train/:set": SetTrain,
    "/set/sort": SetSort,
    "/land": Land,
  };

  const options = {
    duration: 1500,
  };
</script>

<main class="overflow-x-hidden w-screen h-screen bg-gray-700 flex flex-col">
  <Navbar />
  <SvelteToast {options} />
  <div class="flex-1 overflow-x-hidden"><Router {routes} /></div>
</main>
