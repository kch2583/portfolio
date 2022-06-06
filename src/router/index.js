import Vue from "vue";
import VueRouter from "vue-router";
import home from "../components/index.vue";
import stock_home from "../components/stock/index.vue";
import p5_home from "../components/p5/index.vue";
import health_home from "../components/health/index.vue";
import climbing_home from "../components/climbing/index.vue";
import coding_home from "../components/coding/index.vue";
import post_total_table from "../components/coding/postTotalTable.vue";
import coding_list from "../components/coding/codingList.vue";
import create_post from "../components/coding/createPost.vue";

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
  {
    path: "/p5",
    name: "p5",
    component: p5_home,
  },
  {
    path: "/health",
    name: "Health",
    component: health_home,
  },
  {
    path: "/climbing",
    name: "Climbing",
    component: climbing_home,
  },
  {
    path: "/coding",
    component: coding_home,
    children: [
      {
        path: "",
        components: { default: coding_list, second: post_total_table },
      },
      {
        path: "create_post",
        components: { default: create_post },
      },
    ],
    // children: [
    //   {
    //     path: "/",
    //     component: coding_list,
    //   },
    //   {
    //     path: "/coding/:id",
    //     component: post_total_table,
    //     props: true,
    //   },
    // ],
  },
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes,
});

export default router;
