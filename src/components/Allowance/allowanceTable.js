import React, { useEffect, useState } from "react"
import Edit_user from "../../data/assets/Edit_user.svg"
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons"
import EditAllowance from "../Forms/EditAllowance"
import { Modal } from "antd"
import axios from "axios"
import {
  getPolicyDataAPI,
  getAllowanceByPolicy,
  updateAllowanceAPI,
  getHeaders,
  deleteAllowanceAPI,
} from "../../utils/urls"
import { AllowanceTableViewStyles } from "./styles"
import AddAllowancePop from "./addAllowancePop"

const AllowanceTableView = ({
  policyDataObj,
  policyName,
  setOpenAllowance,
}) => {
  const [editAllowancePop, setEditAllowancePop] = useState(false)
  const [allowanceData, setAllowanceData] = useState([])

  const [editAllowanceData, setEditAllowanceData] = useState({})
  const [editAllowanceObj, setEditAllowanceObj] = useState({
    amount: 6,
    name: "casual Leave Allowance 8",
    maxLimit: true,
    type: "CL",
    maxLimitAmount: 3,
  })

  const [name, setName] = useState("")
  const [type, SetType] = useState("")
  const [days, SetDays] = useState("")
  const [limit, SetLimit] = useState("")
  const [addAllowancePop, setAddAllowancePop] = useState("")

  let localToken =
    typeof localStorage !== "undefined" &&
    JSON.parse(localStorage.getItem("userData"))
  const headers = getHeaders(localToken?.tokens?.accessToken)

  useEffect(() => {
    OpenPolicy(policyDataObj)
  }, [])

  const OpenPolicy = policyId => {
    console.log("policyIdpolicyId", policyId)
    axios({
      url: getAllowanceByPolicy(policyId),
      method: "GET",
      headers: headers,
    })
      .then(res => {
        if (res?.data) {
          setAllowanceData(res?.data)
        }
      })
      .catch(err => console.log("Error", err))
  }

  console.log("allowanceData", allowanceData)

  // Set data for Edit allowance
  const EditAllowanceFun = item => {
    setEditAllowancePop(true)
    setEditAllowanceData(item)
    setEditAllowanceObj({
      amount: item?.amount,
      name: item?.name,
      maxLimit: true,
      type: item?.type,
      maxLimitAmount: item?.maxLimit,
    })
    setName(item?.name)
    SetType(item?.type)
    SetDays(item?.amount)
    SetLimit(item?.maxLimit)
  }

  const Updatedata = (policyId, item) => {
    axios({
      url: updateAllowanceAPI(policyId, item?.id),
      method: "PATCH",
      headers: headers,
      data: {
        amount: days || item?.amount,
        name: name || item?.name,
        maxLimit: true,
        type: type || item?.type,
        maxLimitAmount: limit || item?.maxLimit,
      },
    })
      .then(res => {
        if (res?.data) {
          setName("")
          setEditAllowancePop(false)
          setAllowanceData(res?.data)
          OpenPolicy(policyId)
        }
      })
      .catch(err => console.log("Error", err))
  }

  const DeleteAPIFun = (policyId, allowanceId) => {
    axios({
      url: deleteAllowanceAPI(policyId, allowanceId),
      method: "DELETE",
      headers: headers,
    })
      .then(res => {
        console.log("res", res)
        OpenPolicy(policyId)
      })
      .catch(err => console.log("Error", err))
  }
  return (
    <AllowanceTableViewStyles>
      <div id="admin_home">
        <div id="admin" className="admin">
          <div className="allowance_btn_container">
            <h3 style={{ display: "flex", fontSize: "1vw", cursor: "pointer" }}>
              <span onClick={() => setOpenAllowance(false)}>
                Leave Policy /
              </span>
              <span style={{ fontWeight: "bold", marginLeft: "0.4vw" }}>
                {" "}
                {policyName}
              </span>
            </h3>
            <div className="btn_container">
              <button id="add_allowance_btn">
                <PlusCircleOutlined style={{ margin: `0 10px 0 0 ` }} />
                Add Allowance
              </button>
            </div>
          </div>
          <div id="message">
            <div id="message_block1">
              <h3>SNo</h3>
              <h3>Allowance</h3>
              <h3>Allowance Type</h3>
              <h3>Amount</h3>
              <h3>Max Limit</h3>
              <h3>Action</h3>
            </div>
            <div id="message_block2">
              {allowanceData?.allowances?.length ? (
                <>
                  {allowanceData?.allowances.map((item, index) => (
                    <div id="task_container">
                      <p>{index + 1}</p>
                      <p>{item?.name}</p>
                      <p>{item?.type}</p>
                      <p>{item?.amount}</p>
                      <p>{item?.maxLimit ? item?.maxLimitAmount : ""}</p>
                      <div id="btns">
                        <img
                          src={Edit_user}
                          alt="Edit_user"
                          role="presentation"
                          onClick={() => EditAllowanceFun(item)}
                        />
                        <DeleteOutlined
                          style={{
                            color: `red`,
                            marginLeft: `15px`,
                            fontSize: `23px`,
                          }}
                          onClick={() => {
                            DeleteAPIFun(policyDataObj, item?.id)
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                "No Data"
              )}
            </div>
          </div>
        </div>
        <Modal
          visible={editAllowancePop}
          onCancel={() => setEditAllowancePop(false)}
          onOk={() => {
            Updatedata(policyDataObj, editAllowanceData)
          }}
        >
          <EditAllowance
            editAllowanceData={editAllowanceData}
            editAllowanceObj={editAllowanceObj}
            name={name}
            setName={setName}
            type={type}
            SetType={SetType}
            days={days}
            SetDays={SetDays}
            limit={limit}
            SetLimit={SetLimit}
          />
        </Modal>

        <Modal
          visible={true}
          // onCancel={() => setEditAllowancePop(false)}
          // onOk={() => {
          //   Updatedata(policyDataObj, editAllowanceData)
          // }}
        >
          <AddAllowancePop />
        </Modal>
      </div>
    </AllowanceTableViewStyles>
  )
}
export default AllowanceTableView
