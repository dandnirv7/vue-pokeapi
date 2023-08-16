<script>
import "material-icons/iconfont/material-icons.css";
import "material-symbols/outlined.css";
import StatsPokemon from "../components/StatsPokemon.vue";
import StoryPokemon from "../components/StoryPokemon.vue";
import PokemonEvolutions from "../components/PokemonEvolutions.vue";
import GenderPokemon from "../components/GenderPokemon.vue";
import WeaknessPokemon from "../components/WeaknessPokemon.vue";
import InfoPokemon from "../components/InfoPokemon.vue";
import PreviousRoutePokemon from "../components/PreviousRoutePokemon.vue";
import NextRoutePokemon from "../components/NextRoutePokemon.vue";

export default {
  components: {
    StatsPokemon,
    StoryPokemon,
    PokemonEvolutions,
    GenderPokemon,
    WeaknessPokemon,
    InfoPokemon,
    PreviousRoutePokemon,
    NextRoutePokemon,
  },
  data() {
    return {
      pokemon: {},
      previousPokemonName: {},
      errorMessage: null,
      category: null,
      heightTitle: "Height",
      categoryTitle: "Category",
      genderTitle: "Gender",
      weightTitle: "Weight",
      abilitiesTitle: "Abilities",
    };
  },
  computed: {
    formatCurrentPokemonId() {
      return `#${String(this.pokemon.id).padStart(3, "0")}`;
    },
    formatHeight() {
      const height = this.pokemon.height;
      if (height >= 10) {
        return `${Math.floor(height / 10)}.${height % 10}`;
      } else {
        return `0.${height}`;
      }
    },
    formatCategory() {
      return this.category ? this.category.replace(" Pokémon", "") : "Unknown";
    },
    formatWeight() {
      const weight = this.pokemon.weight;
      if (weight % 10 === 0) {
        return weight / 10;
      } else if (weight >= 10) {
        return `${Math.floor(weight / 10)}.${weight % 10}`;
      } else {
        return `0.${weight}`;
      }
    },
  },
  async created() {
    await this.fetchPokemon();
  },
  methods: {
    async fetchPokemon() {
      const pokemonId = this.$route.params.id;
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        const data = await response.json();
        this.pokemon = data;

        const speciesResponse = await fetch(this.pokemon.species.url);
        const speciesData = await speciesResponse.json();

        const categoryInfo = speciesData.genera.find(
          (genus) => genus.language.name === "en"
        );
        this.category = categoryInfo ? categoryInfo.genus : "Unknown";
      } catch (err) {
        console.log(err);
        this.errorMessage = err;
      }
    },
    getBackgroundColor(typeName) {
      const typeColors = {
        normal: "bg-gray-500",
        fire: "bg-red-500",
        water: "bg-blue-500",
        electric: "bg-yellow-400",
        grass: "bg-green-400",
        ice: "bg-blue-300",
        fighting: "bg-red-700",
        poison: "bg-purple-600",
        ground: "bg-yellow-700",
        flying: "bg-indigo-400",
        psychic: "bg-pink-400",
        bug: "bg-green-600",
        rock: "bg-gray-600",
        ghost: "bg-purple-700",
        dragon: "bg-indigo-700",
        dark: "bg-gray-800",
        steel: "bg-gray-400",
        fairy: "bg-pink-300",
      };
      return typeColors[typeName] || "bg-white/50";
    },
  },
  watch: {
    "$route.params.id": "fetchPokemon",
  },
};
</script>
<template>
  <div
    class="w-screen h-screen font-sans text-white"
    :class="getBackgroundColor(pokemon.types[0].type.name)"
  >
    <div class="absolute top-2 left-4">
      <router-link to="/">
        <span class="flex items-center gap-x-2">
          <i class="text-orange-400 material-icons">arrow_back</i>
          Pokedex
        </span>
      </router-link>
    </div>
    <div class="flex flex-row items-center justify-between gap-5 px-5">
      <div class="relative">
        <PreviousRoutePokemon :pokemon="pokemon" :pokemonId="pokemon.id" />
      </div>

      <div class="flex items-center justify-center pt-8">
        <div class="flex flex-row min-h-[680px] justify-around">
          <div class="flex flex-col px-10">
            <div class="flex flex-col items-start gap-y-2">
              <div class="flex flex-row items-center justify-center gap-4">
                <h1 class="text-4xl font-bold capitalize">
                  {{ pokemon.name }}
                </h1>
                <span class="text-2xl font-semibold text-white/50">
                  {{ formatCurrentPokemonId }}
                </span>
              </div>
              <div class="flex mt-2 gap-x-2">
                <div v-for="item in pokemon.types" :key="item">
                  <span
                    class="px-2 py-1 font-semibold capitalize border border-white border-solid rounded-lg text-start w-max"
                    :class="getBackgroundColor(item.type.name)"
                  >
                    {{ item.type.name }}
                  </span>
                </div>
              </div>
            </div>
            <div class="flex flex-col items-center my-2 w-96">
              <div class="flex items-center w-64 h-64 my-12">
                <img
                  :src="pokemon.sprites.other.dream_world.front_default"
                  :alt="pokemon.name"
                  class="w-full h-full object-fit"
                />
              </div>
            </div>
            <div class="flex flex-col flex-wrap items-start gap-4 w-[580px]">
              <h2 class="font-bold capitalize text-md">evolutions</h2>
              <div class="flex items-center justify-between gap-4">
                <PokemonEvolutions
                  :pokemon="pokemon"
                  :pokemonTypes="pokemon.types"
                />
              </div>
            </div>
          </div>
          <div
            class="flex flex-col w-[420px] gap-2.5 py-1 px-5 rounded-lg bg-black/20"
          >
            <div class="mt-2">
              <h2 class="text-base font-semibold">Weaknesses</h2>
              <div class="mt-2">
                <WeaknessPokemon
                  :pokemonTypes="pokemon.types"
                  :pokemonId="pokemon.id"
                />
              </div>
            </div>
            <div>
              <h2 class="text-base font-semibold mb-2.5">Story</h2>
              <StoryPokemon />
            </div>
            <div class="flex flex-wrap gap-5 my-4">
              <InfoPokemon
                :title="`${heightTitle}`"
                :value="`${formatHeight} m`"
              />
              <InfoPokemon
                :title="`${categoryTitle}`"
                :value="`${formatCategory}`"
              />
              <GenderPokemon />
              <InfoPokemon
                :title="`${weightTitle}`"
                :value="`${formatWeight} kg`"
              />
              <InfoPokemon
                :title="`${abilitiesTitle}`"
                :value="pokemon.abilities[0].ability.name"
                class="capitalize"
              />
            </div>

            <StatsPokemon :pokemon="pokemon" />
          </div>
        </div>
      </div>

      <div class="relative">
        <NextRoutePokemon :pokemon="pokemon" :pokemonId="pokemon.id" />
      </div>
    </div>
  </div>
</template>
