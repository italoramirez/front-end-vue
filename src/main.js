import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from "./router/router.js";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(VueSweetalert2)
app.mount('#app')
