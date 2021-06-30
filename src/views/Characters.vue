<template>
  <div class="--rickroller-character-list-wrapper">
    <div class="--rickroller-search-wrapper">
      <input type="text" /> <button>search</button>
    </div>
    <div class="--rickroller-character-list-cards-wrapper">
      <character-list-card
        v-for="character in charactersList"
        :key="character.id"
        :character="character"
      />
    </div>
    <span class="--rickroller-character-list-end" />
  </div>
</template>

<script>
import CharacterListCard from "@/components/characters/CharacterListCard";
import { mapActions, mapGetters } from "vuex";
import { debounce } from "lodash";

export default {
  components: { CharacterListCard },

  created() {
    this.fetchCharacters();
    this.debouncedFetch = debounce(
      () => {
        this.fetchMoreCharacters();
      },
      1000,
      { leading: true }
    );
  },

  mounted() {
    this.scroll();
  },

  computed: {
    ...mapGetters("characters", { charactersList: "getCharacters" }),
  },

  methods: {
    ...mapActions("characters", {
      fetchCharacters: "fetchCharacters",
      fetchMoreCharacters: "fetchMoreCharacters",
    }),

    scroll() {
      window.onscroll = () => {
        let listEnd = document.querySelector(
          ".--rickroller-character-list-end"
        );

        if (listEnd && this.isVisible(listEnd)) {
          this.debouncedFetch();
        }
      };
    },

    isVisible(el) {
      let rect = el.getBoundingClientRect();
      let elemTop = rect.top;
      let elemBottom = rect.bottom;

      let isVisible = elemTop < window.innerHeight && elemBottom >= 0;
      return isVisible;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables";

.--rickroller-character-list-wrapper {
  padding: 4 * $mu 0;

  .--rickroller-character-list-cards-wrapper {
    padding: 4 * $mu 0;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
}
</style>
