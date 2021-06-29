<template>
  <div class="dark">
    <div class="container">
      <div class="container-background"></div>

      <div class="mask-container">
        <img src="@/assets/logo.png" class="logo" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #52b69a;
  overflow: hidden;
  max-width: 300px;
  height: 64px;

  &-background {
    position: absolute;
    z-index: -1;
    top: -115px;
    left: 0;
    width: 300px;
    height: 300px;
    background: linear-gradient(180deg, #0048ff, #bdf52f);
    background-image: url("../../assets/portal.png");
    background-size: 100% 100%;
    background-position-x: center;
    background-position-y: center;
    animation: rotation 3s infinite linear;
    will-change: transform;
  }
}

.mask-container {
  position: relative;
  display: block;
  max-width: 300px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 5000%;
    height: 300%;
    left: 0;
    background-color: #52b69a;
  }

  &::before {
    top: -295%;
  }

  &::after {
    bottom: -295%;
  }
}

img {
  width: 100%;
  height: auto;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

.dark {
  background-color: #52b69a;
}

.logo {
  margin: auto;
  max-width: 300px;
}
</style>
