export const setCookie = (cookieName, cookieValue, exdays = 1) => {
    let date = new Date();
    let expires = date.setDate(date.getDate() + exdays);
    document.cookie = `${cookieName}=${cookieValue}; max-age=${expires}; path=/`;
}
  
export const getCookie = (cookieName) => {
    // just in case cookie name is the first in the list
    const value = `; ${document.cookie}`;
    
    // Search for cookie name and use it to split the string into two values in an array
    const parts = value.split(`; ${cookieName}=`);

    if (parts.length === 2) {
        // Get last value in the array (pop), split it once again into an array using ";" as a marker, and shift() returns the first element of the array
        return parts.pop().split(';').shift();
    }

    return null
}
  
export const checkCookie = (cookieName) => {
    let cookie = getCookie(cookieName);
    return cookie != ""
}