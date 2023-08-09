<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import Home from "./views/Home.vue";
import Detail from "./views/Detail.vue";
export default {
  components: {
    Home,
    Detail,
  },
};
</script>
