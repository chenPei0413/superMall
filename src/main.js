import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import toast from "components/common/toast"
import VueLazyLoad from "vue-lazyload"

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
// 安装 toast 插件
Vue.use(toast)
Vue.use(VueLazyLoad, {
  loading: require('assets/images/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
