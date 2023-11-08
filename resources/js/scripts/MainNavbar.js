function logout(hasRedirect = true) {
    deleteCookie('sip_ut')
    deleteCookie('sip_ud')

    if (hasRedirect) {
        window.location = '/'
    }
}

function deleteCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  }