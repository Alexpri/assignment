import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

const pinia = createPinia();
import tagsInput from "@sipec/vue3-tags-input";

const app = createApp(App);
app.use(pinia);
app.use(router);
app.component("tags-input", tagsInput);
app.mount("#app");
