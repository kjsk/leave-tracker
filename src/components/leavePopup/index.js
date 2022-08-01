import React, { useState } from "react"
import { PopupContainer } from "./styles"
import user from "../../data/assets/user.svg"
import leave_type from "../../data/assets/leave_type.svg"
import cal from "../../data/assets/pop_Calendar.svg"
import Edit from "../../data/assets/Edit.svg"
import { DatePicker, Dropdown, Popover, message } from "antd"
import moment from "moment"
import Leave from "./leave"
import LeaveType from "./leave_type"

const SideModal = ({ setPopup }) => {
  const setLocal = typeof localStorage

  const { RangePicker } = DatePicker

  const [size, setSize] = useState("")

  console.log(size)

  const [pushTime, setPushTime] = useState(false)

  const [leaveType, setLeaveType] = useState("Paid Leave")

  const [leavePer, setLeavePer] = useState("First Half")

  const [reason, setReason] = useState("")

  console.log(leaveType)

  const onChange = date => {
    setSize(date)
    setPushTime(date)
  }

  const leaveFun = e => {
    setLeaveType(e)
  }
  const success = () => {
    message.success("Your Leave Request submitted successfully")
  }

  const error = () => {
    message.error("Try again")
  }

  const pushData = (leaveType, pushTime, reason) => {
    if (setLocal !== `undefined`) {
      let leave_records = []
      leave_records = JSON.parse(localStorage.getItem("leave_records"))
        ? JSON.parse(localStorage.getItem("leave_records"))
        : []
      leave_records.push({
        leaveType: leaveType,
        from: pushTime[0].format("MMM Do, YY - LT"),
        to: pushTime[1].format("MMM Do, YY - LT"),
        reason: reason,
      })
      localStorage.setItem("leave_records", JSON.stringify(leave_records))

      const getData = localStorage.getItem("leave_records")

      if (getData) {
        setSize()
        setPushTime()
        setLeaveType("Paid Leave")
        setLeavePer("First Half")
        setReason("")
        setPopup(false)
        success()
      } else {
        error()
      }
    }
  }

  return (
    <PopupContainer>
      <div id="popup">
        <h1>Apply for Leave</h1>
        <div id="name_block">
          <img src={user} alt="img" />
          <p>Vignesh</p>
        </div>
        <div id="name_block">
          <img src={cal} alt="img" />
          <p>
            <RangePicker onChange={onChange} />
            {size ? (
              <>
                {size?.map((date, i) => (
                  <span id="dateSpan">
                    {date.format("MMM Do, YY")}{" "}
                    <span id="toSpan">{i === 0 ? "TO" : ""}</span>
                  </span>
                ))}
              </>
            ) : (
              <span>{moment().format("MMM Do, YY")}</span>
            )}

            <span id="span"></span>
            <Popover
              placement="bottomRight"
              content={<Leave setLeavePer={setLeavePer} />}
              style={{ position: "relative" }}
            >
              {leavePer}
            </Popover>
          </p>
        </div>
        <Dropdown
          overlay={<LeaveType leaveFun={leaveFun} />}
          placement="bottomLeft"
        >
          <div id="name_block">
            <img src={leave_type} alt="img" />
            <input
              type="text"
              value={leaveType}
              id="input"
              placeholder="Select leave type"
            />
          </div>
        </Dropdown>
        <div id="name_block">
          <img src={Edit} alt="img" />
          <textarea
            id="textarea"
            value={reason}
            placeholder="Add reason for leave (optional)"
            onChange={e => setReason(e.target.value)}
          />
        </div>
        <div id="buttons">
          <button
            style={{
              color: "#3751FF",
              border: "1px solid #3751FF",
              cursor: `pointer`,
            }}
            onClick={() => setPopup(false)}
          >
            Cancel
          </button>
          {size === "" || reason.length < 5 ? (
            <button
              style={{ background: "gray", color: "white", cursor: `pointer` }}
              disabled
            >
              Submit
            </button>
          ) : (
            <button
              style={{
                background: "#3751FF",
                color: "white",
                cursor: `pointer`,
              }}
              onClick={() => pushData(leaveType, pushTime, reason)}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </PopupContainer>
  )
}
export default SideModal
