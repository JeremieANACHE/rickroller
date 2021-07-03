<template>
  <div class="--rickroller-character-list-wrapper">
    <div class="--rickroller-search-wrapper">
      <fade-transition>
        <div class="--rickroller-filters-holder">
          <div>
            <alive-status-filter />
            <gender-filter />
          </div>
          <search-bar />
        </div>
      </fade-transition>
    </div>
    <transition-group
      name="fade"
      tag="div"
      class="--rickroller-character-list-cards-wrapper"
    >
      <character-list-card
        v-for="character in charactersList"
        :key="character.id"
        :character="character"
      />
    </transition-group>
    <loader v-if="isLoadingCharacters" />
    <span class="--rickroller-character-list-end" />
  </div>
</template>

<script>
import CharacterListCard from "@/components/characters/CharacterListCard";
import SearchBar from "@/components/interface/SearchBar";
import Loader from "@/components/interface/Loader";
import AliveStatusFilter from "@/components/interface/filters/AliveStatusFilter";
import FadeTransition from "@/assets/transitions/FadeTransition";
import { mapActions, mapGetters } from "vuex";
import { debounce } from "lodash";
import GenderFilter from "@/components/interface/filters/GenderFilter.vue";

export default {
  components: {
    CharacterListCard,
    SearchBar,
    Loader,
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
    this.updateCharacterNameFilter(undefined);
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

    ...mapActions("characters/filters", {
      updateCharacterNameFilter: "updateCharacterNameFilter",
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
    box-shadow: 0px 20px 20px 0px white;

    .--rickroller-filters-holder {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-evenly;
      height: 100%;

      .--rickroller-filter-list-wrapper {
        margin: $mu;
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

  .--rickroller-loader {
    animation: rotation 2s infinite linear;
    height: 300px;
    width: 300px;
    margin: auto;
  }
}
.fade-enter-active,
.fade-leave-active,
.fade-move {
  transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.fade-enter {
  opacity: 0;
  transform: translateX(50px) scaleY(0.5);
}

.fade-enter-to {
  opacity: 1;
  transform: translateX(0) scaleY(1);
}

.fade-leave-active {
  position: absolute;
}

.fade-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center top;
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
