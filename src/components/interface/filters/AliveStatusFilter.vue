<template>
  <div>
    <button>
      <icon :iconName="mdiHeartPulse" />
    </button>
    <button>
      <icon :iconName="mdiSkullScan" />
    </button>
    <button>
      <icon :iconName="mdiProgressQuestion" />
    </button>
  </div>
</template>

<script>
import Icon from "@/components/interface/Icon.vue";
import { mdiHeartPulse, mdiSkullScan, mdiProgressQuestion } from "@mdi/js";

export default {
  components: { Icon },

  data() {
    return {
      mdiHeartPulse,
      mdiSkullScan,
      mdiProgressQuestion,
    };
  },
};
</script>
