import axios from 'axios'
import * as CookieService from './CookieService.js'

export default {
    async postLogin(data) {
        axios.defaults.baseURL = window.baseUrl
        return await axios.post(`/api/auth/login`, data, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
    },
    checkUserAccess(data) {
        const ADMIN_ACCESS_LEVEL = 3
        
        if (data.user.fk_access_level <= ADMIN_ACCESS_LEVEL) {
          let user = { 
              'email': data.user.email, 
              'access_level': data.user.access_level, 
              'company': data.user.company,
              'contact_number': data.user.contact_number,
              'name': data.user.name
          }
          
          CookieService.setCookie('sip_ut', data.token)
          CookieService.setCookie('sip_ud', JSON.stringify(user))
  
          return true
        }
  
        return false
      }
}