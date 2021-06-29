import apiClient from "@/services/api-client";

export const loadCharacters = () =>
  apiClient
    .get("https://rickandmortyapi.com/api/character")
    .then((response) => {
      console.log(response);
    });
