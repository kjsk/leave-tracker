import React, { useEffect, useState } from "react"
import { CreateAllowancePopStyles } from "./styles"
import { Switch, Dropdown } from "antd"
import { PlusCircleOutlined, MinusOutlined } from "@ant-design/icons"
import LeaveType from "../leavePopup/leave_type"
import { monthData } from "../../utils/mockdata"
import { getAllLeaveTypesAPI, getHeaders } from "../../utils/urls"
import axios from "axios"

const CreateAllowancePop = (props) => {
  const {
    container,
    AddContainer,
    RemoveContainer,
    editContainerFun,
    setNewPolicyName,
    setStartMonth,
    setStartMonthOpen,
    startMonthObj,
    setEndMonth,
    endMonthObj
  } = props;


  const userData =
    typeof localStorage !== "undefined" &&
    JSON.parse(localStorage.getItem("userData")) // FETCHING USER STORED DATA

  // common headers
  const headers = getHeaders(userData?.tokens?.accessToken)


  useEffect(() => {
    getAllLeaveTypes()
  }, [])


  const [leaveTypes, setLeaveTypes] = useState([])
  const [leaveDrop, setLeaveDrop] = useState(false)

  const getAllLeaveTypes = () => {
    axios({
      url: getAllLeaveTypesAPI(),
      method: "GET",
      headers: headers
    }).then((res) => {
      console.log("res", res)
      setLeaveTypes(res?.data)
    }).catch((err) => {
      console.log("Error", err)
    })
  }


  const leaveFun = (e, label) => {
    // setLeaveType({
    //   label: label,
    //   value: e,
    // })
  }

  // const [typeOpen, setTypeOpen] = useState(false)



  return (
    <CreateAllowancePopStyles>
      <button onClick={() => getAllLeaveTypes()}>Click me</button>
      <div id="add_employee_main">
        <div id="employee_wrap">
          <div id="input_wrap">
            <label htmlFor="input">Policy name</label>
            <input type="text" placeholder="Policy name"
              onChange={(e) => setNewPolicyName(e.target.value)}
            />
          </div>
        </div>
        <div id="employee_wrap">
          <div id="input_wrap">
            <label htmlFor="input">Start Month</label>
            <Dropdown overlay={
              <LeaveType
                leaveFun={setStartMonth}
                setLeaveDrop={setStartMonthOpen}
                userDataMain={monthData}
              />
            } trigger={['click']} placement="bottomLeft">
              <input type="text" value={startMonthObj?.label} placeholder="Start Month" />
            </Dropdown>
          </div>
          <div id="input_wrap">
            <label htmlFor="input">End month</label>
            <Dropdown overlay={
              <LeaveType
                leaveFun={setEndMonth}
                setLeaveDrop={setStartMonthOpen}
                userDataMain={monthData}
              />
            } trigger={['click']} placement="bottomLeft">
              <input type="text" value={endMonthObj?.label} placeholder="End month" />
            </Dropdown>
          </div>
        </div>

        {container?.map((item, index) => {
          return (
            <div id="add_allowance_container" key={index}>
              {index > 0 && (
                <div className="btn_container">
                  <button
                    className="remove_allowance_btn"
                    onClick={() => RemoveContainer(item)}
                  >
                    <MinusOutlined style={{ margin: `0 10px 0 0 ` }} />
                    Remove Allowance
                  </button>
                </div>
              )}
              <div id="employee_wrap">
                <div id="input_wrap">
                  <label htmlFor="input">Allowance name</label>
                  <input
                    value={item?.name}
                    type="text" placeholder="Allowance name"
                    onChange={(e) => {
                      editContainerFun(index, "name", e.target.value)
                    }} />
                </div>
                <div id="input_wrap">
                  <label htmlFor="input">Leave Type</label>
                  <select onChange={(e) => editContainerFun(index, 'type', e.target.value)}>
                    {leaveTypes?.map((item) =>
                      <option value={item?.value}>{item?.label}</option>
                    )}
                  </select>
                  {/* <input type="text"
                    value={item?.type}
                    placeholder="Type"
                    onChange={(e) => editContainerFun(index, 'type', e.target.value)} /> */}
                </div>
              </div>
              <div id="employee_wrap_policy">
                <div id="input_wrap">
                  <label htmlFor="input">No of Days</label>
                  <input type="text"
                    value={item?.days}
                    placeholder="No of Days"
                    onChange={(e) => editContainerFun(index, 'days', e.target.value)}
                  />
                </div>
                <div id="input_wrap">
                  <label htmlFor="input">Max Limit</label>
                  <input type="text"
                    value={item?.limitToggle ? item?.maxLimit : 0}
                    placeholder="Max Limit"
                    onChange={(e) => editContainerFun(index, 'maxLimit', e.target.value)}
                  />
                </div>
                <div id="input_wrap" className="input_wrap">
                  <label htmlFor="input">Max Limit</label>
                  <Switch
                    checked={item?.limitToggle}
                    onChange={(e) => editContainerFun(index, "limitToggle", e)}
                    className="switch"
                  />
                </div>
              </div>

              <div id="employee_wrap" className="employee_wrap_description">
                <div id="input_wrap">
                  <label htmlFor="input">Description</label>
                  <textarea type="text"
                    value={item?.description}
                    placeholder="Description"
                    onChange={(e) => editContainerFun(index, "description", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )
        })}
        <div className="btn_container">
          <button id="add_allowance_btn" onClick={() => AddContainer()}>
            <PlusCircleOutlined style={{ margin: `0 10px 0 0 ` }} />
            Add Allowance
          </button>
        </div>
      </div>
    </CreateAllowancePopStyles>
  )
}
export default CreateAllowancePop
