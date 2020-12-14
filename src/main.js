import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import GlobalMixin from "./mixins"

Vue.prototype.$http = axios
Vue.mixin(GlobalMixin)
Vue.use(require('vue-moment'));
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
