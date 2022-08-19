import React from 'react';
import { LeaveContainers } from './styles';

const LeaveType = ({ leaveFun, setLeaveDrop, userDataMain }) => {
    return (
        <LeaveContainers>
            {userDataMain?.map((item, index) =>
                <p role="presentation" key={index} onClick={() => { leaveFun(item?.value, item?.label); setLeaveDrop(false) }}>{item?.label}</p>
            )}
        </LeaveContainers >
    );
};
export default LeaveType;