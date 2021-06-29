const initialState = {
  totalCharacters: 0,
  totalPages: 0,
  nextPageUrl: null,
  previousPageUrl: null,
};

const state = () => ({ ...initialState });

const getters = {
  getInfos: (state) => state,
  getTotalCharacters: (state) => state.totalCharacters,
  getTotalPages: (state) => state.totalPages,
  getNextPageUrl: (state) => state.nextPageUrl,
  getPreviousPageUrl: (state) => state.previousPageUrl,
};

const mutations = {
  setInfos: (state, infos) => {
    Object.assign(state, infos);
  },
  setNextPageUrl: (state, nextPageUrl) => {
    Object.assign(state, { nextPageUrl });
  },
  setPreviousPageUrl: (state, previousPageUrl) => {
    Object.assign(state, { previousPageUrl });
  },
};

const actions = {
  setInfos: ({ commit }, newInfos) => {
    commit("setInfos", newInfos);
  },
  setNextPageUrl: ({ commit }, nextPageUrl) => {
    commit("setNextPageUrl", nextPageUrl);
  },
  setPreviousPageUrl: ({ commit }, previousPageUrl) => {
    commit("setPreviousPageUrl", previousPageUrl);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  initialState,
};
