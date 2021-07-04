<template>
  <div class="--rickroller-character-details-wrapper">
    <button class="--rickroller-back-to-home-button" @click="goToHome">
      <span><icon :iconName="mdiLessThan" />Back to character list</span>
    </button>
    <fade-transition>
      <div v-if="!isLoadingCharacters" class="--rickroller-character-details">
        <div class="--rickroller-character-details-profile">
          <h1 class="--rickroller-character-details-profile-title-name">
            {{ selectedCharacter.name }}
          </h1>

          <div class="--rickroller-profile-info-holder">
            <div
              class="--rickroller-profile-picture-wrapper"
              :style="`background-image: url(${selectedCharacter.image})`"
            >
              <div class="filler" />
            </div>

            <div class="--rickroller-character-details-infos">
              <p class="--rickroller-character-details-single-info-line">
                <b class="--rickroller-character-info-label">Gender:</b>
                <gender-icon :gender="selectedCharacter.gender" />
                {{ selectedCharacter.gender }}
              </p>

              <p class="--rickroller-character-details-single-info-line">
                <b class="--rickroller-character-info-label">Status:</b>
                <alive-status-icon :status="selectedCharacter.status" />
                {{ selectedCharacter.status }}
              </p>

              <p class="--rickroller-character-details-single-info-line">
                <b class="--rickroller-character-info-label">Location:</b>
                {{ selectedCharacter.location.name }}
              </p>

              <p class="--rickroller-character-details-single-info-line">
                <b class="--rickroller-character-info-label">Origin:</b>
                {{ selectedCharacter.origin.name }}
              </p>

              <p class="--rickroller-character-details-single-info-line">
                <b class="--rickroller-character-info-label">Species:</b>
                {{ selectedCharacter.species }}
                {{
                  selectedCharacter.type ? `- ${selectedCharacter.type}` : ""
                }}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2
            class="--rickroller-episode-list-title"
            v-if="episodeList.length > 0"
          >
            Can be seen in {{ episodeList.length }} episode(s) :
          </h2>
          <h2 class="--rickroller-episode-list-title" v-else>
            Can be seen in no episodes... :(
          </h2>
          <ul>
            <li v-for="episode in episodeList" :key="episode.id">
              <b>{{ episode.episode }}</b> - {{ episode.name }}
            </li>
          </ul>
        </div>
      </div>
      <loader v-else />
    </fade-transition>
  </div>
</template>

<script>
import Loader from "@/components/interface/Loader";
import Icon from "@/components/interface/Icon";
import FadeTransition from "@/assets/transitions/FadeTransition";
import GenderIcon from "@/components/characters/GenderIcon";
import AliveStatusIcon from "@/components/characters/AliveStatusIcon";

import { mdiLessThan } from "@mdi/js";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { Loader, FadeTransition, GenderIcon, AliveStatusIcon, Icon },

  data() {
    return { mdiLessThan };
  },

  created() {
    if (!this.routeParamIsSelectedCharacter) {
      this.fetchCharacterById(this.$route.params.id);
    }
  },

  computed: {
    ...mapGetters("characters", {
      selectedCharacter: "getSelectedCharacter",
      isLoadingCharacters: "getIsLoadingCharacters",
      episodeList: "getSelectedCharacterEpisodeList",
    }),

    routeParamIsSelectedCharacter() {
      return parseInt(this.$route.params.id, 10) === this.selectedCharacter.id;
    },
  },

  methods: {
    ...mapActions("characters", {
      fetchCharacterById: "fetchCharacterById",
    }),

    goToHome() {
      this.$router.push({ name: "Characters" });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/styles/variables";
@import "~@/assets/styles/color-mixins";

.--rickroller-character-details-wrapper {
  display: flex;
  flex-direction: column;

  .--rickroller-back-to-home-button {
    align-self: flex-start;
    cursor: pointer;
    background-color: transparent;
    border: none;
    margin: $mu 0 0 2 * $mu;
    color: theme-color(primary);
    span {
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
    }

    :hover {
      color: theme-color(primary, 100);
    }
  }

  .--rickroller-character-details {
    .--rickroller-character-details-profile {
      font-family: Marker Felt, Avenir, Helvetica, Arial, sans-serif;
      display: flex;
      flex-direction: column;

      .--rickroller-character-details-profile-title-name {
        margin-top: 0;
      }

      .--rickroller-profile-info-holder {
        display: flex;
        justify-content: space-evenly;
      }
      .--rickroller-profile-picture-wrapper {
        margin: auto;
        border: solid black;
        border-width: 3px 3px 5px 5px;
        border-radius: 4% 95% 6% 95%/95% 4% 92% 5%;
        transform: rotate(-2deg);

        .filler {
          width: 300px;
          height: 300px;
        }
      }

      .--rickroller-character-details-infos {
        text-align: left;
        margin: auto;
        width: fit-content;

        .--rickroller-character-details-single-info-line {
          .--rickroller-character-info-label {
            margin-right: 0.5 * $mu;
          }
        }
      }
    }

    .--rickroller-episode-list-title {
      color: theme-color(primary);
    }
  }
}
ul {
  columns: 3;
  padding: 0 2 * $mu;

  li {
    text-align: left;
    margin: 0.5 * $mu $mu;
    display: inline-block;
    border: 1px solid theme-color(secondary);
    padding: 0.5 * $mu;
    border-radius: 0.5 * $mu;
    width: 80%;
  }
}
@media only screen and (max-width: 768px) {
  ul {
    columns: 2;
  }

  .--rickroller-profile-info-holder {
    flex-direction: column;
  }
}

@media only screen and (max-width: 480px) {
  ul {
    columns: 1;
  }
}
</style>
