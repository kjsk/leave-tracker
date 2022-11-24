import React, { useEffect, useState } from "react"
import { AddAllowancePopStyles } from "./styles"
import { Switch } from "antd"
import { PlusCircleOutlined } from "@ant-design/icons"
import axios from "axios"
import { getAllLeaveTypesAPI, getHeaders } from "../../utils/urls"

const AddAllowancePop = ({
  container,
  setContainer,
  allowancename,
  allowancetype,
  allowancedays,
  allowancelimit,
  allowancelimitStatus,
  allowanceDescription,
  setAllowanceName,
  SetAllowanceType,
  SetAllowanceDays,
  SetAllowanceLimit,
  SetAllowanceLimitStatus,
  SetAllowanceDescription,
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
                value={allowancename}
                onChange={e => setAllowanceName(e.target.value)}
              />
            </div>
            <div id="input_wrap">
              <label htmlFor="input">Type</label>
              <select onChange={(e) => SetAllowanceType(e.target.value)}>
                {leaveTypes?.map((item) =>
                  <option value={item?.value}>{item?.label}</option>
                )}
              </select>
              {/* <input
                type="text"
                placeholder="Type"
                value={allowancetype}
                onChange={e => SetAllowanceType(e.target.value)}
              /> */}
            </div>
          </div>
          <div id="employee_wrap_policy">
            <div id="input_wrap">
              <label htmlFor="input">No of Days</label>
              <input
                type="text"
                placeholder="No of Days"
                value={allowancedays}
                onChange={e => SetAllowanceDays(e.target.value)}
              />
            </div>
            <div id="input_wrap">
              <label htmlFor="input">Max Limit</label>
              <input
                type="number"
                placeholder="Max Limit"
                value={allowancelimitStatus ? allowancelimit : 0}
                onChange={e =>
                  SetAllowanceLimit(e.target.value >= 1 && e.target.value)
                }
                disabled={!allowancelimitStatus}
              />
            </div>
            <div id="input_wrap" className="input_wrap">
              <label htmlFor="input">Max Limit</label>
              <Switch
                defaultChecked
                onChange={e => SetAllowanceLimitStatus(e)}
                className="switch"
              />
            </div>
          </div>

          <div id="employee_wrap" className="employee_wrap_description">
            <div id="input_wrap">
              <label htmlFor="input">Description</label>
              <textarea
                type="text"
                value={allowanceDescription}
                placeholder="Description"
                onChange={e => SetAllowanceDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </AddAllowancePopStyles>
  )
}
export default AddAllowancePop
