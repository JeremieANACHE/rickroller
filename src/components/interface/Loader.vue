<template>
  <img
    src="@/assets/images/portal.png"
    alt="loading"
    class="--rickroller-loader"
  />
</template>

<style lang="scss" scoped>
@import "~@/assets/styles/variables";

.--rickroller-loader {
  animation: rotation 2s infinite linear;
  height: 663px;
  width: 663px;
  margin: auto;
}
</style>
