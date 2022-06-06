import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "axios";
// import "font-awesome/css/font-awesome.min.css";
// import "@fortawesome/fontawesome-free/css/all.css";

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  vuetify,
  router,
  axios,
  icons: {
    iconfont: "mdiSvg" || "mdi" || "mdiSvg" || "md" || "fa" || "fa4" || "faSvg",
  },
}).$mount("#app");
