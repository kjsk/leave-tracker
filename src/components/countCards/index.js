import React, { Fragment } from "react";

const CountCards = ({
    userDataMain,
    leavePending,
    calcLeaves,
    getNewUserLeave,
    leaveRejected,
    leaveApproved,
    userAllowanceData
}) => {
    console.log("userAllowanceData", userAllowanceData)
    return (
        <Fragment>
            {userDataMain?.role === "admin" ? (
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
            ) : (
                <div id="score">
                    {userAllowanceData?.map((item) =>
                        <div id="score_card">
                            <h2 id="score">
                                <span className="main_count">
                                    {item?.used < 10
                                        ? `0${item?.used}`
                                        : item?.used
                                    }
                                </span>
                                <span className="count_dash">/</span>
                                <span className="count_dash">
                                    {item?.amount < 10
                                        ? `0${item?.amount}`
                                        : item?.amount
                                    }
                                </span>
                            </h2>
                            <p>{item?.name}</p>
                        </div>
                    )}
                    {userAllowanceData?.map((item) =>
                        <div id="score_card">
                            <h2 id="score">
                                <span className="main_count">
                                    {item?.used < 10
                                        ? `0${item?.used}`
                                        : item?.used
                                    }
                                </span>
                                <span className="count_dash">/</span>
                                <span className="count_dash">
                                    {item?.amount < 10
                                        ? `0${item?.amount}`
                                        : item?.amount
                                    }
                                </span>
                            </h2>
                            <p>{item?.name}</p>
                        </div>
                    )}
                    {userAllowanceData?.map((item) =>
                        <div id="score_card">
                            <h2 id="score">
                                <span className="main_count">
                                    {item?.used < 10
                                        ? `0${item?.used}`
                                        : item?.used
                                    }
                                </span>
                                <span className="count_dash">/</span>
                                <span className="count_dash">
                                    {item?.amount < 10
                                        ? `0${item?.amount}`
                                        : item?.amount
                                    }
                                </span>
                            </h2>
                            <p>{item?.name}</p>
                        </div>
                    )}
                </div>
            )}
        </Fragment>
    )
}
export default CountCards;