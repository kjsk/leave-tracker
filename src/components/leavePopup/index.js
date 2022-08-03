import React, { useState } from "react"
import { PopupContainer } from "./styles"
import axios from 'axios';
import user from "../../data/assets/user.svg"
import leave_type from "../../data/assets/leave_type.svg"
import cal from "../../data/assets/pop_Calendar.svg"
import Edit from "../../data/assets/Edit.svg"
import { DatePicker, Dropdown, message } from "antd"
import LeaveType from "./leave_type"

const SideModal = ({ setPopup, headers, getLeaves, userDataMain, setActiveLoader, playAudio }) => {

  const { RangePicker } = DatePicker

  const [size, setSize] = useState("")

  console.log(size)

  const [pushTime, setPushTime] = useState(false);

  const [leaveType, setLeaveType] = useState("");

  // const [leavePer, setLeavePer] = useState("First Half");

  const [reason, setReason] = useState("");
  const [LeaveDrop, setLeaveDrop] = useState(false);


  const onChange = date => {
    setSize(date);
    setPushTime(date);
  }

  const leaveFun = e => {
    setLeaveType(e)
    console.log('leaveFun', e)
  }

  const createLeave = (leaveType, pushTime, reason) => {
    setPopup(false);
    setActiveLoader(true);
    axios({
      method: 'POST',
      url: `https://fidisyslt.herokuapp.com/api/v2/leaves`,
      data: {
        startDate: pushTime[0].format("MM-DD-YYYY"),
        endDate: pushTime[1].format("MM-DD-YYYY"),
        reason: reason,
        type: leaveType,
        days: 2
      },
      headers: headers
    }).then((_res) => {
      getLeaves();
      setReason("");
      setPushTime(false);
      playAudio();
      message.success("Your Leave Request submitted successfully");
    }).catch((_err) => {
      getLeaves();
      setPopup(false);
      setReason("");
      setPushTime(false);
      setActiveLoader(false);
      message.error("Your leave request failed");
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
        <div id="name_block">
          <img src={cal} alt="img" />
          <p>
            <RangePicker onChange={onChange} />
            {/* <span id="span"></span>
            <Popover
              placement="bottomRight"
              content={<Leave setLeavePer={setLeavePer} />}
              style={{ position: "relative" }}
            >
              {leavePer}
            </Popover> */}
          </p>
        </div>
        <Dropdown
          overlay={<LeaveType leaveFun={leaveFun} setLeaveDrop={setLeaveDrop} />}
          placement="bottomLeft"
          trigger={['click']}
          visible={LeaveDrop}
        >
          <div id="name_block" onClick={() => setLeaveDrop(!LeaveDrop)} role='presentation'>
            <img src={leave_type} alt="img" />
            <input
              type="text"
              value={leaveType === 'gen' ? 'Paid Leave' : leaveType === 'cos' ? 'Cassual Leave' : ''}
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
            onClick={() => setPopup(false)}
          >
            Cancel
          </button>
          <button
            style={{
              background: pushTime && reason.length > 5 ? '#3751FF' : 'gray',
              color: "white",
            }}
            onClick={() => { createLeave(leaveType, pushTime, reason) }}
            disabled={pushTime && reason.length > 5 ? false : true}
          >
            Submit
          </button>
        </div>
      </div>
    </PopupContainer>
  )
}
export default SideModal
