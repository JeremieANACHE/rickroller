<template>
  <div class="--rickroller-character-list-wrapper">
    <div class="--rickroller-search-wrapper">
      <fade-transition>
        <div class="--rickroller-filters-holder">
          <alive-status-filter />
          <search-bar @search="searchCharacter($event)" />
          <gender-filter />
        </div>
      </fade-transition>
    </div>
    <transition-group
      name="rotate"
      tag="div"
      class="--rickroller-character-list-cards-wrapper"
    >
      <character-list-card
        v-for="character in charactersList"
        :key="character.id"
        :character="character"
      />
    </transition-group>
    <img
      src="@/assets/images/portal.png"
      alt="loading"
      class="loader"
      v-if="isLoadingCharacters"
    />
    <span class="--rickroller-character-list-end" />
  </div>
</template>

<script>
import CharacterListCard from "@/components/characters/CharacterListCard";
import SearchBar from "@/components/interface/SearchBar";
import AliveStatusFilter from "@/components/interface/filters/AliveStatusFilter";
import FadeTransition from "@/transitions/FadeTransition";
import { mapActions, mapGetters } from "vuex";
import { debounce } from "lodash";
import GenderFilter from "@/components/interface/filters/GenderFilter.vue";

export default {
  components: {
    CharacterListCard,
    SearchBar,
    FadeTransition,
    AliveStatusFilter,
    GenderFilter,
  },

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
    ...mapGetters("characters", {
      charactersList: "getCharacters",
      isLoadingCharacters: "getIsLoadingCharacters",
    }),
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
  padding: 0 0 4 * $mu 0;

  .--rickroller-search-wrapper {
    background-color: white;
    height: 144px;
    position: sticky;
    top: 0;
    z-index: 2;

    .--rickroller-filters-holder {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;

      .--rickroller-filter-list-wrapper {
        margin: 0 $mu;
      }
    }
  }

  .--rickroller-character-list-cards-wrapper {
    padding: 4 * $mu 0;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }

  .loader {
    animation: rotation 4s infinite linear;
  }
}

.rotate-enter {
  transform: perspective(3000px) rotate3d(0, 1, 0, 90deg);
}

.rotate-enter-active,
.rotate-leave-active {
  transition: 1s;
}

.rotate-leave-to {
  transform: perspective(3000px) rotate3d(0, 1, 0, -90deg);
}

.rotate-move {
  transition: transform 1s;
}
</style>
