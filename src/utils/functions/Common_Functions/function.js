import { playAudio, openNotificationWithIcon } from "../../functions";
import {
    getHeaders,
    createLeaveAPI,
    getAllLeaveTypesAPI,
    createPolicyAPI
} from "../../urls";
import axios from "axios";

// Fetch user data from local storage
const userData =
    typeof localStorage !== "undefined" &&
    JSON.parse(localStorage.getItem("userData")) // FETCHING USER STORED DATA
// const userDataMain = userData?.user;

// Headers
const headers = getHeaders(userData?.tokens?.accessToken)

// common function Get Leave types
export const getAllLeaveTypes = (props) => {
    const { setState } = props;
    axios({
        url: getAllLeaveTypesAPI(),
        method: "GET",
        headers: headers
    }).then((res) => {
        setState(res?.data?.map((item) => ({ ...item, isSelected: false })));
    }).catch((err) => {
        console.log("Error", err)
    })
}

// create leave function
export const CreateLeaveTypeFun = (props) => {
    const {
        audioPlayer,
        createLeaveName,
        createLeaveType,
        createLeaveColor,
        setButtonProcess,
        setCreateLeaveName,
        setCreateLeaveType,
        setCreateLeaveColor,
        setLeaveTypes,
        setCreateLeavePop
    } = props;
    setButtonProcess(true);
    const obj = {
        label: createLeaveName,
        value: createLeaveType,
        description: createLeaveName,
        color: createLeaveColor.hex,
    }
    axios({
        url: createLeaveAPI(),
        method: "POST",
        headers: headers,
        data: obj,
    }).then((_res) => {
        playAudio(audioPlayer);
        openNotificationWithIcon(`success`, "Leave type added!");
        setCreateLeavePop(false);
        setButtonProcess(false);
        setCreateLeaveName("");
        setCreateLeaveType("");
        setCreateLeaveColor("");
        getAllLeaveTypes({
            setState: setLeaveTypes
        });
    }).catch((_err) => {
        openNotificationWithIcon(`error`, "Oops!, Please try again");
        setCreateLeavePop(false);
        setButtonProcess(false);
    })
}

// button disable function for Create a policy popup
export const disableFun = (props) => {
    const { container, newPolicyName } = props;

    let condition = [];
    let boolen = false;
    container.forEach((item) => {
        if (!(newPolicyName && item?.name && item?.type && item?.days && item?.maxLimit)) {
            condition.push(true);
        } else {
            condition.push(false);
        }
    });
    condition.forEach((element) => {
        if (element) {
            boolen = element;
        }
    });
    return boolen;
}


// Create Policy Function
export const createPolicyAPIFun = (props) => {
    const {
        startMonthObj,
        endMonthObj,
        newPolicyName,
        newAllowanceSet,
        container,
        audioPlayer,
        setDropVal,
        setPolicyPop,
        GetPolicyFun,
        cleanPolicyPopValues
    } = props;

    const policyData = {
        "startMonth": startMonthObj?.label,
        "endMonth": endMonthObj?.label,
        "name": newPolicyName,
        "description": "New Policy",
        "allowances": newAllowanceSet(container),
    }
    axios({
        url: createPolicyAPI(),
        method: "POST",
        headers: headers,
        data: policyData
    }).then((res) => {
        openNotificationWithIcon(`success`, "Policy Added Successfully")
        playAudio(audioPlayer);
        setDropVal("");
        setPolicyPop(false);
        cleanPolicyPopValues();
        GetPolicyFun()
        console.log("res", res);
    }).catch((err) => {
        openNotificationWithIcon(`error`, "Something went wrong...")
        setPolicyPop(false);
        console.log("Error", err)
    })
}