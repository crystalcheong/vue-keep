import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { registerSW } from "virtual:pwa-register";

import "./styles/app.css";

const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});

createApp(App).use(router).mount("#app");
