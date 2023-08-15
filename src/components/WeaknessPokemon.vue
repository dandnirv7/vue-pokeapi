<script>
export default {
  props: {
    pokemonTypes: Array,
    pokemonId: String,
  },
  data() {
    return {
      types: [],
    };
  },
  computed: {
    uniqueTypes() {
      const allTypes = this.types.flatMap(
        (typeData) => typeData.double_damage_from
      );
      const uniqueTypeNames = [...new Set(allTypes.map((type) => type.name))];
      return uniqueTypeNames.map((name) => ({ name }));
    },
    upperHalf() {
      return this.uniqueTypes.slice(0, Math.ceil(this.uniqueTypes.length / 2));
    },
    lowerHalf() {
      return this.uniqueTypes.slice(Math.ceil(this.uniqueTypes.length / 2));
    },
  },
  async created() {
    await this.fetchPokemonTypes();
  },
  watch: {
    pokemonId: "fetchPokemonTypes",
  },
  methods: {
    async fetchPokemonTypes() {
      try {
        const typePromises = this.pokemonTypes.map(async (typeData) => {
          const typeUrl = typeData.type.url;
          const typeResponse = await fetch(typeUrl);
          const typePokemon = await typeResponse.json();
          return typePokemon.damage_relations;
        });

        this.types = await Promise.all(typePromises);
      } catch (err) {
        console.error(err);
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
};
</script>

<template>
  <div>
    <div class="flex flex-wrap gap-2.5">
      <div v-for="(uniqueType, index) in upperHalf" :key="index">
        <span
          class="px-2 py-1 font-semibold capitalize rounded-lg w-max text-start"
          :class="getBackgroundColor(uniqueType.name)"
          >{{ uniqueType.name }}</span
        >
      </div>
    </div>
    <div class="flex flex-wrap gap-2.5 mt-4">
      <div v-for="(uniqueType, index) in lowerHalf" :key="index">
        <span
          class="px-2 py-1 font-semibold capitalize rounded-lg w-max text-start"
          :class="getBackgroundColor(uniqueType.name)"
          >{{ uniqueType.name }}</span
        >
      </div>
    </div>
  </div>
</template>
