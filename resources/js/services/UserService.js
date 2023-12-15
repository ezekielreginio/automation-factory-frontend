import { setCookie } from './CookieService.js'
import { CORE_API } from './ApiService.js'

export default {
    postLogin(data) {
        return CORE_API().post('/api/auth/login', data)
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

          setCookie('sip_ut', data.token)
          setCookie('sip_ud', JSON.stringify(user))
  
          return true
        }
  
        return false
    },
    logout(hasRedirect = true) {
      setCookie('sip_ut', '', -1)
      setCookie('sip_ud', '', -1)

      if (hasRedirect) {
        window.location = '/'
      }
    }
}