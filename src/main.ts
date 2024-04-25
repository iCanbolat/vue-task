import { createApp } from "vue";
import "./assets/main.css";
import App from "./App.vue";
import store, { key } from "./store";
import router from "./router";


createApp(App).use(router).use(store, key).mount("#app");
