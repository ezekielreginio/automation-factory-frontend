require('./bootstrap');

import { createApp } from 'vue'
import Index from './components/landing_page/Index.vue'

const app = createApp({})

app.component('landing-page', Index)
app.mount('#app')
