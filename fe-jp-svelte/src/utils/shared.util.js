import { writable } from "svelte/store";

export const storedURL = writable("/");
export const bucks = writable("Tell me what you see, is it money or it's me?");
export const name = writable("Guest");

export function stripURL(url) {
  return url.replace("#", "");
}
