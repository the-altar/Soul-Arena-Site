import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VTooltip from "v-tooltip";
import axios from "axios";
import GlobalMixin from "./mixins";

import * as Colyseus from "colyseus.js";
//Vue.config.productionTip = false
const url =
  (window.location.protocol === "https:" ? "wss://" : "ws://") +
  window.location.host;
// create global colyseus client as instance property
Vue.prototype.$colyseus = new Colyseus.Client(url);

Vue.prototype.$http = axios;
Vue.use(VTooltip);
Vue.mixin(GlobalMixin);
Vue.use(require("vue-scrollto"), {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true,
});
Vue.use(require("vue-moment"));
Vue.config.productionTip = false;

import VueGtag from "vue-gtag";

Vue.use(
  VueGtag,
  {
    config: {
      id: "G-78KZXC2T3P",
    },
    appName: "Soul Arena",
    pageTrackerScreenviewEnabled: true,
  },
  router
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
