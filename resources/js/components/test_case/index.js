
import { createApp } from 'vue'
import TestCaseComponent from './components/TestCaseComponent.vue'
import index from './store/index.js'
import mitt from 'mitt'

const app = createApp({})
//Use VueX
app.use(index)

//Set Global Event Bus Emitter
app.config.globalProperties.emitter = mitt()

//Import Components
app.component('test-case-component', TestCaseComponent)

//Mount Vue App
app.mount('#app')
