<template>
  <router-link
    :to="'/detail/' + nextPokemonId"
    v-if="nextPokemonId"
    class="flex flex-col items-start top-1/2 right-6"
  >
    <span
      class="flex flex-row items-center justify-center gap-1 text-2xl font-bold"
    >
      {{ formatNextPokemonId }}
      <i class="material-icons">chevron_right</i>
    </span>
    <span class="text-sm font-semibold capitalize">
      {{ nextPokemonName }}
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
      nextPokemonName: {},
    };
  },
  computed: {
    nextPokemonId() {
      const currentId = parseInt(this.pokemon.id);
      return currentId < 161 ? currentId + 1 : null;
    },
    formatNextPokemonId() {
      return `#${String(this.pokemon.id + 1).padStart(3, "0")}`;
    },
  },
  async created() {
    await this.nextPokemon();
  },
  methods: {
    async nextPokemon() {
      try {
        const nextResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${this.nextPokemonId}`
        );
        const nextData = await nextResponse.json();
        this.nextPokemonName = nextData.name;
        console.log(nextData);
      } catch (err) {
        return null;
      }
    },
  },
  watch: {
    pokemonId: "nextPokemon",
  },
};
</script>
