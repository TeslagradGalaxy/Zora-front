import { createApp } from "vue";
import "./style.css";
import axios from "./axios";
import App from "./App.vue";
import routes from "./router/index";

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.use(routes);
app.mount("#app");
