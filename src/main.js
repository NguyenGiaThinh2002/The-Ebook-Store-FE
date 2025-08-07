

import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
// import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import bootstrap from 'bootstrap-vue/dist/js/bootstrap.bundle.js'
// import 'bootstrap/dist/css/bootstrap-grid.min.css'
// import 'bootstrap/dist/css/bootstrap-utilities.min.css'


createApp(App).use(router).mount('#app')

