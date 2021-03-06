import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/characters",
  },
  {
    path: "/characters",
    name: "Characters",
    component: function () {
      return import(
        /* webpackChunkName: "characters" */ "@/views/Characters.vue"
      );
    },
  },
  {
    path: "/characters/:id",
    name: "CharacterDetails",
    component: function () {
      return import(
        /* webpackChunkName: "character-details" */ "@/views/CharacterDetails.vue"
      );
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
