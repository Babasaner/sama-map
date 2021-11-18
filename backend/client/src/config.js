import axios from 'axios'

export const axiosInstance = axios.create({

    baseURL : "https://sama-map.herokuapp.com/api"
})
