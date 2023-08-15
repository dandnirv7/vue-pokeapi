<template>
  <div>
    <div
      class="flex flex-col items-center justify-center w-24 h-20 gap-1 px-2 py-3 rounded-md shadow-lg bg-black/40 shadow-black/50"
    >
      <h2 class="font-semibold">{{ title }}</h2>
      <span class="text-sm capitalize"> {{ value }} </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    value: String,
  },
  data() {
    return {};
  },
};
</script>
