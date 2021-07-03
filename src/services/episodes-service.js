import apiClient from "@/services/api-client";

export const loadEpisodes = (episodesList) =>
  apiClient
    .get(`${process.env.VUE_APP_API_EPISODE_ENDPOINT}/${episodesList}`)
    .then((response) => {
      return response;
    });

export const generateEpisodeIdList = (episodeUrls) => {
  let result = "";
  for (const value in episodeUrls) {
    result += `${extractEpisodeNumberFromUrl(episodeUrls[value])},`;
  }
  return result.slice(0, result.length - 1);
};

function extractEpisodeNumberFromUrl(url) {
  return url.slice(40, url.length);
}
