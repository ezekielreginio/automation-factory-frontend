import { AUTOMATION_API } from '../../../services/ApiService.js'

export default {
    executeAutomation(data) {
        return AUTOMATION_API().post('/automate', data)
    }
}