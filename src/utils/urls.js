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

export const adminRegisterAPI = () => {
    return baseURL + `/api/v2/auth/register`;
}

export const adminLoginAPI = () => {
    return baseURL + `/api/v2/auth/login`;
}

export const updateOrgAPI = () => {
    return baseURL + `/api/v2/orgs`;
}

export const checkOrgAPI = (id) => {
    return baseURL + `/api/v2/orgs/${id}`;
}

export const leavesAPI = () => {
    return baseURL + `/api/v2/leaves`;
}

export const addUserAPI = () => {
    return baseURL + `/api/v2/users`;
}

export const userEditAPI = (id) => {
    return baseURL + `/api/v2/users/${id}`;
}

export const getUsersAPI = () => {
    return baseURL + `/api/v2/users?page=0&limit=0`;
}