import apiInfos from "@/store/character-api-helper";
import filters from "@/store/filters-store";

import { loadCharactersFromUrl } from "@/services/characters-service";

const initialState = {
  characters: [],
  selectedCharacter: {},
  isLoadingCharacters: false,
};

const state = () => ({ ...initialState });

const getters = {
  getCharacters: (state) => state.characters,
  getSelectedCharacter: (state) => state.selectedCharacter,
  getIsLoadingCharacters: (state) => state.isLoadingCharacters,
};

const mutations = {
  setCharacters: (state, characters) => {
    Object.assign(state, { characters });
  },

  addCharacters: (state, charactersToAdd) => {
    state.characters = state.characters.concat(charactersToAdd);
  },

  setSelectedCharacter: (state, selectedCharacter) => {
    Object.assign(state, { selectedCharacter });
  },

  setIsLoadingCharacters: (state, isLoading) => {
    state.isLoadingCharacters = isLoading;
  },
};

const actions = {
  fetchCharacters: ({ commit, rootGetters }) => {
    commit("setIsLoadingCharacters", true);
    const url = rootGetters["characters/filters/getFilteredSearchUrl"];
    console.log("fetching");
    return loadCharactersFromUrl(url)
      .then((result) => {
        const resultInfos = {
          totalCharacters: result.data.info.count,
          totalPages: result.data.info.pages,
          nextPageUrl: result.data.info.next,
          previousPageUrl: result.data.info.prev,
        };
        commit("setCharacters", result.data.results);
        commit("apiInfos/setInfos", resultInfos);
        return result;
      })
      .finally(() => {
        commit("setIsLoadingCharacters", false);
      });
  },

  fetchMoreCharacters: ({ commit, rootGetters }) => {
    const nextPageUrl = rootGetters["characters/apiInfos/getNextPageUrl"];
    if (nextPageUrl) {
      commit("setIsLoadingCharacters", true);
      return loadCharactersFromUrl(nextPageUrl)
        .then((newCharacters) => {
          const resultInfos = {
            totalCharacters: newCharacters.data.info.count,
            totalPages: newCharacters.data.info.pages,
            nextPageUrl: newCharacters.data.info.next,
            previousPageUrl: newCharacters.data.info.prev,
          };
          commit("addCharacters", newCharacters.data.results);
          commit("apiInfos/setInfos", resultInfos);
        })
        .finally(() => {
          commit("setIsLoadingCharacters", false);
        });
    }
  },
};

const modules = { apiInfos, filters };

export default {
  state,
  getters,
  mutations,
  actions,
  modules,
  initialState,
  namespaced: true,
};
