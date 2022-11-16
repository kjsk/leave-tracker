import React from "react"
import { EditPolicyFormStyle } from "../Allowance/styles"

const EditPolicy = ({
  editPolicyName,
  setEditPolicyName,
  editPolicyDesc,
  setEditPolicyDesc,
}) => {
  return (
    <EditPolicyFormStyle>
      <div id="add_employee_main">
        <div id="employee_wrap">
          <div id="input_wrap">
            <label htmlFor="input">Policy Name*</label>
            <input
              type="text"
              value={editPolicyName}
              placeholder="Policy Name"
              onChange={e => setEditPolicyName(e.target.value)}
            />
          </div>
          <div id="input_wrap">
            <label htmlFor="input">Description*</label>
            <input
              type="text"
              value={editPolicyDesc}
              placeholder="Description"
              onChange={e => setEditPolicyDesc(e.target.value)}
            />
          </div>
        </div>
      </div>
    </EditPolicyFormStyle>
  )
}

export default EditPolicy
