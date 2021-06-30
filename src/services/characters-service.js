import apiClient from "@/services/api-client";

export const loadCharacters = () =>
  apiClient
    .get("https://rickandmortyapi.com/api/character")
    .then((response) => {
      return response;
    });

export const loadCharactersFromUrl = (url) =>
  apiClient.get(url).then((response) => {
    return response;
  });
