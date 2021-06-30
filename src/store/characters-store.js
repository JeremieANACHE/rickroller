import apiInfos from "@/store/character-api-helper";
import {
  loadCharacters,
  loadCharactersFromUrl,
} from "@/services/characters-service";

const initialState = {
  characters: [],
  selectedCharacter: {},
};

const state = () => ({ ...initialState });

const getters = {
  getCharacters: (state) => state.characters,
  getSelectedCharacter: (state) => state.selectedCharacter,
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
};

const actions = {
  fetchCharacters: ({ commit }) => {
    return loadCharacters().then((result) => {
      const resultInfos = {
        totalCharacters: result.data.info.count,
        totalPages: result.data.info.pages,
        nextPageUrl: result.data.info.next,
        previousPageUrl: result.data.info.prev,
      };
      commit("setCharacters", result.data.results);
      commit("apiInfos/setInfos", resultInfos);
      return result;
    });
  },

  fetchMoreCharacters: ({ commit, rootGetters }) => {
    const nextPageUrl = rootGetters["characters/apiInfos/getNextPageUrl"];
    if (nextPageUrl) {
      return loadCharactersFromUrl(nextPageUrl).then((newCharacters) => {
        const resultInfos = {
          totalCharacters: newCharacters.data.info.count,
          totalPages: newCharacters.data.info.pages,
          nextPageUrl: newCharacters.data.info.next,
          previousPageUrl: newCharacters.data.info.prev,
        };
        commit("addCharacters", newCharacters.data.results);
        commit("apiInfos/setInfos", resultInfos);
      });
    }
  },
};

const modules = { apiInfos };

export default {
  state,
  getters,
  mutations,
  actions,
  modules,
  initialState,
  namespaced: true,
};
