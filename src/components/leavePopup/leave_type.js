import React from 'react';
import { LeaveContainers } from './styles';

const LeaveType = ({ leaveFun }) => {
    return (
        <LeaveContainers>
            <p role="presentation" onClick={() => leaveFun('gen')}>Paid Leave</p>
            <p role="presentation" onClick={() => leaveFun('cos')}>Cassual Leave</p>
        </LeaveContainers>
    )
}
export default LeaveType;