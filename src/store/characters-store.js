import apiInfos from "@/store/character-api-helper";
import { loadCharacters } from "@/services/characters-service";

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

  setSelectedCharacter: (state, selectedCharacter) => {
    Object.assign(state, { selectedCharacter });
  },
};

const actions = {
  fetchCharacters: ({ commit }) => {
    return loadCharacters().then((result) => {
      commit("setCharacters", result.data.results);
      commit("setInfos", result.data.info);
      return result;
    });
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
