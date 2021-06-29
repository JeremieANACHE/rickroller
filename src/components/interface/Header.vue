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
.--rickroller-header-wrapper {
  background-color: #52b69a;
  display: flex;
  justify-content: center;
}
</style>
