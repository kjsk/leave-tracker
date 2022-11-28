import React from "react"
import { AddAllowancePopStyles } from "../Allowance/styles"
import { Switch } from "antd"
import DropDownCompo from "../DropDown"

const AddAllowancePop = ({
  allowancename,
  allowancedays,
  allowancelimit,
  allowancelimitStatus,
  // allowanceDescription,
  setAllowanceName,
  SetAllowanceType,
  SetAllowanceDays,
  SetAllowanceLimit,
  SetAllowanceLimitStatus,
  // SetAllowanceDescription,
  leaveTypes,
  // setLeaveTypes,
  dropVal,
  setDropVal,
  setCreateLeavePop
}) => {


  return (
    <AddAllowancePopStyles>
      <div id="add_employee_main">
        <div id="add_allowance_container">
          <div id="employee_wrap">
            <div id="input_wrap">
              <label htmlFor="input">Allowance name*</label>
              <input
                type="text"
                placeholder="Allowance name"
                value={allowancename}
                onChange={e => setAllowanceName(e.target.value)}
              />
            </div>
            <div id="input_wrap">
              <label htmlFor="input">Type*</label>
              <DropDownCompo
                arrayData={leaveTypes}
                dropVal={dropVal}
                setDropVal={setDropVal}
                index={1}
                setCreateLeavePop={setCreateLeavePop}
                setValFun={(value) => SetAllowanceType(value)}
                editvalue=""
              />
            </div>
          </div>
          <div id="employee_wrap_policy">
            <div id="input_wrap">
              <label htmlFor="input">No of Days*</label>
              <input
                type="number"
                placeholder="No of Days"
                value={allowancedays}
                onChange={e => SetAllowanceDays(e.target.value)}
              />
            </div>
            <div id="input_wrap">
              <label htmlFor="input">Max Limit*</label>
              <input
                type="number"
                placeholder="Max Limit"
                value={allowancelimitStatus && !(allowancelimit > allowancedays) ? allowancelimit : 0}
                onChange={e =>
                  SetAllowanceLimit(e.target.value >= 1 && e.target.value)
                }
                disabled={!allowancelimitStatus}
              />
            </div>
            <div id="input_wrap" className="input_wrap">
              <label htmlFor="input">Allow Max Limit*</label>
              <Switch
                defaultChecked
                onChange={e => SetAllowanceLimitStatus(e)}
                className="switch"
              />
            </div>
          </div>
        </div>
      </div>
    </AddAllowancePopStyles>
  )
}
export default AddAllowancePop
