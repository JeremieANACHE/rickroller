<template>
  <icon :iconName="iconToDisplay" />
</template>

<script>
import GENDER_ENUM from "@/shared/enums/gender-enum";
import Icon from "@/components/interface/Icon";
import {
  mdiGenderFemale,
  mdiGenderMale,
  mdiOctagonOutline,
  mdiCrosshairsQuestion,
  mdiCircleOutline,
} from "@mdi/js";

export default {
  components: { Icon },

  props: {
    gender: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      GENDER_ENUM,
    };
  },

  computed: {
    iconToDisplay() {
      switch (this.gender) {
        case GENDER_ENUM.FEMALE:
          return mdiGenderFemale;

        case GENDER_ENUM.MALE:
          return mdiGenderMale;

        case GENDER_ENUM.GENDERLESS:
          return mdiOctagonOutline;

        case GENDER_ENUM.UNKNOWN:
          return mdiCrosshairsQuestion;

        default:
          return mdiCircleOutline;
      }
    },
  },
};
</script>
