import Vue from 'vue'
import App from './App.vue'
import axios from "axios";
import moment from "moment";

// router setup
import router from "./routes/routes";

// store setup
import store from "./store/store";

// Ant Design
import Antd from "ant-design-vue"
import "ant-design-vue/dist/antd.css"

// require("./store/subscribe");

axios.defaults.baseURL = "localhost:5000";

// store.dispatch('attempt', sessionStorage.getItem('token'));

Vue.prototype.moment = moment;

Vue.config.productionTip = false

Vue.use(Antd)

// Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
