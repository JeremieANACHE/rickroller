<template>
  <div class="--rickroller-filter-list-wrapper">
    <button
      class="--rickroller-filter-button"
      :class="isSelected(ALIVE_STATUS_ENUM.ALIVE) && 'selected'"
      @click="switchStatus(ALIVE_STATUS_ENUM.ALIVE)"
    >
      <icon :iconName="mdiHeartPulse" />
    </button>
    <button
      class="--rickroller-filter-button"
      :class="isSelected(ALIVE_STATUS_ENUM.DEAD) && 'selected'"
      @click="switchStatus(ALIVE_STATUS_ENUM.DEAD)"
    >
      <icon :iconName="mdiSkullScan" />
    </button>
    <button
      class="--rickroller-filter-button"
      :class="isSelected(ALIVE_STATUS_ENUM.UNKNOWN) && 'selected'"
      @click="switchStatus(ALIVE_STATUS_ENUM.UNKNOWN)"
    >
      <icon :iconName="mdiProgressQuestion" />
    </button>
    <button class="--rickroller-filter-button" @click="switchStatus(undefined)">
      <icon :iconName="mdiClose" />
    </button>
  </div>
</template>

<script>
import Icon from "@/components/interface/Icon.vue";
import ALIVE_STATUS_ENUM from "@/shared/enums/alive-status-enum";
import {
  mdiHeartPulse,
  mdiSkullScan,
  mdiProgressQuestion,
  mdiClose,
} from "@mdi/js";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { Icon },

  data() {
    return {
      mdiHeartPulse,
      mdiSkullScan,
      mdiProgressQuestion,
      mdiClose,
      ALIVE_STATUS_ENUM,
    };
  },

  computed: {
    ...mapGetters("characters/filters", {
      currentStatusFilter: "getStatusFilter",
    }),
  },

  methods: {
    ...mapActions("characters/filters", {
      updateStatusFilter: "updateStatusFilter",
    }),

    switchStatus(status) {
      this.isSelected(status)
        ? this.updateStatusFilter(undefined)
        : this.updateStatusFilter(status);
    },

    isSelected(status) {
      return this.currentStatusFilter === status;
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
