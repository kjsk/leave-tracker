import React, { useEffect, useState } from "react"
import { EmployeeFormStyle } from "../Board/styles"
import {
  getPolicyDataAPI,
  getHeaders,
} from "../../utils/urls"
import axios from "axios"
import LeaveType from "../leavePopup/leave_type"
import { Dropdown } from "antd"

const AddEmployee = ({
  headers,
  name,
  Email,
  setName,
  setEMail,
  selectPolicy,
  setSelectPolicy,
  leaveType,
  setLeaveType,
  addUser,
  error,
  buttonProcess,
  checkValidation,
  setButtonProcess,
}) => {

  const [leaveArr, setLeaveArr] = useState([])
  const [leaveDrop, setLeaveDrop] = useState(false)
  const leaveFun = (e, label) => {
    setLeaveType({
      label: label,
      value: e,
    })
  }

  useEffect(() => {
    GetPolicyFun()
  }, [])
  // Get policy details Function
  const GetPolicyFun = () => {
    axios({
      url: getPolicyDataAPI(),
      method: "GET",
      headers: headers,
    })
      .then(res => {
        console.log("res?.data", res?.data)
        if (res?.data) {
          newAllowanceSet(res?.data)
        }
      })
      .catch(err => console.log("Error", err))
  }

  const newAllowanceSet = (arr) => {
    let tempArr = []
    if (arr?.length) {
      arr.map((item) => {
        tempArr.push({
          "label": item?.name,
          "value": item?.id
        })
      })
    }
    setLeaveArr(tempArr);
  }
  return (
    <EmployeeFormStyle>
      <div id="add_employee_main">
        <div id="employee_wrap">
          <div id="input_wrap">
            <label style={{ color: name?.length < 2 && error }} htmlFor="input">
              Employee Name*
            </label>
            <input
              type="text"
              value={name}
              placeholder="Employee Name"
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div id="input_wrap">
            <label
              style={{
                color: (Email < 5 || !/\S+@\S+\.\S+/.test(Email)) && error,
              }}
              htmlFor="input"
            >
              Email*
            </label>
            <input
              type="text"
              value={Email}
              placeholder="user@fidisys.com"
              onChange={e => setEMail(e.target.value)}
            />
          </div>
          <div id="input_wrap">
            <label style={{ color: name?.length < 2 && error }} htmlFor="input">
              Select policy*
            </label>
            <Dropdown
              overlay={
                <LeaveType
                  leaveFun={leaveFun}
                  setLeaveDrop={setLeaveDrop}
                  userDataMain={leaveArr}
                />
              }
              placement="bottomLeft"
              trigger={["click"]}
              visible={leaveDrop}
            >
              <input
                type="text"
                value={leaveType?.label}
                placeholder="user@fidisys.com"
                onClick={() => setLeaveDrop(!leaveDrop)}
              />
            </Dropdown>
          </div>
          {name?.length < 2 ||
            Email?.length < 5 ||
            !/\S+@\S+\.\S+/.test(Email) ? (
            <button
              onClick={() => checkValidation()}
              style={{ background: `gray` }}
            >
              Continue
            </button>
          ) : (
            <button
              onClick={() => {
                setButtonProcess(true)
                addUser(name, Email, leaveType, null)
              }}
              style={{ background: buttonProcess && `gray` }}
            >
              {buttonProcess ? "Processing..." : "Continue"}
            </button>
          )}
        </div>
      </div>
    </EmployeeFormStyle>
  )
}

export default AddEmployee
