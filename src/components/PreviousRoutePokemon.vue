<template>
  <router-link
    :to="'/detail/' + previousPokemonId"
    v-if="previousPokemonId"
    class="flex flex-col items-end top-1/2 right-6"
  >
    <span
      class="flex flex-row items-center justify-center gap-1 text-2xl font-bold"
    >
      <i class="material-icons">chevron_left</i>
      {{ formatPreviousPokemonId }}
    </span>
    <span class="text-sm capitalize">
      {{ previousPokemonName }}
    </span>
  </router-link>
</template>

<script>
export default {
  props: {
    pokemon: Object,
    pokemonId: String,
  },
  data() {
    return {
      previousPokemonName: {},
    };
  },
  computed: {
    previousPokemonId() {
      const currentId = parseInt(this.pokemon.id);
      return currentId > 1 ? currentId - 1 : null;
    },
    formatPreviousPokemonId() {
      return `#${String(this.pokemon.id - 1).padStart(3, "0")}`;
    },
  },
  methods: {
    async previousPokemon() {
      try {
        if (this.pokemon.id > 1) {
          const previousResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${this.previousPokemonId}`
          );
          const previousData = await previousResponse.json();
          this.previousPokemonName = previousData.name;
          console.log(previousData);
        }
      } catch (err) {
        return null;
      }
    },
  },
  async created() {
    await this.previousPokemon();
  },
  watch: {
    pokemonId: "previousPokemon",
  },
};
</script>
