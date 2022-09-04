import React from "react"
import { EditUserFormStyle } from "../Board/styles"

const EditUser = ({
  editUserPopDetails,
  empName,
  empDesignation,
  setEmpName,
  setEmpDesignation,
  setEmpUsed,
  setEmpLeft,
  checkValidation,
  setButtonProcess,
}) => {
  return (
    <EditUserFormStyle>
      <div id="add_employee_main">
        <div id="employee_wrap">
          <div id="input_wrap">
            <label htmlFor="input">Employee Name*</label>
            <input
              type="text"
              value={empName}
              placeholder="Employee Name"
              onChange={e => setEmpName(e.target.value)}
            />
          </div>
          <div id="input_wrap">
            <label htmlFor="input">Designation*</label>
            <input
              type="text"
              value={empDesignation}
              placeholder="Designation"
              onChange={e => setEmpDesignation(e.target.value)}
            />
          </div>
        </div>
        <div id="employee_wrap">
          <div id="input_wrap">
            <label htmlFor="input">No.of Leave Used</label>
            <input
              type="number"
              defaultValue={
                editUserPopDetails?.allowance?.cos?.used +
                editUserPopDetails?.allowance?.gen?.used
              }
              placeholder="Leave Used"
              onChange={e => setEmpUsed(e.target.value)}
              disabled
            />
          </div>
          <div id="input_wrap">
            <label htmlFor="input">No.of Leave Left</label>
            <input
              type="number"
              defaultValue={
                editUserPopDetails?.allowance?.cos?.remaining +
                editUserPopDetails?.allowance?.gen?.remaining
              }
              placeholder="Leave Left"
              onChange={e => setEmpLeft(e.target.value)}
              disabled
            />
          </div>
        </div>
      </div>
    </EditUserFormStyle>
  )
}

export default EditUser
