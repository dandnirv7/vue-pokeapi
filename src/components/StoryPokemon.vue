<template>
  <div>
    <span v-for="story in storyPokemon" :key="story">
      {{ story.flavor_text }}
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      storyPokemon: [],
    };
  },
  async mounted() {
    await this.fetchPokemonSpecies();
  },
  methods: {
    async fetchPokemonSpecies() {
      const pokemonId = this.$route.params.id;
      try {
        const storyResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
        );
        const storyData = await storyResponse.json();
        this.storyPokemon = storyData.flavor_text_entries.filter((entry) => {
          return (
            entry.language.name === "en" &&
            (entry.version.name === "leafgreen" ||
              entry.version.name === "firered")
          );
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  watch: {
    "$route.params.id": "fetchPokemonSpecies",
  },
};
</script>
