<template>
  <div class="--rickroller-header-wrapper">
    <logo />
  </div>
</template>

<script>
import Logo from "@/components/interface/Logo";
export default {
  components: { Logo },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/color-mixins";

.--rickroller-header-wrapper {
  background-color: theme-color(secondary, 400);
  display: flex;
  justify-content: center;
}
</style>
