<script>
export default {
  props: {
    pokemon: Object,
  },
  data() {
    return {
      colorRanges: [
        { min: 0, max: 10, color: "bg-red-600" },
        { min: 10, max: 20, color: "bg-red-500" },
        { min: 20, max: 30, color: "bg-orange-600" },
        { min: 30, max: 40, color: "bg-orange-500" },
        { min: 40, max: 50, color: "bg-amber-500" },
        { min: 50, max: 60, color: "bg-yellow-400" },
        { min: 60, max: 75, color: "bg-yellow-300" },
        { min: 75, max: 90, color: "bg-green-400" },
        { min: 90, max: 100, color: "bg-green-500" },
      ],
    };
  },
  methods: {
    formatStatName(name) {
      return name === "hp" ? "HP" : name.replace("special-", "sp. ");
    },
    formatWidth(baseStat) {
      return baseStat > 100 ? 100 : baseStat;
    },
    getBackgroundColor(baseStat) {
      if (baseStat > 100) {
        return "bg-green-500";
      }

      for (const range of this.colorRanges) {
        if (baseStat >= range.min && baseStat <= range.max) {
          return range.color;
        }
      }
      return "bg-gray-500";
    },
  },
};
</script>

<template>
  <div>
    <h2 class="text-base font-semibold capitalize">Stats</h2>
    <div class="flex flex-col items-center justify-center mt-2">
      <div
        v-for="(stat, index) in pokemon.stats"
        :key="index"
        class="flex items-center w-full h-full gap-2"
      >
        <h2 class="w-2/5 capitalize">
          {{ formatStatName(stat.stat.name) }}
        </h2>
        <span class="w-1/5">{{ stat.base_stat }}</span>
        <div class="w-full bg-gray-200 rounded-md">
          <div
            :style="{
              width: formatWidth(stat.base_stat) + '%',
            }"
            class="py-1 text-center text-white rounded-md"
            :class="getBackgroundColor(stat.base_stat)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
