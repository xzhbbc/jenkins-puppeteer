import axios from "axios";

// const link = 'http://localhost:4000'
const link = ''

export default {
    get(url, data) {
        return axios.get(link + url, data)
    },
    post(url, data) {
        return axios.post(link + url, data)
    }
}
