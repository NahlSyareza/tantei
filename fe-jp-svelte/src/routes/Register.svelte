<script>
  import { URL } from "../utils/url.util";
  import Navbar from "./Navbar.svelte";
  import { toast } from "@zerodevx/svelte-toast";
  import { storedURL, stripURL } from "../utils/shared.util";
  import { push } from "svelte-spa-router";

  let name, email, password;

  async function handleRegister() {
    const lastURL = stripURL(`${$storedURL}`);

    await URL.post("/user/register", {
      name,
      email,
      password,
    })
      .then((e) => {
        console.log(e.data);
        const r = e.data;
        if (r.success) {
          toast.push(r.msg, {
            onpop: () => {
              push("/login");
            },
          });
          // console.log(r.payload);
          // localStorage.setItem("user", JSON.stringify(r.payload));
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }
</script>

<main class="flex flex-col w-full h-full bg-gray-700 font-montserrat">
  <!-- <Navbar /> -->
  <div class="w-full h-full flex items-center justify-center">
    <div class="w-1/4 h-2/3 bg-sky-900 rounded-xl flex flex-col">
      <div class="w-full h-1/3 flex items-center justify-center">
        <p class="text-3xl text-white">Register</p>
      </div>
      <div class="w-full h-1/3 flex flex-col items-center text-white space-y-4">
        <div class="w-2/3">
          <p>Name</p>
          <input bind:value={name} type="text" class="text-black w-full" />
        </div>
        <div class="w-2/3">
          <p>Email</p>
          <input bind:value={email} type="text" class="text-black w-full" />
        </div>
        <div class="w-2/3">
          <p>Password</p>
          <input bind:value={password} type="text" class="text-black w-full" />
        </div>
      </div>
      <div class="w-full h-1/3 flex items-center justify-center">
        <button
          on:click={handleRegister}
          class="text-white w-auto h-auto bg-cyan-700 p-2 rounded-md"
          >REGISTER</button
        >
      </div>
    </div>
  </div>
</main>
