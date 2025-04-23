import axios from 'axios'

const api = axios.create({
    baseURL: 'https://handy-rpx6.onrender.com/'
})

//Bids

export const getBids = (job_id) => {
    return api.get(`/bids/${job_id}`)
    .then(({data}) => {
        return data
    })
}

export const postBid = (job_id, provider_id, amount) => {
    const requestObject = {
        provider_id,
        amount
    }
    return api.post(`/jobs/${job_id}/bid`, requestObject)
    .then(({data}) => {
        return data
    })
}

//Jobs

export const getJobs = () => {
    return api.get(`/jobs`)
    .then(({data}) => {
        return data
    })
}

//status values: 'open', 'accepted', 'completed', 'expired'
export const getClientJobs = (client, status) => {
    return api.get(`/jobs?created_by=${client}&status=${status}`)
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


export const acceptBid = (job_id, bid_id) => {
    return api.patch(`/jobs/${job_id}/accept/${bid_id}`)
    .then(({data}) => {
        return data
    })
}

export const postJob = (summary, job_detail, category, created_by, target_date, photo_url, postcode) => {
    const requestObject = {
        summary,
        job_detail,
        category,
        created_by,
        target_date,
        photo_url,
        postcode
    }
    return api.post(`/jobs/create`, requestObject)
    .then(({data}) => {
        return data
    })
}


export const patchJobComplete = (job_id, bid_id) => {
    return api.patch(`/jobs/${job_id}/complete`)
    .then(({data}) => {
        return data
    })
}


//users

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
        firstname,
        lastname,
        email,
        password,
        postcode,
        address,
        city,
        avatar_url,
        about_me,
        longitude,
        latitude
    }
    return api.post('/register', requestObject)
    .then(({data}) => {
        return data
    })
}

export const becomeProvider = (user_id, isProvider) => {
    const requestObject = { isProvider }
    return api.patch(`/users/${user_id}`, requestObject)
    .then(({data}) => {
        return data
    })
}