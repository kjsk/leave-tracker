import React, { useState } from "react"
import { EditUserFormStyle } from "../Board/styles"

const EditAllowance = ({
  editAllowanceData,
  editAllowanceObj,
  name,
  setName,
  type,
  SetType,
  days,
  SetDays,
  limit,
  SetLimit,
}) => {
  console.log("editAllowanceObjK", editAllowanceObj)
  return (
    <EditUserFormStyle>
      <div id="add_employee_main">
        <div id="employee_wrap">
          <div id="input_wrap">
            <label htmlFor="input">Allowance name</label>
            <input
              type="text"
              defaultValue={name}
              placeholder="Employee Name"
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div id="input_wrap">
            <label htmlFor="input">Type</label>
            <input
              type="text"
              defaultValue={type}
              placeholder="Designation"
              onChange={e => SetType(e.target.value)}
            />
          </div>
        </div>
        <div id="employee_wrap">
          <div id="input_wrap">
            <label htmlFor="input">No of Days</label>
            <input
              type="number"
              defaultValue={days}
              placeholder="Leave Used"
              onChange={e => SetDays(e.target.value)}
            />
          </div>
          <div id="input_wrap">
            <label htmlFor="input">Max Limit</label>
            <input
              type="number"
              defaultValue={limit}
              placeholder="Leave Left"
              onChange={e => SetLimit(e.target.value)}
            />
          </div>
        </div>
      </div>
    </EditUserFormStyle>
  )
}

export default EditAllowance
