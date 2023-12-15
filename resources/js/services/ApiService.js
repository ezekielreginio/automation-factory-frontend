import axios from 'axios'

const HEADERS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Accept': '*/*'
}

export const CORE_API =  (headers = null) => {
    headers = headers ? headers : HEADERS
    return axios.create({
        baseURL: window.baseUrl
    }, headers)
}

export const AUTOMATION_API =  (headers = null) => {
    headers = headers ? headers : HEADERS

    return axios.create({
        baseURL: window.automationMicroserviceUrl
    }, headers)
}