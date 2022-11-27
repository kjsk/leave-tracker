import { headers } from "../../functions";
import {
    getPolicyDataAPI,
    getAllowanceByPolicy,
    updateAllowanceAPI,
    getHeaders,
    deleteAllowanceAPI,
    addAllowanceAPI,
    getUserAllowanceByIdAPI,
    deleteUserAllowanceByIdAPI,
    editUserAllowanceByIdAPI,
    addUsersAllowanceAPI
} from "../../urls"

export const OpenPolicy = (policyId, callFrom, setAllowanceData) => {
    axios({
        url: callFrom == "users" ? getUserAllowanceByIdAPI(policyId) : getAllowanceByPolicy(policyId),
        method: "GET",
        headers: headers,
    })
        .then(res => {
            if (res?.data) {
                setAllowanceData(res?.data)
            }
        })
        .catch(err => console.log("Error", err))
}