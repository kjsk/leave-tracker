import React, { useEffect, useState, useRef } from "react"
import { BoardContainer } from "../components/Board/styles"
import { RedoOutlined } from "@ant-design/icons"
import { Popover, Drawer, Modal, notification } from "antd"
import SideModal from "../components/leavePopup/index"
import axios from "axios"
import { navigate } from "gatsby"
import NotificationSound from "../utils/notification.mp3"
import Avatar from "../components/Avatar/index"
import CompoLoader from "../components/ComponentLoader"
import AdminPortal from "../components/Board/AdminPortal"
import LeaveDetails from "../components/Forms/LeaveDetails"
import {
    getHeaders,
    baseURL,
    leavesAPI,
    userEditAPI,
    addUserAPI,
} from "../utils/urls"
import { nameProf } from "../utils/functions"
import SideBar from "../components/SideBar"

const Board = () => {
    const urlGlobal = baseURL // ADDING GLOBAL BASE URL
    const toggleRout =
        typeof localStorage !== "undefined" &&
        JSON.parse(localStorage.getItem("toggleRout"))
    const userData =
        typeof localStorage !== "undefined" &&
        JSON.parse(localStorage.getItem("userData")) // FETCHING USER STORED DATA
    const userDataMain = userData?.user

    const [popup, setPopup] = useState(false)
    const [sideToggle, setSideToggle] = useState(6)
    const [userLeaveData, setUserLeaveData] = useState([])
    const [activeLoader, setActiveLoader] = useState(false)
    const [adminToggle, setAdminToggle] = useState("all")
    const [visible, setVisible] = useState(false)
    const [barOpen, setbarOpen] = useState(true)
    const [leaveDetail, setLeaveDetail] = useState(false)
    const [leaveDetailContent, setLeaveDetailContent] = useState("")
    const [descType, setDescType] = useState("")
    const [descId, setDescId] = useState("")
    const [logoutState, setLogoutState] = useState(false)
    const [deleteUserState, setdeleteUserState] = useState(false)
    const [userConform, setUserConform] = useState("")
    const [buttonProcess, setButtonProcess] = useState(false)
    const [LeaveDrop, setLeaveDrop] = useState(false)
    const [allowanceDrop, setAllowanceDrop] = useState(false)

    // common headers
    const headers = getHeaders(userData?.tokens?.accessToken)

    // FETCHING LEAVE ON PAGELOAD
    useEffect(() => {
        if (userData) {
            getLeaves()
        } else {
            logOut()
        }
        if (toggleRout) {
            setSideToggle(toggleRout)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const conditionalFun = number => {
        localStorage.setItem("toggleRout", number)
        setSideToggle(number)
    }

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
            localStorage.removeItem("toggleRout")
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
            url: `${urlGlobal}/api/v2/leaves${type !== "delete" ? "/" + type : ""
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

    // notification conformation sound function
    const audioPlayer = useRef(null)

    function playAudio() {
        audioPlayer.current.play()
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

    return (
        <BoardContainer>
            <audio ref={audioPlayer} src={NotificationSound}>
                <track
                    src="captions_es.vtt"
                    kind="captions"
                    srclang="es"
                    label="spanish_captions"
                />
            </audio>
            <div id="BoardContainer">
                <SideBar
                    barOpen={barOpen}
                    Popover={Popover}
                    sideToggle={sideToggle}
                    conditionalFun={conditionalFun}
                    userDataMain={userDataMain}
                    setbarOpen={setbarOpen}
                    setVisible={setVisible}
                    setLogoutState={setLogoutState}
                />
                <div
                    id="main_menu"
                    style={{ background: "#FCFAFA" }}
                >
                    <div id="header">
                        <h2 id="title">Admin Portal</h2>
                        <div id="mini_block">
                            {userDataMain?.role !== "admin" && (<button onClick={() => setPopup(true)}>Apply Leave</button>)}
                            <div id="mini_block_name">
                                <Avatar name={userDataMain?.name} nameProf={nameProf} />
                                <p id="name_main">
                                    {userDataMain?.name}
                                    <span>{userDataMain?.role}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* ADMIN & USER PORTAL */}
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
                    setLeaveDrop(false)
                    setAllowanceDrop(false)
                }}
                width="fit-content"
            >
                <SideModal
                    setLeaveDrop={setLeaveDrop}
                    LeaveDrop={LeaveDrop}
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

            {/* LEAVE ACTION TAKEN POPUP (APPROVE, REJECT, DELETE, User delete, Logout ) */}
            <Modal
                title="Confirmation"
                centered
                visible={visible}
                onOk={() => {
                    setButtonProcess(true)
                    logoutState
                        ? logOut()
                        : approveLeave(
                            descType === "approve"
                                ? "approve"
                                : descType === "reject"
                                    ? "reject"
                                    : "delete",
                            descId
                        )
                    setVisible(false)
                    setUserConform("")
                    setdeleteUserState(false)
                }}
                onCancel={() => {
                    setLogoutState(false)
                    setdeleteUserState(false)
                    setVisible(false)
                    setUserConform("")
                }}
                width={1000}
                okText={
                    buttonProcess
                        ? "Processing..."
                        : logoutState || deleteUserState
                            ? "Proceed"
                            : descType === "approve"
                                ? "Approve"
                                : descType === "reject"
                                    ? "Reject"
                                    : "Delete"
                }
                cancelText="Back"
                okButtonProps={{
                    disabled: deleteUserState && userConform !== deleteUserState?.name,
                    display: `none`,
                }}
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
                        {deleteUserState
                            ? `Do you want to delete ( ${deleteUserState?.name} )`
                            : "Do you want to " +
                            (logoutState
                                ? "Logout"
                                : descType === "approve"
                                    ? "Approve"
                                    : descType === "reject"
                                        ? "Reject"
                                        : "Delete")}
                        ?
                    </p>
                    {deleteUserState && (
                        <input
                            type="text"
                            placeholder="Type in the name of user to conform"
                            id="conform_user"
                            value={userConform}
                            onChange={e => setUserConform(e.target.value)}
                            autoComplete="off"
                            style={{
                                width: `100%`,
                                background: `#FFFFFF`,
                                borderRadius: `6px`,
                                height: `48px`,
                                margin: `0 0 20px 0`,
                                outlineColor: `#1874D2`,
                                paddingLeft: `12px`,
                                border: `1px solid #F3F3F4`,
                            }}
                        />
                    )}
                </>
            </Modal>
        </BoardContainer>
    )
}
export default Board
