import characters from "@/store/characters-store";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    characters,
  },
});
