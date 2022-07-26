import React from 'react';
import { LeaveContainers } from './styles';

const LeaveType = ({ leaveFun }) => {
    return (
        <LeaveContainers>
            <p role="presentation" onClick={() => leaveFun('Paid')}>Paid Leave</p>
            <p role="presentation" onClick={() => leaveFun('Sick')}>Sick Leave</p>
            <p role="presentation" onClick={() => leaveFun('Cassual')}>Cassual Leave</p>
        </LeaveContainers>
    )
}
export default LeaveType;