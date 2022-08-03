import React from 'react';
import { LeaveContainers } from './styles';

const LeaveType = ({ leaveFun, setLeaveDrop }) => {
    return (
        <LeaveContainers>
            <p role="presentation" onClick={() => { leaveFun('gen'); setLeaveDrop(false) }}>Paid Leave</p>
            <p role="presentation" onClick={() => { leaveFun('cos'); setLeaveDrop(false) }}>Cassual Leave</p>
        </LeaveContainers >
    );
};
export default LeaveType;