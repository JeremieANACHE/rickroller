<template>
  <div class="--rickroller-character-list-wrapper">
    <div class="--rickroller-search-wrapper">
      <input type="text" /> <button>search</button>
    </div>
    <div class="--rickroller-character-list-cards-wrapper">
      <character-list-card />
    </div>
  </div>
</template>

<script>
import CharacterListCard from "@/components/characters/CharacterListCard";
export default {
  components: { CharacterListCard },
};
</script>

<style lang="scss" scoped>
.--rickroller-character-list-wrapper {
  padding: 64px 0;
}
</style>
