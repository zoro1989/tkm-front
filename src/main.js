// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import './settings/theme/index.css'
import ElementUI from 'element-ui'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import './settings/common.css'
import router from './router'
// import VueResource from 'vue-resource'
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import fastclick from 'fastclick'
import vueLazyload from 'vue-lazyload'

fastclick.attach(document.body)
Vue.use(vueLazyload, {
  preLoad: 1.3,
  error: require('assets/default.png'),
  loading: require('assets/default.png'),
  attempt: 1
})

Vue.use(ElementUI)
Vue.use(MuseUI)
// Vue.use(VueResource)
Vue.use(VueQuillEditor, /* {  default global options } */)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
