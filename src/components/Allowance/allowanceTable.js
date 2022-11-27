import React, { useEffect, useState } from "react"
import Edit_user from "../../data/assets/Edit_user.svg"
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons"
import EditAllowance from "../Forms/EditAllowance"
import { Modal } from "antd"
import axios from "axios"
import {
  getAllowanceByPolicy,
  updateAllowanceAPI,
  getHeaders,
  deleteAllowanceAPI,
  addAllowanceAPI,
  getUserAllowanceByIdAPI,
  deleteUserAllowanceByIdAPI,
  editUserAllowanceByIdAPI,
  addUsersAllowanceAPI,
  getAllLeaveTypesAPI
} from "../../utils/urls"
import { AllowanceTableViewStyles } from "./styles"
import AddAllowancePop from "./addAllowancePop"
import EmptyRoster from "../EmptyRoster"
import CompoLoader from "../ComponentLoader";

const AllowanceTableView = ({
  policyDataObj,
  policyName,
  setOpenAllowance,
  callFrom,
  setCreateLeavePop,
  playAudio
}) => {


  // Fetch user data from local storage
  const userData =
    typeof localStorage !== "undefined" &&
    JSON.parse(localStorage.getItem("userData")) // FETCHING USER STORED DATA

  const [btnProgress, setBtnProgress] = useState(false);
  const [editAllowancePop, setEditAllowancePop] = useState(false)
  const [allowanceData, setAllowanceData] = useState([])
  const [activeLoader, setActiveLoader] = useState(false);

  // Edit allowance data
  const [editAllowanceData, setEditAllowanceData] = useState({})

  const [name, setName] = useState("")
  const [type, SetType] = useState("")
  const [days, SetDays] = useState("")
  const [limit, SetLimit] = useState("")
  const [status, SetStatus] = useState(false)

  // Add alowance setState
  const [addAllowancePop, setAddAllowancePop] = useState(false)
  const [allowancename, setAllowanceName] = useState("")
  const [allowancetype, SetAllowanceType] = useState("")
  const [allowancedays, SetAllowanceDays] = useState("")
  const [allowancelimit, SetAllowanceLimit] = useState(0)
  const [allowancelimitStatus, SetAllowanceLimitStatus] = useState(true)

  // Delete allowance setState
  const [deleteAllowaceObj, setDeleteAllowanceObj] = useState({
    policyId: "",
    allowanceId: ""
  })


  // get all leave types
  const [leaveTypes, setLeaveTypes] = useState([])
  const [dropVal, setDropVal] = useState("");

  // Headers
  const headers = getHeaders(userData?.tokens?.accessToken);

  useEffect(() => {
    OpenPolicy(policyDataObj);
    getAllLeaveTypes();
  }, [])

  // Get allowance data bu user and policy id
  const OpenPolicy = policyId => {
    setActiveLoader(true);
    axios({
      url: callFrom == "users" ? getUserAllowanceByIdAPI(policyId) : getAllowanceByPolicy(policyId),
      method: "GET",
      headers: headers,
    })
      .then(res => {
        if (res?.data) {
          setActiveLoader(false);
          setAllowanceData(res?.data);
        }
      })
      .catch(err => {
        setActiveLoader(false);
        console.log("Error", err);
      })
  }

  // Set data for Edit allowance
  const EditAllowanceFun = item => {
    setEditAllowancePop(true)
    setEditAllowanceData(item)
    if (item) {
      setName(item?.name)
      SetType(item?.type)
      SetDays(item?.amount)
      SetLimit(item?.maxLimitAmount)
      SetStatus(item?.maxLimit)
    }
  }

  // Call to update Allowance
  const Updatedata = (policyId, item) => {
    setBtnProgress(true)
    console.log("typetype", type)
    axios({
      url: callFrom == "users" ? editUserAllowanceByIdAPI(policyId, item?.id) : updateAllowanceAPI(policyId, item?.id),
      method: "PATCH",
      headers: headers,
      data: {
        amount: days || item?.amount,
        name: name || item?.name,
        maxLimit: status,
        type: type || item?.type,
        maxLimitAmount: limit || item?.maxLimit,
      },
    })
      .then(res => {
        if (res?.data) {
          setEditAllowancePop(false)
          setAllowanceData(res?.data)
          OpenPolicy(policyId)
          setName("")
          SetType("")
          SetDays("")
          SetLimit(true)
          SetStatus("")
          setBtnProgress(false)
          playAudio();
        }
      })
      .catch(err => {
        setBtnProgress(false)
        console.log("Error", err)
      })
  }

  // Add allowance Function
  const AddAllowanceFun = policyId => {
    setBtnProgress(true);
    axios({
      url: callFrom == "users" ? addUsersAllowanceAPI(policyId) : addAllowanceAPI(policyId),
      method: "POST",
      headers: headers,
      data: {
        amount: allowancedays,
        maxLimit: allowancelimitStatus,
        maxLimitAmount: allowancelimit,
        name: allowancename,
        type: allowancetype,
      },
    })
      .then(res => {
        if (res?.data) {
          OpenPolicy(policyId);
          setBtnProgress(false);
          setAddAllowancePop(false);
          setAllowanceName("");
          SetAllowanceType("");
          SetAllowanceDays("");
          SetAllowanceLimit("");
          SetAllowanceLimitStatus(true);
          getAllLeaveTypes();
          playAudio();
        }
      })
      .catch(err => {
        getAllLeaveTypes();
        console.log("Error", err);
        setBtnProgress(false);
        setAddAllowancePop(false);
      })
  }

  // Get all leave types
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



  // Call to delete Allowance Function
  const DeleteAPIFun = (policyId, allowanceId) => {
    setBtnProgress(true)
    axios({
      url: callFrom == "users" ? deleteUserAllowanceByIdAPI(policyId, allowanceId) : deleteAllowanceAPI(policyId, allowanceId),
      method: "DELETE",
      headers: headers,
    })
      .then(_res => {
        setDeleteAllowanceObj({
          policyId: "",
          allowanceId: ""
        })
        setBtnProgress(false)
        OpenPolicy(policyId)
        playAudio();
      })
      .catch(err => {
        setBtnProgress(false);
        console.log("Error", err)
      })
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
              <button
                id="add_allowance_btn"
                onClick={() => setAddAllowancePop(true)}
              >
                <PlusCircleOutlined style={{ margin: `0 10px 0 0 ` }} />
                Add Allowance
              </button>
            </div>
          </div>
          {activeLoader ? <CompoLoader /> :
            <>
              {allowanceData?.allowances?.length ? (
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
                    {allowanceData?.allowances.map((item, index) => (
                      <div id="task_container">
                        <p>{index + 1}</p>
                        <p>{item?.name}</p>
                        <p>{item?.type}</p>
                        <p>{item?.amount}</p>
                        <p>
                          {item?.maxLimit > 0
                            ? item?.maxLimitAmount
                            : "Not Applicable"}
                        </p>
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
                              setDeleteAllowanceObj({
                                policyId: policyDataObj,
                                allowanceId: item?.id
                              })
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) :
                (<EmptyRoster text="No Allowance Under Added!" />)}
            </>
          }
        </div>

        {/* Edit allowance modal */}
        <Modal
          title="Edit Allowance"
          visible={editAllowancePop}
          onCancel={() => setEditAllowancePop(false)}
          onOk={() => {
            Updatedata(policyDataObj, editAllowanceData)
          }}
          okText={btnProgress ? "Processing.." : "Update"}
          okButtonProps={{
            disabled: !(name && type && days && limit)
          }}
        >
          <EditAllowance
            name={name}
            setName={setName}
            type={type}
            SetType={SetType}
            days={days}
            SetDays={SetDays}
            limit={limit}
            SetLimit={SetLimit}
            status={status}
            SetStatus={SetStatus}
            leaveTypes={leaveTypes}
            setLeaveTypes={setLeaveTypes}
            dropVal={dropVal}
            setDropVal={setDropVal}
            setCreateLeavePop={setCreateLeavePop}
          />
        </Modal>

        {/* Add allowance modal */}
        <Modal
          title="Add Allowance"
          visible={addAllowancePop}
          onOk={() => {
            AddAllowanceFun(policyDataObj)
          }}
          onCancel={() => setAddAllowancePop(false)}
          okText={btnProgress ? "Processing.." : "Add Allowance"}
          okButtonProps={{
            disabled: !(allowancename && allowancetype && allowancedays)
          }}
        >
          <AddAllowancePop
            allowancename={allowancename}
            allowancetype={allowancetype}
            allowancedays={allowancedays}
            allowancelimit={allowancelimit}
            allowancelimitStatus={allowancelimitStatus}
            // allowanceDescription={allowanceDescription}
            setAllowanceName={setAllowanceName}
            SetAllowanceType={SetAllowanceType}
            SetAllowanceDays={SetAllowanceDays}
            SetAllowanceLimit={SetAllowanceLimit}
            SetAllowanceLimitStatus={SetAllowanceLimitStatus}
            // SetAllowanceDescription={SetAllowanceDescription}
            leaveTypes={leaveTypes}
            // setLeaveTypes={setLeaveTypes}
            dropVal={dropVal}
            setDropVal={setDropVal}
            setCreateLeavePop={setCreateLeavePop}
          />
        </Modal>

        {/* Delete Allowance modal */}
        <Modal
          title="Confirmation"
          centered
          visible={deleteAllowaceObj?.policyId}
          onOk={() => {
            DeleteAPIFun(deleteAllowaceObj?.policyId, deleteAllowaceObj?.allowanceId)
          }}
          onCancel={() => {
            setDeleteAllowanceObj({
              policyId: "",
              allowanceId: ""
            })
          }}
          width={1000}
          okText={btnProgress ? "Processing.." : "Delete"}
          cancelText="Cancel"
        >
          <>
            <p
              style={{
                fontSize: `22px`,
                color: `#333333`,
                fontWeight: `600`,
                margin: `30px 0`,
              }}
            >
              Do you want to delete Allowance ?
            </p>
          </>
        </Modal>
      </div>
    </AllowanceTableViewStyles >
  )
}
export default AllowanceTableView
