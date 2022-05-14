import Vue from 'vue'
import Axios from 'axios';
import App from './App.vue'

import router from "./router";
import store from './store';

Vue.config.productionTip = false

Axios.defaults.baseURL = 'http://localhost:3000'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
