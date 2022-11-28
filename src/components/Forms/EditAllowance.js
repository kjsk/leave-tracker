import React from "react"
import { AddAllowancePopStyles } from "../Allowance/styles"
import { Switch } from "antd"
import DropDownCompo from "../DropDown"

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
  leaveTypes,
  dropVal,
  setDropVal,
  setCreateLeavePop,
}) => {


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
              <DropDownCompo
                arrayData={leaveTypes}
                dropVal={dropVal}
                setDropVal={setDropVal}
                index={1}
                setCreateLeavePop={setCreateLeavePop}
                setValFun={(value) => SetType(value)}
                editvalue={type}
              />
            </div>
          </div>
          <div id="employee_wrap_policy">
            <div id="input_wrap">
              <label htmlFor="input">No of Days</label>
              <input
                type="number"
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
                value={status && !(limit > days) && !(limit < 0) ? limit : 0}
                onChange={e => SetLimit(e.target.value)}
                disabled={!status}
              />
            </div>
            <div id="input_wrap" className="input_wrap">
              <label htmlFor="input">Allow Max Limit</label>
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
