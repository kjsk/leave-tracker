import React, { useEffect, useState, useRef } from "react";
import { BoardContainer } from "../components/Board/styles";
import { RedoOutlined } from "@ant-design/icons";
import { Drawer, Modal, notification } from "antd";
import SideModal from "../components/leavePopup/index";
import axios from "axios";
import { navigate } from "gatsby";
import AudioComponent from "../components/Audio";
import Avatar from "../components/Avatar/index";
import CompoLoader from "../components/ComponentLoader";
import AdminPortal from "../components/Board/AdminPortal";
import LeaveDetails from "../components/Forms/LeaveDetails";
import {
    getHeaders,
    leavesAPI,
    userEditAPI,
    getUserAllowanceByIdAPI,
    baseURL
} from "../utils/urls";
import { nameProf, playAudio } from "../utils/functions";
import SideBar from "../components/SideBar";
import CountCards from "../components/countCards";
import HeaderMain from "../components/header"

const LeaveRequests = () => {

    // Fetch user data from local storage
    const userData =
        typeof localStorage !== "undefined" &&
        JSON.parse(localStorage.getItem("userData")) // FETCHING USER STORED DATA
    const userDataMain = userData?.user;

    // notification conformation sound function
    const audioPlayer = useRef(null)

    const [popup, setPopup] = useState(false);
    const [userLeaveData, setUserLeaveData] = useState([]);
    const [activeLoader, setActiveLoader] = useState(false);
    const [adminToggle, setAdminToggle] = useState("all");
    const [visible, setVisible] = useState(false);
    const [leaveDetail, setLeaveDetail] = useState(false);
    const [leaveDetailContent, setLeaveDetailContent] = useState("");
    const [descType, setDescType] = useState("");
    const [descId, setDescId] = useState("");
    const [buttonProcess, setButtonProcess] = useState(false);
    const [allowanceDrop, setAllowanceDrop] = useState(false);
    const [getNewUserLeave, setGetNewUserLeave] = useState();

    // common headers
    const headers = getHeaders(userData?.tokens?.accessToken)

    // FETCHING LEAVE ON PAGELOAD
    useEffect(() => {
        if (userData) {
            getLeaves()
        } else {
            logOut()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Call to fetch the number of leaves by user
    const getLeaves = () => {
        setActiveLoader(true)
        axios({
            method: "GET",
            url: leavesAPI(),
            headers: headers,
        })
            .then(res => {
                setActiveLoader(false)
                setUserLeaveData(res?.data)
            })
            .catch(_err => {
                setActiveLoader(false)
                console.log("Error", _err)
            })
    }

    // Call for logout and cleanup the localstorage
    const logOut = () => {
        if (typeof localStorage !== `undefined`) {
            localStorage.removeItem("userData")
        }
        navigate(`/Login`)
        openNotificationWithIcon(`success`, "Logout Successfully")
    }

    // Approve Reject popup function
    const desecision = (type, id) => {
        setDescType(type)
        setDescId(id)
        setVisible(true)
        setLeaveDetail(false)
    }

    // call to action on leave (APPROVE, REJECT, DELETE)
    const approveLeave = (type, leaveId) => {
        setActiveLoader(true)
        setButtonProcess(true)
        axios({
            method: type === "delete" ? "Delete" : "PUT",
            url: `${baseURL}/api/v2/leaves${type !== "delete" ? "/" + type : ""
                }/${leaveId}`,
            headers: headers,
        })
            .then(async res => {
                getLeaves()
                setLeaveDetail(false)
                setButtonProcess(false)
                openNotificationWithIcon("success", res?.data?.message)
                playAudio()
            })
            .catch(_err => {
                setActiveLoader(false)
                setButtonProcess(false)
                setLeaveDetail(false)
                console.log("Error while approving leave", _err)
            })
    }

    const leaveMap = userLeaveData?.leaves?.filter(item =>
        adminToggle === "all" ? item : item.status === adminToggle
    )

    const openNotificationWithIcon = (type, data) => {
        notification[type]({
            message: data,
            placement: "top",
        })
    }

    const openLeaveDetailsFun = (item, desType) => {
        setLeaveDetail(true)
        setLeaveDetailContent({ item, desType })
    }


    // Setting variables manually for leave count in User dash board
    const userRealData = userLeaveData?.leaves?.filter(item =>
        adminToggle === "all" ? item : item.status === adminToggle
    )


    // Setting variables manually for leave count in User dash board
    const leaveApproved = userLeaveData?.leaves?.filter(
        item => item.status === "approved"
    )
    const leaveRejected = userLeaveData?.leaves?.filter(
        item => item.status === "rejected"
    )
    const leavePending = userLeaveData?.leaves?.filter(
        item => item.status === "pending"
    )

    // Dynamic leave calculation variable
    const calcLeaves = 24 - leaveApproved?.length

    // Get usersdata by ID
    useEffect(() => {
        getUserById(userDataMain?.id);
        GetuserLeaveReqFun(userDataMain?.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const getUserById = id => {
        axios({
            url: userEditAPI(id),
            method: "GET",
            headers: headers,
        })
            .then(res => {
                setGetNewUserLeave(res?.data?.user?.allowance)
            })
            .catch(err => {
                console.log("err", err)
            })
    }

    const [userAllowanceData, setUserAllowanceData] = useState([]);
    const GetuserLeaveReqFun = id => {
        axios({
            url: getUserAllowanceByIdAPI(id),
            method: "GET",
            headers: headers
        }).then(res => {
            console.log("resp", res);
            setUserAllowanceData(res?.data?.allowances);
        })
            .catch(err => {
                console.log("err", err)
            })
    }
    return (
        <BoardContainer>
            <AudioComponent
                audioPlayer={audioPlayer}
            />
            <div id="BoardContainer">
                <SideBar />
                <div
                    id="main_menu"
                    style={{ background: "#FCFAFA" }}
                >
                    <HeaderMain
                        title="Leave Requests"
                        userDataMain={userDataMain}
                        buttonFun={userDataMain?.role !== "admin" && (
                            <button onClick={() => setPopup(true)}>Apply Leave</button>
                        )}
                    />
                    {/* ADMIN & USER PORTAL */}
                    <CountCards
                        userDataMain={userDataMain}
                        leavePending={leavePending}
                        calcLeaves={calcLeaves}
                        getNewUserLeave={getNewUserLeave}
                        leaveRejected={leaveRejected}
                        leaveApproved={leaveApproved}
                        userAllowanceData={userAllowanceData}
                    />
                    <AdminPortal
                        RedoOutlined={RedoOutlined}
                        adminToggle={adminToggle}
                        setAdminToggle={setAdminToggle}
                        leaveMap={leaveMap}
                        userRealData={userRealData}
                        Avatar={Avatar}
                        nameProf={nameProf}
                        openLeaveDetailsFun={openLeaveDetailsFun}
                        userDataMain={userDataMain}
                        desecision={desecision}
                        getLeaves={getLeaves}
                        activeLoader={activeLoader}
                        CompoLoader={CompoLoader}
                    />

                </div>
            </div>

            {/* SIDE MODAL DRAWER TO APPLY LEAVE */}
            <Drawer
                visible={popup}
                onClose={() => {
                    setPopup(false)
                    setAllowanceDrop(false)
                }}
                width="fit-content"
            >
                <SideModal
                    setPopup={setPopup}
                    headers={headers}
                    userDataMain={userDataMain}
                    setUserLeaveData={setUserLeaveData}
                    playAudio={playAudio}
                    setButtonProcess={setButtonProcess}
                    buttonProcess={buttonProcess}
                    allowanceDrop={allowanceDrop}
                    setAllowanceDrop={setAllowanceDrop}
                    openNotificationWithIcon={openNotificationWithIcon}
                />
            </Drawer>

            {/* LEAVE DETAILS POPUP */}
            <Modal
                centered
                visible={leaveDetail}
                onCancel={() => {
                    setLeaveDetail(false)
                }}
                okButtonProps={{ style: { display: "none" } }}
                cancelButtonProps={{ style: { display: "none" } }}
                okText="Continue"
            >
                <LeaveDetails
                    leaveDetailContent={leaveDetailContent}
                    desecision={desecision}
                    nameProf={nameProf}
                    userDataMain={userDataMain}
                />
            </Modal>

            {/* LEAVE ACTION TAKEN POPUP (APPROVE, REJECT, DELETE ) */}
            <Modal
                title="Confirmation"
                centered
                visible={visible}
                onOk={() => {
                    setButtonProcess(true)
                    approveLeave(
                        descType === "approve"
                            ? "approve"
                            : descType === "reject"
                                ? "reject"
                                : "delete",
                        descId
                    )
                    setVisible(false)
                }}
                onCancel={() => {
                    setVisible(false)
                }}
                width={1000}
                okText={
                    buttonProcess
                        ? "Processing..."
                        : descType === "approve"
                            ? "Approve"
                            : descType === "reject"
                                ? "Reject"
                                : "Delete"
                }
                cancelText="Back"
                className={descType === "approve" ? "approve" : "reject"}
            >
                <>
                    <p
                        style={{
                            fontSize: `22px`,
                            color: `#333333`,
                            fontWeight: `600`,
                            margin: `30px 0`,
                        }}
                    >
                        Do you want to
                        {descType === "approve"
                            ? "Approve"
                            : descType === "reject"
                                ? "Reject"
                                : "Delete"}
                        ?
                    </p>
                </>
            </Modal>
        </BoardContainer>
    )
}
export default LeaveRequests;
