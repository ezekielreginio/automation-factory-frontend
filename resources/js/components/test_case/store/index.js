import { createStore } from 'vuex'
import * as TestCaseForm from './modules/TestCaseForm.js'
import * as TestActions from './modules/TestActions.js'

export default createStore({
    modules: {
        'testCaseForm': {
            ...TestCaseForm,
            'namespaced': true
        },
        'testActions': {
            ...TestActions,
            'namespaced': true
        }
    }
}) 