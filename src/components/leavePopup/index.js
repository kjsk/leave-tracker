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
import { getAllowanceByUser } from "../../utils/urls"
import { openNotificationWithIcon } from "../../utils/functions";

const SideModal = ({
  setPopup,
  headers,
  userDataMain,
  setUserLeaveData,
  playAudio,
  setButtonProcess,
  buttonProcess,
  allowanceDrop,
  setAllowanceDrop
}) => {
  const { RangePicker } = DatePicker

  const [pushTime, setPushTime] = useState([]);

  const [allowanceType, setAllowanceType] = useState({ label: "", value: "" });

  const [userAllowanceObj, setUserAllowanceObj] = useState([]);


  // const [leavePer, setLeavePer] = useState("First Half");;

  const [reason, setReason] = useState("");
  const [dayCount, setDayCount] = useState(0);

  const onChange = date => {
    setPushTime(date);
  }

  // Date disable function
  const disabledDate = current => {
    const newVar = new Date();
    const modDate = moment(newVar).subtract(1, "days");
    return (
      modDate > current.valueOf() || current.day() === 0 || current.day() === 6
    )
  }

  const allowanceFun = (e, label) => {
    setAllowanceType({
      label: label,
      value: e,
    });
  };

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

  const createLeave = (allowanceType, pushTime, reason) => {
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
        allowanceId: allowanceType?.value,
        days: daysCalc(),
      },
      headers: headers,
    }).then((res) => {
      openNotificationWithIcon(
        `success`,
        `Your Leave Request submitted successfully`
      )
      getLeaves()
      setReason("")
      setPopup(false)
      setButtonProcess(false)
      setAllowanceType({
        label: "",
        value: "",
      })
      playAudio()
      setPushTime([])
    }).catch((err) => {
      openNotificationWithIcon(`error`, err?.response?.data?.message)
      getLeaves()
      setButtonProcess(false)
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

  useEffect(() => {
    GetAllowanceTypes(userDataMain?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const GetAllowanceTypes = (userId) => {
    axios({
      url: getAllowanceByUser(userId),
      method: "GET",
      headers: headers,
    }).then((res) => {

      if (res?.data) {
        const newDataArr = res?.data;
        console.log("res", newDataArr?.allowances)
        ArrSetFun(newDataArr?.allowances)
      }
    }).catch((err) => {
      console.log("Error", err)
    })
  }

  // Arr values set Function
  const ArrSetFun = (arr) => {
    if (arr?.length) {
      let tempArr = []
      arr.forEach((item) => {
        tempArr.push({
          label: item?.name,
          value: item?.id
        })
      })
      setUserAllowanceObj(tempArr)
    }
  }

  const submitDisFun = () => {
    let tempVar;
    if (pushTime && daysCalc() &&
      reason.length > 5 &&
      allowanceType?.label !== "") {
      tempVar = true
    } else {
      tempVar = false
    }
    return tempVar
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
        {/* Allowance type dropdown */}
        <Dropdown
          overlay={
            <LeaveType
              leaveFun={allowanceFun}
              setLeaveDrop={setAllowanceDrop}
              userDataMain={userAllowanceObj}
            />
          }
          placement="bottomLeft"
          trigger={["click"]}
          visible={allowanceDrop}
        >
          <div
            id="name_block"
            onClick={() => {
              setAllowanceDrop(!allowanceDrop)
            }}
            role="presentation"
          >
            <img src={leave_type} alt="img" />
            <input
              type="text"
              value={allowanceType?.label}
              id="input"
              placeholder="Select Allowance type"
              autoComplete="off"
            />
          </div>
        </Dropdown>
        <div
          id="name_block"
          onClick={() => {
            setAllowanceDrop(false);
            setAllowanceDrop(false)
          }}
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
              setAllowanceDrop(false);
              setAllowanceDrop(false);
            }}
          >
            Cancel
          </button>
          <button
            style={{
              background: submitDisFun() ? "#3751FF" : "gray",
              color: "white",
              cursor: submitDisFun() ? "pointer" : "not-allowed"
            }}
            onClick={() => {
              createLeave(allowanceType, pushTime, reason)
              setAllowanceDrop(false);
              setAllowanceDrop(false);
            }}
            disabled={submitDisFun() ? false : true}
          >
            {buttonProcess ? "Processing..." : "Submit"}
          </button>
        </div>
      </div>
    </PopupContainer >
  )
}
export default SideModal
