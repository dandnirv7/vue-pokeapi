<template>
  <div class="flex flex-row flex-wrap justify-center gap-4">
    <div v-for="(evolution, index) in evolutions" :key="index">
      <router-link :to="'/detail/' + getPokemonId(evolution.species.url)">
        <div class="flex justify-center w-24 mx-auto h-20 mb-1">
          <img
            :src="getSpriteUrl(evolution.species.url)"
            :alt="evolution.species.name"
            class="object-fit"
          />
        </div>
        <div class="flex flex-row gap-x-1">
          <span class="font-semibold capitalize">
            {{ evolution.species.name }}
          </span>
          <span class="font-semibold text-gray-100/50">
            #{{ String(getPokemonId(evolution.species.url)).padStart(3, "0") }}
          </span>
        </div>
        <!-- <div class="flex items-center justify-center gap-2 mt-2">
        <div
          v-for="(item, index) in pokemonTypes"
          :key="index"
          class="rounded-lg bg-white/50 w-max"
        >
          <span class="px-2 font-semibold text-start">
            {{ item.type.name }}
          </span>
        </div>
      </div> -->
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pokemon: Object,
    pokemonTypes: Object,
  },
  data() {
    return {
      evolutions: {},
    };
  },

  methods: {
    async fetchEvolutions() {
      const pokemonId = this.$route.params.id;
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`
        );
        const responseData = await response.json();
        const chainResponse = await fetch(responseData.evolution_chain.url);
        const chainData = await chainResponse.json();
        this.evolutions = this.flattenEvolutionChain(chainData.chain);
      } catch (error) {
        console.error(error);
      }
    },
    flattenEvolutionChain(chain) {
      const evolutions = [];

      const addEvolutions = (details) => {
        evolutions.push({
          species: details.species,
        });
        if (details.evolves_to.length > 0) {
          details.evolves_to.forEach((evolution) => addEvolutions(evolution));
        }
      };

      addEvolutions(chain);

      return evolutions;
    },
    getSpriteUrl(url) {
      const id = url.split("/").slice(-2, -1)[0];
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
    },
    getPokemonId(url) {
      return url.split("/").slice(-2, -1)[0];
    },
  },
  created() {
    this.fetchEvolutions();
  },
  watch: {
    "$route.params.id": "fetchEvolutions",
  },
};
</script>
