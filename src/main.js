import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";

import "@/styles/main.css";
import "@/styles/icons/nucleo-icons.css";
import "@/styles/icons/nucleo-svg.css";
import "@/styles/vendor/material-kit.scss";
import "@/utils/material-input.js";
import "@/utils/ripple-effect.js";

const app = createApp(App);

app.use(router);
app.mount("#app");
