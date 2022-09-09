import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import LoadingState from "@/components/LoadingState";

createApp(App)
    .component("LoadingState", LoadingState)
    .use(store)
    .use(router)
    .mount("#app");