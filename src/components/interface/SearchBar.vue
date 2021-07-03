<template>
  <div class="--rickroller-searchbar-wrapper">
    <input
      type="text"
      placeholder="Let's get schwifty"
      class="--rickroller-searchbar-input"
      v-model="keyword"
      @keyup.enter="search"
    />
    <div class="--rickroller-search-button">
      <fade-transition>
        <img
          v-if="keyword.length > 0"
          src="@/assets/images/portal-gun-on.svg"
          alt="launch search"
          class="--rickroller-search-button-image"
          @click="search"
        />
        <img
          v-else
          src="@/assets/images/portal-gun.svg"
          alt="launch search"
          class="--rickroller-search-button-image"
          @click="search"
        />
      </fade-transition>
    </div>
  </div>
</template>

<script>
import FadeTransition from "@/assets/transitions/FadeTransition";
import { mapActions } from "vuex";

export default {
  components: { FadeTransition },

  data() {
    return {
      keyword: "",
    };
  },

  methods: {
    ...mapActions("characters/filters", {
      updateCharacterNameFilter: "updateCharacterNameFilter",
    }),

    search() {
      this.updateCharacterNameFilter(this.keyword);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables";
@import "~@/assets/styles/color-mixins";

.--rickroller-searchbar-wrapper {
  height: 100%;
  height: 3 * $mu;
  width: fit-content;
  padding: $mu;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background-color: white;
  box-shadow: 5px 5px 15px 5px theme-color(secondary, 200),
    10px -5px 10px 5px theme-color(primary, 100),
    -10px -5px 10px 5px theme-color(primary, 100),
    5px 10px 15px 5px theme-color(secondary, 50),
    -10px 10px 15px 7px theme-color(secondary, 100),
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  * {
    outline: none;
  }

  .--rickroller-searchbar-input {
    border: none;
    border-bottom: 1px solid lightgrey;
    font-size: 34px;
  }

  .--rickroller-search-button {
    cursor: pointer;
    margin-left: $mu;

    .--rickroller-search-button-image {
      height: 3 * $mu;
      width: auto;
    }
  }
}
</style>
