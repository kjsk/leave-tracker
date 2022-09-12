import React from "react"
import Moment from "moment"
import EmptyRoster from "../EmptyRoster"

const Home = ({
  RedoOutlined,
  leaveApproved,
  leavePending,
  leaveRejected,
  userLeaveData,
  openLeaveDetailsFun,
  desecision,
  DeleteOutlined,
  userDataMain,
  getLeaves,
  openNotificationWithIcon,
  activeLoader,
  CompoLoader,
}) => {
  const calcLeaves = 24 - leaveApproved?.length
  return (
    <>
      <div id="score">
        {userDataMain?.role === "admin" ? (
          <div id="score_card">
            <h2 id="score">
              {leavePending?.length < 10
                ? `0${leavePending?.length}`
                : leavePending?.length}
            </h2>
            <p>Action Needed</p>
          </div>
        ) : (
          <div id="score_card">
            <h2 id="score">
              {calcLeaves < 10 ? `0${calcLeaves}` : calcLeaves}
            </h2>
            <p>Available Leaves</p>
          </div>
        )}
        <div id="score_card">
          <h2 id="score">
            {leaveApproved?.length < 10
              ? `0${leaveApproved?.length}`
              : leaveApproved?.length}
          </h2>
          <p>Approved Leaves</p>
        </div>
        <div id="score_card">
          <h2 id="score">
            {leavePending?.length < 10
              ? `0${leavePending?.length}`
              : leavePending?.length}
          </h2>
          <p>Pending Leaves Requests</p>
        </div>
        <div id="score_card">
          <h2 id="score">
            {leaveRejected?.length < 10
              ? `0${leaveRejected?.length}`
              : leaveRejected?.length}
          </h2>
          <p>Rejected Leaves</p>
        </div>
      </div>

      <p id="refresh" onClick={getLeaves} role="presentation">
        <RedoOutlined />
        Refresh
      </p>

      {activeLoader ? (
        <CompoLoader />
      ) : (
        <div id="message">
          {userLeaveData?.leaves?.length > 0 ? (
            <>
              <div id="message_block1">
                <h3>SNo</h3>
                <h3>Type</h3>
                <h3>From</h3>
                <h3>To</h3>
                <h3>Reason</h3>
                <h3>Status</h3>
                <h3>Action</h3>
              </div>
              <div id="message_block2">
                {userLeaveData?.leaves?.map((item, i) => {
                  return (
                    <div id="task_container" key={i}>
                      <p
                        onClick={() => openLeaveDetailsFun(item, "home")}
                        role="presentation"
                      >
                        {userLeaveData?.leaves?.length - i}
                      </p>
                      <p
                        style={{ padding: `0` }}
                        onClick={() => openLeaveDetailsFun(item, "home")}
                        role="presentation"
                      >
                        {item?.type === "gen" ? "Paid" : "Casual"}
                      </p>
                      <p
                        onClick={() => openLeaveDetailsFun(item, "home")}
                        role="presentation"
                      >
                        {Moment(item?.startDate, "MM-Do-YYYY").format(
                          "Do MMM YYYY - LT"
                        )}
                      </p>
                      <p
                        onClick={() => openLeaveDetailsFun(item, "home")}
                        role="presentation"
                      >
                        {Moment(item?.endDate, "MM-Do-YYYY").format(
                          "Do MMM YYYY - LT"
                        )}
                      </p>
                      <p
                        onClick={() => openLeaveDetailsFun(item, "home")}
                        role="presentation"
                      >
                        {item?.reason}
                      </p>
                      <p
                        style={{
                          color:
                            item?.status === "pending"
                              ? "#CB5A08"
                              : item?.status === "approved"
                              ? "#00D241"
                              : item?.status === "rejected"
                              ? "#FF0000"
                              : "",
                          fontWeight: `bold`,
                        }}
                        onClick={() => openLeaveDetailsFun(item, "home")}
                        role="presentation"
                      >
                        {item?.status === "pending"
                          ? "Pending"
                          : item?.status === "approved"
                          ? "Approved"
                          : item?.status === "rejected"
                          ? "Rejected"
                          : ""}
                      </p>
                      {item?.status === "pending" && (
                        <p
                          onClick={() => {
                            desecision("delete", item?.id)
                          }}
                          role="presentation"
                        >
                          <DeleteOutlined className="delete_icon" />
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <EmptyRoster
              text={
                userDataMain?.role === "admin"
                  ? "No action needed..."
                  : "No Leaves Applied..."
              }
            />
          )}
        </div>
      )}
    </>
  )
}

export default Home
