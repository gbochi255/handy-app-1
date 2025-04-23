import axios from 'axios'


const api = axios.create({
    baseURL: 'https://handy-rpx6.onrender.com/'
})



export const getBids = (job_id) => {
    return api.get(`/bids/${job_id}`)
    .then(({data}) => {
        return data
    })
}

export const postABid = (job_id, amount, providerId) => {
    const requestObject = {
        amount: amount,
        provider_id: providerId,
    }
    return api.post(`/jobs/${job_id}/bid`, requestObject)
    .then(({data}) => {
        return data
    })
}


export const getJobs = () => {
    return api.get(`/jobs`)
    .then(({data}) => {
        return data
    })
}

//status values: 'open', 'accepted', 'completed', 'expired'
export const getClientJobs = (user_id, status) => {
    return api.get(`/jobs?created_by=${user_id}&status=${status}`)
    .then(({data}) => {
        return data
    })
}



export const getJobByID = (job_id) => {
    return api.get(`/jobs/${job_id}`)
    .then(({data}) => {
        return data
    })
}


// available jobs
export const getProviderJobs = (provider) => {
    return api.get(`/jobs/provider/${provider}?status=open`)
    .then(({data}) => {
        return data
    })
}


// mybids

export const getProviderBids = (provider) => {
    return api.get(`/jobs/provider/${provider}/bids`)
    .then(({data}) => {
        return data
    })
}


// myjobs
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



export const registerUser = (
    firstname, lastname, email, password, postcode, address, city, avatar_url, about_me, longitude, latitude
) => {
    const requestObject = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        postcode: postcode,
        address: address,
        city: city,
        avatar_url: avatar_url,
        about_me: about_me,
        longitude: longitude,
        latitude: latitude
    }
    return api.post('/register', requestObject)
    .then(({data}) => {
        return data
    })
}


