<template>
  <icon :iconName="iconToDisplay" />
</template>

<script>
import ALIVE_STATUS_ENUM from "@/shared/enums/alive-status-enum";
import Icon from "@/components/interface/Icon";
import {
  mdiHeartPulse,
  mdiSkullScan,
  mdiProgressQuestion,
  mdiAccountQuestion,
} from "@mdi/js";

export default {
  components: { Icon },

  props: {
    status: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      ALIVE_STATUS_ENUM,
    };
  },

  computed: {
    iconToDisplay() {
      switch (this.status) {
        case ALIVE_STATUS_ENUM.ALIVE:
          return mdiHeartPulse;

        case ALIVE_STATUS_ENUM.DEAD:
          return mdiSkullScan;

        case ALIVE_STATUS_ENUM.UNKNOWN:
          return mdiProgressQuestion;

        default:
          return mdiAccountQuestion;
      }
    },
  },
};
</script>
