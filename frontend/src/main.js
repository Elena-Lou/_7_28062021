import Vue from "vue";
import vuex from "vuex";
import router from "./router";
import store from "./store";
import VeeValidate from "vee-validate";

Vue.use(vuex)
Vue.config.productionTip = false;
Vue.use(VeeValidate);

new Vue({
  router,
  store,
  render: h => h(require ("./App"))
}).$mount('#app')
