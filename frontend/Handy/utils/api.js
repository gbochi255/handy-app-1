import axios from 'axios'


const api = axios.create({
    baseURL: 'https://handy-rpx6.onrender.com/'
})



export const getJobs = () => {
    return api.get(`/jobs`)
    .then(({data : {jobs}}) => {
        return jobs
    })
}



//status values: 'open', 'accepted', 'completed', 'expired'
export const getClientJob = (client, status) => {
    return api.get(`/jobs?created_by=${client}&status=${status}`)
    .then(({data : {jobs}}) => {
        return jobs
    })
}



export const getProviderJobs = (provider) => {
    return api.get(`/jobs/provider/${provider}`)
    .then(({data :{jobs}}) => {
        return jobs
    })
}



export const getProviderBids = (provider) => {
    return api.get(`/jobs/provider/${provider}/bids`)
    .then(({data :{jobs}}) => {
        console.log(jobs, '<---getProviderJobs in api.js')
        return jobs
    })
}



export const getProviderWonJobs = (provider) => {
    return api.get(`/jobs/provider/${provider}/won`)
    .then(({data :{jobs}}) => {
        return jobs
    })
}




