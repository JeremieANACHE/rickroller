<template>
  <div class="--rickroller-character-card">
    <div class="--rickroller-character-image-wrapper">
      <div
        class="--rickroller-character-image"
        :style="`background-image: url(${character.image})`"
      >
        <h1 class="--rickroller-character-name-title">{{ character.name }}</h1>
        <div class="--rickroller-character-info-preview-icons">
          <alive-status-icon :status="character.status" />
          <gender-icon :gender="character.gender" />
        </div>
      </div>
    </div>
    <div class="--rickroller-character-info-panel">
      <h3>{{ character.name }}</h3>
      <div class="--rickroller-character-details-list">
        <p class="--rickroller-character-detail">
          <alive-status-icon :status="character.status" />
          {{ character.status }}
        </p>

        <p class="--rickroller-character-detail">
          <gender-icon :gender="character.gender" />
          {{ character.gender }}
        </p>

        <p class="--rickroller-character-detail">
          <icon :iconName="mdiFaceRecognition" />
          {{ character.species }}
          {{ character.type ? `- ${character.type}` : "" }}
        </p>

        <p class="--rickroller-character-detail">
          <icon :iconName="mdiEarth" />
          Origin : {{ character.origin.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import AliveStatusIcon from "@/components/characters/AliveStatusIcon";
import GenderIcon from "@/components/characters/GenderIcon";
import Icon from "@/components/interface/Icon";
import { mdiFaceRecognition, mdiEarth } from "@mdi/js";
export default {
  components: { AliveStatusIcon, GenderIcon, Icon },

  data() {
    return {
      mdiFaceRecognition,
      mdiEarth,
    };
  },

  props: {
    character: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/color-mixins";
@import "~@/assets/styles/variables";

.--rickroller-character-card {
  margin: 2 * $mu $mu;
  width: 300px;
  height: 300px;
  border-radius: $mu;

  transform: translate(0, 0);
  background: #000;

  .--rickroller-character-image-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: $mu;

    .--rickroller-character-image {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      width: 300px;
      height: 300px;
      background-size: 300px 300px;
      background-repeat: no-repeat;
      transition: 0.5s;
      color: #fff;
      font-weight: 500;
      -webkit-text-stroke: 1.25px #000;

      .--rickroller-character-name-title {
        margin: 0 auto;
        align-self: baseline;
      }

      .--rickroller-character-info-preview-icons {
        background-color: theme-color(primary);
        transform: rotate(45deg);
        left: -8 * $mu;
        float: left;
        position: relative;
        bottom: 0.5 * $mu;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .--rickroller-character-info-panel {
    padding: 0 0.5 * $mu;
    position: absolute;
    top: 0;
    left: 0;
    width: 70%;
    height: 100%;
    background: #52b69a;
    border-top-left-radius: $mu;
    border-bottom-left-radius: $mu;
    transition: 0.5s;
    transform-origin: left;
    transform: perspective(2000px) rotateY(-90deg);

    .--rickroller-character-details-list {
      height: calc(100% - 128px);
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .--rickroller-character-detail {
        margin: 0;
        text-align: left;
        display: grid;
        grid-template-columns: 1.5 * $mu auto;
        grid-column-gap: 0.5 * $mu;
        align-items: center;
      }
    }
  }
}

.--rickroller-character-card:hover {
  .--rickroller-character-image-wrapper {
    .--rickroller-character-image {
      opacity: 0.5;
      transform: translateX(30%);
    }
  }

  .--rickroller-character-info-panel {
    transform: perspective(2000px) rotateY(0deg);
  }
}
</style>
