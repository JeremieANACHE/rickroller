import { generateQueryString } from "@/services/characters-service";

const initialState = {
  characterNameFilter: undefined,
  statusFilter: undefined,
  genderFilter: undefined,
};

const state = () => ({ ...initialState });

const getters = {
  getCharacterNameFilter: (state) => state.characterNameFilter,
  getStatusFilter: (state) => state.statusFilter,
  getGenderFilter: (state) => state.genderFilter,
  getFilteredSearchUrl: (state) => {
    const queryString = generateQueryString({
      name: state.characterNameFilter,
      status: state.statusFilter,
      gender: state.genderFilter,
    });
    return queryString.length > 0
      ? `${process.env.VUE_APP_API_CHARACTER_ENDPOINT}?${queryString}`
      : process.env.VUE_APP_API_CHARACTER_ENDPOINT;
  },
};

const mutations = {
  setCharacterNameFilter: (state, characterNameFilter) => {
    state.characterNameFilter = characterNameFilter;
  },

  setStatusFilter: (state, statusFilter) => {
    state.statusFilter = statusFilter;
  },

  setGenderFilter: (state, genderFilter) => {
    state.genderFilter = genderFilter;
  },
};

const actions = {
  updateCharacterNameFilter: ({ commit, dispatch }, characterNameFilter) => {
    commit("setCharacterNameFilter", characterNameFilter);
    dispatch("characters/fetchCharacters", null, { root: true });
  },
  updateStatusFilter: ({ commit }, statusFilter) => {
    commit("setStatusFilter", statusFilter);
  },
  updateGenderFilter: ({ commit }, genderFilter) => {
    commit("setGenderFilter", genderFilter);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  initialState,
  namespaced: true,
};
