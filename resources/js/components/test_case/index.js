
import { createApp } from 'vue'
import TestCaseComponent from './TestCaseComponent.vue'

const app = createApp({})

app.component('test-case-component', TestCaseComponent)
app.mount('#app')
