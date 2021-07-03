import apiInfos from "@/store/character-api-helper";
import filters from "@/store/filters-store";

import {
  loadCharactersFromUrl,
  loadCharacterById,
} from "@/services/characters-service";

import {
  loadEpisodes,
  generateEpisodeIdList,
} from "@/services/episodes-service";

const initialState = {
  characters: [],
  selectedCharacter: {},
  selectedCharacterEpisodeList: [],
  isLoadingCharacters: false,
};

const state = () => ({ ...initialState });

const getters = {
  getCharacters: (state) => state.characters,
  getSelectedCharacter: (state) => state.selectedCharacter,
  getSelectedCharacterEpisodeList: (state) =>
    state.selectedCharacterEpisodeList,
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

  setSelectedCharacterEpisodeList: (state, selectedCharacterEpisodeList) => {
    Object.assign(state, { selectedCharacterEpisodeList });
  },

  setIsLoadingCharacters: (state, isLoadingCharacters) => {
    Object.assign(state, { isLoadingCharacters });
  },
};

const actions = {
  fetchCharacters: ({ commit, dispatch, rootGetters }) => {
    commit("setIsLoadingCharacters", true);
    const url = rootGetters["characters/filters/getFilteredSearchUrl"];
    return loadCharactersFromUrl(url)
      .then((result) => {
        const resultInfos = {
          totalCharacters: result.data.info.count,
          totalPages: result.data.info.pages,
          nextPageUrl: result.data.info.next,
          previousPageUrl: result.data.info.prev,
        };
        commit("setCharacters", result.data.results);
        dispatch("apiInfos/setInfos", resultInfos);
        return result;
      })
      .catch((error) => {
        commit("setCharacters", []);
        throw error;
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
        .catch((error) => {
          commit("setCharacters", []);
          throw error;
        })
        .finally(() => {
          commit("setIsLoadingCharacters", false);
        });
    }
  },

  fetchCharacterById: ({ commit, dispatch }, characterId) => {
    commit("setIsLoadingCharacters", true);

    return loadCharacterById(characterId)
      .then((character) => {
        dispatch("updateSelectedCharacter", character.data);
      })
      .catch((error) => {
        dispatch("updateSelectedCharacter", {});
        throw error;
      })
  },

  updateSelectedCharacter: ({ commit, dispatch }, character) => {
    dispatch("loadSelectedCharacterEpisodes", character);
    commit("setSelectedCharacter", character);
  },

  loadSelectedCharacterEpisodes: ({ commit }, character) => {
    commit("setIsLoadingCharacters", true);
    loadEpisodes(generateEpisodeIdList(character.episode))
      .then((episodeList) => {
        episodeList.data.length > 0
          ? commit("setSelectedCharacterEpisodeList", episodeList.data)
          : commit("setSelectedCharacterEpisodeList", [episodeList.data]);
      })
      .catch((error) => {
        commit("setSelectedCharacterEpisodeList", []);
        throw error;
      })
      .finally(() => {
        commit("setIsLoadingCharacters", false);
      });
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
