import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// using style-loader

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$EventBus = new Vue()
Vue.use(BootstrapVue);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
