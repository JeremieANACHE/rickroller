<template>
  <div class="--rickroller-filter-list-wrapper">
    <button
      class="--rickroller-filter-button"
      :class="isSelected(GENDER_ENUM.FEMALE) && 'selected'"
      @click="switchGender(GENDER_ENUM.FEMALE)"
    >
      <icon :iconName="mdiGenderFemale" />
    </button>
    <button
      class="--rickroller-filter-button"
      :class="isSelected(GENDER_ENUM.MALE) && 'selected'"
      @click="switchGender(GENDER_ENUM.MALE)"
    >
      <icon :iconName="mdiGenderMale" />
    </button>
    <button
      class="--rickroller-filter-button"
      :class="isSelected(GENDER_ENUM.GENDERLESS) && 'selected'"
      @click="switchGender(GENDER_ENUM.GENDERLESS)"
    >
      <icon :iconName="mdiOctagonOutline" />
    </button>
    <button
      class="--rickroller-filter-button"
      :class="isSelected(GENDER_ENUM.UNKNOWN) && 'selected'"
      @click="switchGender(GENDER_ENUM.UNKNOWN)"
    >
      <icon :iconName="mdiCrosshairsQuestion" />
    </button>
    <button class="--rickroller-filter-button" @click="switchGender(undefined)">
      <icon :iconName="mdiClose" />
    </button>
  </div>
</template>

<script>
import Icon from "@/components/interface/Icon.vue";
import GENDER_ENUM from "@/shared/enums/gender-enum";
import {
  mdiGenderFemale,
  mdiGenderMale,
  mdiOctagonOutline,
  mdiCrosshairsQuestion,
  mdiClose,
} from "@mdi/js";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { Icon },

  data() {
    return {
      mdiGenderFemale,
      mdiGenderMale,
      mdiOctagonOutline,
      mdiCrosshairsQuestion,
      mdiClose,
      GENDER_ENUM,
    };
  },

  computed: {
    ...mapGetters("characters/filters", {
      currentGenderFilter: "getGenderFilter",
    }),
  },

  methods: {
    ...mapActions("characters/filters", {
      updateGenderFilter: "updateGenderFilter",
    }),

    switchGender(gender) {
      this.isSelected(gender)
        ? this.updateGenderFilter(undefined)
        : this.updateGenderFilter(gender);
    },

    isSelected(gender) {
      return this.currentGenderFilter === gender;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/styles/color-mixins";
@import "~@/assets/styles/variables";

.--rickroller-filter-list-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;

  .--rickroller-filter-button {
    border-radius: 100%;
    width: 2.5 * $mu;
    height: 2.5 * $mu;
    border: none;
    background-color: white;
    color: theme-color(primary);
    border: 1px solid theme-color(primary);
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &.selected {
      background-color: theme-color(primary);
      color: white;
    }
  }

  .--rickroller-filter-button:hover {
    background-color: theme-color(primary, 50);

    &.selected {
      background-color: theme-color(secondary);
    }
  }
}
</style>
