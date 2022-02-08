import Vue from "vue";
import VueRouter from "vue-router";
import home from "../components/index.vue";
import stock_home from "../components/stock/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: home,
  },
  {
    path: "/stock",
    name: "Stock",
    component: stock_home,
  },
];

const router = new VueRouter({
  mode: "history",
  //   base: process.env.BASE_URL,
  routes,
});

export default router;
