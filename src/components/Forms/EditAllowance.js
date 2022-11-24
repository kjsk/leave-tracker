import React, { useEffect, useState } from "react"
import { AddAllowancePopStyles } from "../Allowance/styles"
import { Switch } from "antd"
import axios from "axios"
import { getAllLeaveTypesAPI, getHeaders } from "../../utils/urls"

const EditAllowance = ({
  name,
  setName,
  type,
  SetType,
  days,
  SetDays,
  limit,
  SetLimit,
  status,
  SetStatus,
}) => {


  const userData =
    typeof localStorage !== "undefined" &&
    JSON.parse(localStorage.getItem("userData")) // FETCHING USER STORED DATA
  const onChange = checked => {
    console.log(`switch to ${checked}`)
  }

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

  return (
    <AddAllowancePopStyles>
      <div id="add_employee_main">
        <div id="add_allowance_container">
          <div id="employee_wrap">
            <div id="input_wrap">
              <label htmlFor="input">Allowance name</label>
              <input
                type="text"
                placeholder="Allowance name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div id="input_wrap">
              <label htmlFor="input">Type</label>
              <select onChange={(e) => SetType(e.target.value)}>
                {leaveTypes?.map((item) =>
                  <option value={item?.value}>{item?.label}</option>
                )}
              </select>
              {/* <input
                type="text"
                placeholder="Type"
                value={type}
                onChange={e => SetType(e.target.value)}
              /> */}
            </div>
          </div>
          <div id="employee_wrap_policy">
            <div id="input_wrap">
              <label htmlFor="input">No of Days</label>
              <input
                type="text"
                placeholder="No of Days"
                value={days}
                onChange={e => SetDays(e.target.value)}
              />
            </div>
            <div id="input_wrap">
              <label htmlFor="input">Max Limit</label>
              <input
                type="number"
                placeholder="Max Limit"
                value={status ? limit : 0}
                onChange={e => SetLimit(e.target.value >= 1 && e.target.value)}
                disabled={!status}
              />
            </div>
            <div id="input_wrap" className="input_wrap">
              <label htmlFor="input">Max Limit</label>
              <Switch
                checked={status}
                onChange={e => SetStatus(e)}
                className="switch"
              />
            </div>
          </div>
        </div>
      </div>
    </AddAllowancePopStyles>
  )
}
export default EditAllowance
