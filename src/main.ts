import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import tagsInput from "@sipec/vue3-tags-input";
import VueMultiselect from "vue-multiselect";

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(router);
app.component("tags-input", tagsInput);
app.component("vue-select-multiselect", VueMultiselect);
app.mount("#app");
