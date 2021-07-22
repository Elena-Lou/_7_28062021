import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


createApp({...App, beforeCreate(){
  this.$store.commit("INITIALIZE_STORE") //call mutation to store token and user data into localstorage (instead od sessionstorage)
}})
  .use(store)
  .use(router)
  .mount("#app");
