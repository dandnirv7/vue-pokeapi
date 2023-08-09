<script>
export default {
  data() {
    return {
      pokemonList: [],
      search: "",
      pokemon: [],
      suggestedPokemon: "",
      isShow: true,
    };
  },
  methods: {
    async getListPokemon() {
      let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=161");
      let data = await response.json();
      let results = data.results;

      results.forEach((item) => {
        this.getEachPokemon(item);
      });

      // console.log(results);
    },
    async getEachPokemon(result) {
      let response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/" + result.name
      );
      let data = await response.json();

      this.pokemonList.push(data);
      this.pokemonList.sort((a, b) => a - b);
    },
    getBackgroundColor(pokemon) {
      const typeColors = {
        normal: "bg-gray-500",
        fire: "bg-red-500",
        water: "bg-blue-500",
        electric: "bg-yellow-400",
        grass: "bg-green-400",
        ice: "bg-blue-100",
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

      return typeColors[pokemon.types[0].type.name] || "";
    },
    async getAllPokemon() {
      let response = await fetch("https://pokeapi.co/api/v2/pokemon/");
      let data = await response.json();
      let results = data.results;

      this.pokemon = results;
    },

    getPokemonIdFromUrl(url) {
      const urlParts = url.split("/");
      return urlParts[urlParts.length - 2];
    },
  },
  mounted() {
    this.getListPokemon();
    this.getAllPokemon();
  },
  watch: {
    search() {
      let filteredPokemon = this.pokemon.filter((item) => {
        return item.name.includes(this.search);
      });
      this.suggestedPokemon = filteredPokemon.slice(0, 5);
      if (this.search === filteredPokemon) {
        this.isShow = true;
      }
    },
  },
};
</script>

<template>
  <div class="bg-gray-800">
    <div class="flex flex-col items-center">
      <a href="">
        <img
          src="../assets/pokeapi.svg"
          alt="pokeapi logo"
          class="w-full py-10 m-auto"
        />
      </a>
      <div class="">
        <input
          v-model="search"
          type="text"
          placeholder="search pokemon..."
          class="w-96 h-10 px-2 py-2.5 rounded-md focus:shadow-lg focus:shadow-blue-500 outline-none focus:ring-4 focus:ring-blue-500"
        />
      </div>
      <div class="text-white" v-if="isShow">
        <h3 class="my-5 text-white capitalize">suggestion:</h3>
        <router-link
          v-for="pokemon in suggestedPokemon"
          :key="pokemon"
          :to="'/detail/' + getPokemonIdFromUrl(pokemon.url)"
          class="w-full h-full px-2 py-1 mx-2 font-semibold bg-blue-500 rounded-lg cursor-pointer"
        >
          {{ pokemon.url }}
        </router-link>
      </div>
    </div>

    <div class="px-4 mt-20">
      <div class="flex flex-wrap gap-10 px-5">
        <router-link
          v-for="pokemon in pokemonList"
          :key="pokemon.id"
          :to="'/detail/' + pokemon.id"
        >
          <div class="flex flex-col items-center justify-center gap-10">
            <div
              class="w-[280px] h-[200px] rounded-3xl cursor-pointer relative hover:shadow-lg hover:shadow-black/50 hover:ease-in-out hover:duration-250"
              :class="getBackgroundColor(pokemon)"
            >
              <div class="px-5 mt-10 text-white">
                <h2 class="text-2xl font-bold capitalize">
                  {{ pokemon.name }}
                </h2>
                <h2
                  class="absolute text-[3rem] font-bold capitalize top-32 left-2 text-gray-50/20"
                >
                  #{{ pokemon.id }}
                </h2>
                <div
                  v-for="item in pokemon.types"
                  :key="item"
                  class="rounded-lg w-max bg-white/50"
                >
                  <p class="px-2 mt-2 font-semibold text-start">
                    {{ item.type.name }}
                  </p>
                </div>
                <img
                  :src="pokemon.sprites.front_default"
                  alt=""
                  class="absolute w-[160px] object-cover top-5 left-[120px]"
                />
              </div>
              <!-- <div class="relative w-full"></div> -->
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <router-view />
</template>
