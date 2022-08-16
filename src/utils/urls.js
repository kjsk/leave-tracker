export const envURL = {
    dev: `https://dev-fidisyslt.herokuapp.com`,
    stage: `https://stage-fidisyslt.herokuapp.com`,
    prod: `https://prod-fidisyslt.herokuapp.com`,
}

export const baseURL = envURL?.dev;

export const getHeaders = (token) => {
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
}