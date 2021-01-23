import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login"),
  },
  {
    path: "/user/:username",
    name: "user",
    component: () => import("../views/User"),
  },
  {
    path: "/news/:id/:title",
    name: "news",
    component: () => import("../views/News"),
  },
  {
    path: "/game-manual",
    name: "game-manual",
    component: () => import("../views/GameManual"),
  },
  {
    path: "/characters-and-skills",
    name: "characters-and-skills",
    component: () => import("../views/CharactersAndSkills"),
  },
  {
    path: "/characters-and-skills/:characterId",
    name: "character-page",
    component: () => import("../views/Character"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
