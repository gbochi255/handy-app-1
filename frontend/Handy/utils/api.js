import axios from 'axios'


const api = axios.create({
    baseURL: 'https://handy-rpx6.onrender.com/'
})



export const getJobs = () => {
    return api.get(`/jobs`)
    .then(({data}) => {
        return data
    })
}



//status values: 'open', 'accepted', 'completed', 'expired'
export const getClientJob = (client, status) => {
    return api.get(`/jobs?created_by=${client}&status=${status}`)
    .then(({data}) => {
        return data
    })
}



export const getProviderJobs = (provider) => {
    return api.get(`/jobs/provider/${provider}`)
    .then(({data}) => {
        return data
    })
}



export const getProviderBids = (provider) => {
    return api.get(`/jobs/provider/${provider}/bids`)
    .then(({data}) => {
        return data
    })
}



export const getProviderWonJobs = (provider) => {
    return api.get(`/jobs/provider/${provider}/won`)
    .then(({data}) => {
        return data
    })
}



export const loginUser = (email, password) => {
    const requestObject = {
    email: email,
    password: password,
    }
    return api.post('/login', requestObject)
    .then(({data}) => {
        return data
    })
}


