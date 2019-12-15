import Vue from 'vue'
import App from './App.vue'
import router from './router';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import moment from 'moment';
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import Vuelidate from 'vuelidate'
import './assets/style.css'

Vue.use(Vuelidate)
Vue.use(VueSidebarMenu)
Vue.use(BootstrapVue)
Vue.prototype.moment = moment

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
