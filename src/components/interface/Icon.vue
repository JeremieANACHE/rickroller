<template>
  <svg-icon type="mdi" :path="iconName" />
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";

export default {
  components: { SvgIcon },

  props: {
    iconName: {
      type: String,
      required: true,
    },
  },
};
</script>
