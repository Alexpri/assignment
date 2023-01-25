import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import tagsInput from "@sipec/vue3-tags-input";

const app = createApp(App);
app.use(store);
app.use(router);
app.component("tags-input", tagsInput);
app.mount("#app");
