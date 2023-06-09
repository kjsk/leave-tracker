import React, { useEffect, useState } from "react"
import { PopupContainer } from "./styles"
import axios from "axios"
import user from "../../data/assets/user.svg"
import leave_type from "../../data/assets/leave_type.svg"
import cal from "../../data/assets/pop_Calendar.svg"
import Edit from "../../data/assets/Edit.svg"
import { DatePicker, Dropdown, Badge } from "antd"
import LeaveType from "./leave_type"
import { baseURL, leavesAPI } from "../../utils/urls"
import moment from "moment"

const SideModal = ({
  setLeaveDrop,
  LeaveDrop,
  setPopup,
  headers,
  userDataMain,
  setUserLeaveData,
  activeLoader,
  setActiveLoader,
  playAudio,
  setButtonProcess,
  buttonProcess,
  openNotificationWithIcon,
}) => {
  const { RangePicker } = DatePicker

  const [pushTime, setPushTime] = useState([])

  const [leaveType, setLeaveType] = useState({ label: "", value: "" })

  // const [leavePer, setLeavePer] = useState("First Half");

  const [reason, setReason] = useState("")
  const [dayCount, setDayCount] = useState(0)

  const onChange = date => {
    setPushTime(date)
  }

  // Date disable function
  const disabledDate = current => {
    const newVar = new Date()
    const modDate = moment(newVar).subtract(1, "days")
    return (
      modDate > current.valueOf() || current.day() === 0 || current.day() === 6
    )
  }
  const leaveFun = (e, label) => {
    setLeaveType({
      label: label,
      value: e,
    })
  }
  const daysCalc = () => {
    let Difference_In_Time = pushTime
      ? new Date(pushTime[1]).getTime() - new Date(pushTime[0]).getTime()
      : ""
    const newvAR = Difference_In_Time / (1000 * 3600 * 24)
    const newDays = newvAR + 1 === newvAR ? newvAR : newvAR + 1
    console.log("newDays", newDays)
    const newDayName =
      pushTime &&
      ((pushTime[0]?.format("dddd") === "Monday" && newDays > 5) ||
        (pushTime[0]?.format("dddd") === "Tuesday" && newDays > 4) ||
        (pushTime[0]?.format("dddd") === "Wednesday" && newDays > 3) ||
        (pushTime[0]?.format("dddd") === "Thursday" && newDays > 2) ||
        (pushTime[0]?.format("dddd") === "Friday" && newDays > 1))
        ? newDays - 2
        : newDays
    return newDayName
  }

  useEffect(() => {
    if (pushTime) {
      setDayCount(daysCalc())
    } else {
      setDayCount(0)
    }
    // eslint-disable-next-line
  }, [pushTime])

  const createLeave = (leaveType, pushTime, reason) => {
    setButtonProcess(true)
    axios({
      method: "POST",
      url: `${baseURL}/api/v2/leaves`,
      data: {
        startDate: pushTime[0]?.format("MM-DD-YYYY"),
        endDate: pushTime[1]?.format("MM-DD-YYYY"),
        startStamp: pushTime[0],
        endStamp: pushTime[1],
        reason: reason,
        type: leaveType?.value,
        days: daysCalc(),
      },
      headers: headers,
    })
      .then(_res => {
        getLeaves()
        setReason("")
        setPopup(false)
        setButtonProcess(false)
        setLeaveType({
          label: "",
          value: "",
        })
        playAudio()
        setPushTime([])
        openNotificationWithIcon(
          `success`,
          `Your Leave Request submitted successfully`
        )
      })
      .catch(err => {
        getLeaves()
        setButtonProcess(false)
        openNotificationWithIcon(`error`, err?.response?.data?.message)
      })
  }
  // Call to fetch the number of leaves by user
  const getLeaves = () => {
    axios({
      method: "GET",
      url: leavesAPI(),
      headers: headers,
    })
      .then(res => {
        setUserLeaveData(res?.data)
      })
      .catch(_err => {
        console.log("Error", _err)
      })
  }

  return (
    <PopupContainer>
      <div id="popup">
        <h1>Apply for Leave</h1>
        <div id="name_block">
          <img src={user} alt="img" />
          <p>{userDataMain?.name}</p>
        </div>
        <Badge.Ribbon text={`${daysCalc() ? "Days: " + dayCount : ""}`}>
          <div id="name_block">
            <img src={cal} alt="img" />
            <p>
              <RangePicker
                onChange={onChange}
                value={pushTime}
                disabledDate={disabledDate}
              />
            </p>
          </div>
        </Badge.Ribbon>
        <Dropdown
          overlay={
            <LeaveType
              leaveFun={leaveFun}
              setLeaveDrop={setLeaveDrop}
              userDataMain={userDataMain?.allowance?.leaveTypes}
            />
          }
          placement="bottomLeft"
          trigger={["click"]}
          visible={LeaveDrop}
        >
          <div
            id="name_block"
            onClick={() => setLeaveDrop(!LeaveDrop)}
            role="presentation"
          >
            <img src={leave_type} alt="img" />
            <input
              type="text"
              value={leaveType?.label}
              id="input"
              placeholder="Select leave type"
              autoComplete="off"
            />
          </div>
        </Dropdown>
        <div
          id="name_block"
          onClick={() => setLeaveDrop(false)}
          role="presentation"
        >
          <img src={Edit} alt="img" />
          <textarea
            id="textarea"
            value={reason}
            placeholder="Add reason for leave..."
            onChange={e => {
              setReason(e.target.value)
            }}
          />
        </div>
        <div id="buttons">
          <button
            onClick={() => {
              setPopup(false)
              setLeaveDrop(false)
            }}
          >
            Cancel
          </button>
          <button
            style={{
              background:
                pushTime &&
                daysCalc() &&
                reason.length > 5 &&
                leaveType?.label !== ""
                  ? "#3751FF"
                  : "gray",
              color: "white",
            }}
            onClick={() => {
              createLeave(leaveType, pushTime, reason)
              setLeaveDrop(false)
            }}
            disabled={
              pushTime &&
              daysCalc() &&
              reason.length > 5 &&
              leaveType?.label !== ""
                ? false
                : true
            }
          >
            {buttonProcess ? "Process..." : "Submit"}
          </button>
        </div>
      </div>
    </PopupContainer>
  )
}
export default SideModal
