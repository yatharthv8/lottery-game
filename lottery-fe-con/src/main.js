import { createApp } from "vue";

import App from "./App.vue";
import web3 from "./web3";

import "./assets/styles.css";

createApp(App).mount("#app");
console.log(web3.eth.getAccounts().then(console.log));
