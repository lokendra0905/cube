import { create } from "apisauce";

export const URIS = {
  GET_CUSTOMERS: "/posts",
  GET_PHOTOS: "/photos/random",
};

let apiClient = create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  headers: {
    Accept: "application/json",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
  },
  timeout: 6000,
});

let imageClient = create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Accept: "application/json",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
  },
  timeout: 6000,
});

export { apiClient, imageClient };
