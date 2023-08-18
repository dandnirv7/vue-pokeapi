<script>
export default {
  data() {
    return {
      pokemonList: [],
      pokemonListToShow: [],
      search: "",
      pokemon: [],
      pokemonType: [],
      suggestedPokemon: [],
      isShow: false,
      showFilteredResults: false,
      selectedFilter: "asc",
    };
  },
  computed: {
    filteredPokemon() {
      let filteredList = [...this.pokemonList];

      if (this.selectedFilter === "asc" || this.selectedFilter === "desc") {
        filteredList.sort((a, b) =>
          this.selectedFilter === "asc" ? a.id - b.id : b.id - a.id
        );
      } else {
        filteredList = filteredList.filter((pokemon) => {
          return pokemon.types.some(
            (type) => type.type.name === this.selectedFilter
          );
        });
      }

      return filteredList;
    },

    filteredPokemonSearch() {
      return this.pokemonListToShow.slice().sort((a, b) => {
        if (this.selectedFilter === "asc") {
          return a.id - b.id;
        } else if (this.selectedFilter === "desc") {
          return b.id - a.id;
        }
      });
    },
  },
  methods: {
    async getListPokemon() {
      let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=161");
      let data = await response.json();
      let results = data.results;

      results.forEach((item) => {
        this.getEachPokemon(item);
      });
    },
    async getEachPokemon(result) {
      let response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/" + result.name
      );
      let data = await response.json();

      this.pokemonList.push(data);
      this.pokemonList.sort((a, b) => a.id - b.id);
    },

    async getPokemonType() {
      let typeResponse = await fetch("https://pokeapi.co/api/v2/type/");
      let typeData = await typeResponse.json();
      let typeResults = typeData.results;

      this.pokemonType = typeResults;
    },
    getBackgroundColor(pokemon) {
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
        dark: "bg-gray-900",
        steel: "bg-gray-400",
        fairy: "bg-pink-300",
      };

      return typeColors[pokemon.types[0].type.name] || "";
    },

    getPokemonIdFromUrl(url) {
      const urlParts = url.split("/");
      return urlParts[urlParts.length - 2];
    },
    handleSearchInput() {
      let filteredPokemon = this.pokemonList.filter((item) => {
        return item.name.includes(this.search.toLowerCase());
      });
      this.suggestedPokemon = filteredPokemon.slice(0, 5);
      this.isShow = filteredPokemon.length > 0 && this.search !== "";
    },
    handleSearchButton() {
      let filteredPokemon = this.pokemonList.filter((item) => {
        return item.name.includes(this.search.toLowerCase());
      });

      this.pokemonListToShow = filteredPokemon.slice().sort((a, b) => {
        if (this.selectedFilter === "asc") {
          return a.id - b.id;
        } else if (this.selectedFilter === "desc") {
          return b.id - a.id;
        }
      });

      this.showFilteredResults = true;
      this.isShow = false;
    },

    redirectToPokemon(pokemonId) {
      this.$router.push(`/detail/${pokemonId}`);
    },
  },
  mounted() {
    this.getListPokemon();
    this.getPokemonType();
  },
  watch: {
    search() {
      let filteredPokemon = this.pokemonList.filter((item) => {
        return item.name.includes(this.search);
      });
      this.suggestedPokemon = filteredPokemon.slice(0, 5);
      this.isShow = filteredPokemon.length > 0 && this.search !== "";
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
      <div class="container w-[580px] p-6 mx-auto">
        <div class="flex flex-row items-center justify-center gap-2">
          <input
            v-model="search"
            @input="handleSearchInput"
            class="w-full p-2 border rounded outline-none"
            placeholder="Search Pokemon"
          />
          <button
            @click="handleSearchButton"
            class="px-4 py-2 font-semibold text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-600"
          >
            Go!
          </button>
        </div>
        <div v-if="isShow" class="flex flex-col gap-2 mt-2">
          <h2 class="text-white">Suggestion:</h2>
          <div class="flex flex-row gap-2">
            <div
              v-for="pokemon in suggestedPokemon"
              :key="pokemon.id"
              class="px-2 py-[1px] bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600"
              @click="redirectToPokemon(pokemon.id)"
            >
              <router-link :to="'/detail/' + pokemon.id">
                <span class="text-white capitalize text-md">
                  {{ pokemon.name }}
                </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="relative flex flex-col gap-5 px-4 mt-20">
      <div class="absolute flex flex-row gap-4 right-20">
        <h2 class="font-semibold text-white text-md">Filter</h2>
        <select
          v-model="selectedFilter"
          @change="filteredPokemon"
          name="sort"
          id="sort"
          class="outline-none"
        >
          <option value="asc">asc</option>
          <option value="desc">desc</option>
          <option v-for="type in pokemonType" :key="type">
            {{ type.name }}
          </option>
        </select>
      </div>
      <div class="flex flex-wrap gap-10 pb-5 mt-10">
        <div v-if="showFilteredResults" class="flex flex-wrap gap-10 px-5 pb-5">
          <router-link
            v-for="pokemon in showFilteredResults
              ? filteredPokemonSearch
              : filteredPokemon"
            :key="pokemon.id"
            :to="'/detail/' + pokemon.id"
          >
            <div class="flex flex-col items-center justify-center gap-10">
              <div
                class="w-[280px] h-[200px] rounded-3xl cursor-pointer relative hover:shadow-lg hover:shadow-black/50 hover:ease-in-out hover:duration-250"
                :class="getBackgroundColor(pokemon)"
              >
                <div class="flex justify-between px-5 mt-10 text-white">
                  <div>
                    <h2 class="text-2xl font-bold capitalize">
                      {{ pokemon.name }}
                    </h2>
                    <h2
                      class="absolute text-[3rem] font-bold capitalize top-32 left-2 text-gray-50/20"
                    >
                      #{{ String(pokemon.id).padStart(3, "0") }}
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
                  </div>
                  <div class="relative w-28 h-28">
                    <img
                      :src="pokemon.sprites.other.dream_world.front_default"
                      :alt="pokemon.name"
                      loading="lazy"
                      class="absolute top-0 left-0 w-full h-full object-fit"
                    />
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
        <div v-else class="flex flex-wrap gap-10 px-5 pb-5">
          <router-link
            v-for="pokemon in filteredPokemon"
            :key="pokemon.id"
            :to="'/detail/' + pokemon.id"
          >
            <div class="flex flex-col items-center justify-center gap-10">
              <div
                class="w-[280px] h-[200px] rounded-3xl cursor-pointer relative hover:shadow-lg hover:shadow-black/50 hover:ease-in-out hover:duration-250"
                :class="getBackgroundColor(pokemon)"
              >
                <div class="flex justify-between px-5 mt-10 text-white">
                  <div>
                    <h2 class="text-2xl font-bold capitalize">
                      {{ pokemon.name }}
                    </h2>
                    <h2
                      class="absolute text-[3rem] font-bold capitalize top-32 left-2 text-gray-50/20"
                    >
                      #{{ String(pokemon.id).padStart(3, "0") }}
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
                  </div>
                  <div class="relative w-28 h-28">
                    <img
                      :src="pokemon.sprites.other.dream_world.front_default"
                      :alt="pokemon.name"
                      loading="lazy"
                      class="absolute top-0 left-0 w-full h-full object-fit"
                    />
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <router-view />
</template>
