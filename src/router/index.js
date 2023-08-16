import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Detail from "../views/Detail.vue";

const routes = [
  {
    path: "/",
    name: Home,
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/detail/:id",
    name: Detail,
    component: () => import("../views/Detail.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
