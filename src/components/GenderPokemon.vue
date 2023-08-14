<script>
export default {
  data() {
    return {
      femalePokemon: {},
      malePokemon: {},
      genderlessPokemon: {},
      femaleStyle: "text-pink-500 material-icons",
      maleStyle: "text-blue-500 material-icons",
      genderlessStyle: "text-gray-500 material-symbols-outlined",
    };
  },
  computed: {
    genderResults() {
      const pokemonId = this.$route.params.id;

      const femaleMatch = this.femalePokemon.pokemon_species_details?.find(
        (species) => species.pokemon_species.url.includes(`/${pokemonId}/`)
      );
      const maleMatch = this.malePokemon.pokemon_species_details?.find(
        (species) => species.pokemon_species.url.includes(`/${pokemonId}/`)
      );
      const genderlessMatch =
        this.genderlessPokemon.pokemon_species_details?.find((species) =>
          species.pokemon_species.url.includes(`/${pokemonId}/`)
        );

      const results = [];

      if (femaleMatch) {
        results.push({
          id: "female",
          text: this.femalePokemon.name,
          style: this.femaleStyle,
        });
      }
      if (maleMatch) {
        results.push({
          id: "male",
          text: this.malePokemon.name,
          style: this.maleStyle,
        });
      }
      if (genderlessMatch) {
        results.push({
          id: "genderless",
          text: this.genderlessPokemon.name.replace(
            this.genderlessPokemon.name,
            "agender"
          ),
          style: this.genderlessStyle,
        });
      }

      return results;
    },
  },

  async mounted() {
    await this.fetchFemalePokemon();
    await this.fetchMalePokemon();
    await this.fetchGenderlessPokemon();
  },
  methods: {
    async fetchFemalePokemon() {
      try {
        const femaleResponse = await fetch(
          `https://pokeapi.co/api/v2/gender/female`
        );
        const femaleData = await femaleResponse.json();
        this.femalePokemon = femaleData;
      } catch (err) {
        console.log(err);
      }
    },
    async fetchMalePokemon() {
      try {
        const maleResponse = await fetch(
          "https://pokeapi.co/api/v2/gender/male"
        );
        const maleData = await maleResponse.json();
        this.malePokemon = maleData;
      } catch (err) {
        console.log(err);
      }
    },
    async fetchGenderlessPokemon() {
      try {
        const genderlessResponse = await fetch(
          "https://pokeapi.co/api/v2/gender/genderless"
        );
        const genderlessData = await genderlessResponse.json();
        this.genderlessPokemon = genderlessData;
      } catch (err) {
        console.log(err);
      }
    },
  },
  watch: {
    "$route.params.id": [
      "fetchFemalePokemon",
      "fetchMalePokemon",
      "fetchGenderlessPokemon",
    ],
  },
};
</script>

<template>
  <div
    class="flex flex-col items-center justify-center h-24 gap-1 px-5 py-3 rounded-md shadow-lg w-28 bg-black/40 shadow-black/50"
  >
    <h2 class="font-semibold">Gender</h2>
    <div>
      <span
        v-for="gender in genderResults"
        :key="gender.id"
        :class="gender.style"
        >{{ gender.text }}</span
      >
    </div>
  </div>
</template>
