import React from "react"
import EmptyRoster from "../EmptyRoster"
import Moment from "moment"
import {
  CheckOutlined,
  CloseOutlined,
  ExclamationOutlined,
} from "@ant-design/icons"

const AdminPortal = ({
  RedoOutlined,
  adminToggle,
  setAdminToggle,
  leaveMap,
  userRealData,
  Avatar,
  nameProf,
  openLeaveDetailsFun,
  userDataMain,
  desecision,
  getLeaves,
  activeLoader,
  CompoLoader,
}) => {
  return (
    <div id="admin">
      <div id="admin_block1">
        <h1>Leave Requests</h1>
        <p id="refresh" onClick={getLeaves} role="presentation">
          <RedoOutlined />
          Refresh
        </p>
      </div>
      {activeLoader ? (
        <CompoLoader />
      ) : (
        <>
          <div id="admin_tab">
            <h2
              role="presentation"
              onClick={() => setAdminToggle("all")}
              className={adminToggle === "all" && "active"}
            >
              All
            </h2>
            <h2
              role="presentation"
              onClick={() => setAdminToggle("pending")}
              className={adminToggle === "pending" && "active"}
            >
              Pending
            </h2>
            <h2
              role="presentation"
              onClick={() => setAdminToggle("approved")}
              className={adminToggle === "approved" && "active"}
            >
              Approved
            </h2>
            <h2
              role="presentation"
              onClick={() => setAdminToggle("rejected")}
              className={adminToggle === "rejected" && "active"}
            >
              Rejected
            </h2>
          </div>
          {leaveMap?.length !== 0 ? (
            <div id="message">
              <div id="message_block1">
                <h3>SNo</h3>
                <h3>Name & ID</h3>
                <h3>Date</h3>
                <h3>Leave Type</h3>
                <h3>Reason</h3>
                <h3>Action</h3>
              </div>
              <div id="message_block2">
                {userRealData?.map((item, i) => {
                  return item?.status === adminToggle ? (
                    <div id="task_container">
                      <p>{i + 1}</p>
                      <div id="profile_box">
                        <Avatar name={item?.username} nameProf={nameProf} />
                        {/* <img src="https://i.pinimg.com/550x/4b/0e/d9/4b0ed906554fb9f66b1afabea90eb822.jpg" alt="img" id="profile" /> */}
                        <div
                          id="profile_text"
                          onClick={() => openLeaveDetailsFun(item, "pending")}
                          role="presentation"
                        >
                          <h2 style={{ fontSize: `0.9vw` }}>
                            {item?.username}
                          </h2>
                          <p style={{ fontSize: `0.9vw` }}>
                            {item?.userId[0] +
                              item?.userId[1] +
                              item?.userId[2] +
                              item?.userId[3] +
                              item?.userId[4]}
                          </p>
                        </div>
                      </div>
                      <p
                        onClick={() => openLeaveDetailsFun(item, "pending")}
                        role="presentation"
                      >
                        {Moment(item?.startDate, "MM-Do-YYYY").format("Do MMM")}{" "}
                        to{" "}
                        {Moment(item?.endDate, "MM-Do-YYYY").format(
                          "Do MMM, YYYY"
                        )}
                      </p>
                      <p
                        onClick={() => openLeaveDetailsFun(item, "pending")}
                        role="presentation"
                      >
                        {item?.type === "cos" ? "CL" : "PL"}
                      </p>
                      <p
                        style={{
                          whiteSpace: "nowrap",
                          width: "16vw",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        onClick={() => openLeaveDetailsFun(item, "pending")}
                        role="presentation"
                      >
                        {item?.reason}
                      </p>
                      <div id="btns">
                        {item.status === "approved" ? (
                          <p
                            style={{
                              color: `#00D241`,
                              fontSize: `1.2vw`,
                              fontWeight: `700`,
                            }}
                          >
                            <CheckOutlined style={{ marginRight: `0.6vw` }} />
                            Approved
                          </p>
                        ) : item.status === "rejected" ? (
                          <p
                            style={{
                              color: `#FF0000`,
                              fontSize: `1.2vw`,
                              fontWeight: `700`,
                            }}
                          >
                            <CloseOutlined style={{ marginRight: `0.6vw` }} />
                            Rejected
                          </p>
                        ) : (
                          <>
                            {userDataMain?.role === "admin" ? (
                              <>
                                <button
                                  onClick={() => {
                                    desecision("approve", item?.id)
                                  }}
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => {
                                    desecision("reject", item?.id)
                                  }}
                                >
                                  Reject
                                </button>
                              </>
                            ) : (
                              <p
                                style={{
                                  color: `#CB5A08`,
                                  fontSize: `1.2vw`,
                                  fontWeight: `700`,
                                }}
                              >
                                <ExclamationOutlined
                                  style={{ marginRight: `0.6vw` }}
                                />
                                Pending
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div id="task_container">
                      <p>{i + 1}</p>
                      <div id="profile_box">
                        <Avatar name={item?.username} nameProf={nameProf} />
                        {/* <img src="https://i.pinimg.com/550x/4b/0e/d9/4b0ed906554fb9f66b1afabea90eb822.jpg" alt="img" id="profile" /> */}
                        <div
                          id="profile_text"
                          onClick={() => openLeaveDetailsFun(item, "pending")}
                          role="presentation"
                        >
                          <h2 style={{ fontSize: `0.9vw` }}>
                            {item?.username}
                          </h2>
                          <p style={{ fontSize: `0.9vw` }}>
                            {item?.userId[0] +
                              item?.userId[1] +
                              item?.userId[2] +
                              item?.userId[3] +
                              item?.userId[4]}
                          </p>
                        </div>
                      </div>
                      <p
                        onClick={() => openLeaveDetailsFun(item, "pending")}
                        role="presentation"
                      >
                        {Moment(item?.startDate, "MM-Do-YYYY").format("Do MMM")}{" "}
                        to{" "}
                        {Moment(item?.endDate, "MM-Do-YYYY").format(
                          "Do MMM, YYYY"
                        )}
                      </p>
                      <p
                        onClick={() => openLeaveDetailsFun(item, "pending")}
                        role="presentation"
                      >
                        {item?.type === "cos" ? "CL" : "PL"}
                      </p>
                      <p
                        style={{
                          whiteSpace: "nowrap",
                          width: "16vw",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        onClick={() => openLeaveDetailsFun(item, "pending")}
                        role="presentation"
                      >
                        {item?.reason}
                      </p>
                      <div id="btns">
                        {item.status === "approved" ? (
                          <p
                            style={{
                              fontSize: `1.2vw`,
                              fontWeight: `700`,
                              color: `rgb(0, 210, 65)`,
                            }}
                          >
                            <CheckOutlined style={{ marginRight: `0.6vw` }} />
                            Approved
                          </p>
                        ) : item.status === "rejected" ? (
                          <p
                            style={{
                              fontSize: `1.2vw`,
                              fontWeight: `700`,
                              color: `#FF0000`,
                            }}
                          >
                            <CloseOutlined style={{ marginRight: `0.6vw` }} />
                            Rejected
                          </p>
                        ) : (
                          <>
                            {userDataMain?.role === "admin" ? (
                              <>
                                <button
                                  onClick={() => {
                                    desecision("approve", item?.id)
                                  }}
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => {
                                    desecision("reject", item?.id)
                                  }}
                                >
                                  Reject
                                </button>
                              </>
                            ) : (
                              <p
                                style={{
                                  color: `#CB5A08`,
                                  fontSize: `1.2vw`,
                                  fontWeight: `700`,
                                }}
                              >
                                <ExclamationOutlined
                                  style={{ marginRight: `0.6vw` }}
                                />
                                Pending
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <EmptyRoster text={`No ${adminToggle} leaves!`} />
          )}
        </>
      )}
    </div>
  )
}
export default AdminPortal
