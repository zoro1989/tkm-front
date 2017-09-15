// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import router from './router'
import VueResource from 'vue-resource'
import VueQuillEditor from 'vue-quill-editor'
Vue.use(ElementUI)
Vue.use(MuseUI)
Vue.use(VueResource)
Vue.use(VueQuillEditor)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
