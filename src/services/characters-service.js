/* eslint-disable no-prototype-builtins */
import apiClient from "@/services/api-client";

export const loadCharactersFromUrl = (url) =>
  apiClient.get(url).then((response) => {
    return response;
  });

export const loadCharacterById = (id) =>
  apiClient
    .get(`${process.env.VUE_APP_API_CHARACTER_ENDPOINT}/${id}`)
    .then((response) => {
      return response;
    });

export const generateQueryString = (filters) => {
  var query = [];
  for (var value in filters)
    if (filters.hasOwnProperty(value) && filters[value] !== undefined) {
      query.push(
        encodeURIComponent(value) + "=" + encodeURIComponent(filters[value])
      );
    }
  return query.join("&");
};
