import apiClient from "@/services/api-client";

export const loadCharactersFromUrl = (url) =>
  apiClient.get(url).then((response) => {
    return response;
  });

export const generateQueryString = (filters) => {
  let result = [];
  for (var value in filters) {
    if (filters[value]) {
      result.push(
        encodeURIComponent(value) + "=" + encodeURIComponent(filters[value])
      );
    }
    return result.join("&");
  }
};
