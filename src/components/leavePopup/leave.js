import React from 'react';
import { LeaveContainer } from './styles';

const Leave = ({ setLeavePer }) => {
    return (
        <LeaveContainer>
            <p role="presentation" onClick={() => setLeavePer('Full day')}>Full day</p>
            <p role="presentation" onClick={() => setLeavePer('First Half')}>First Half</p>
            <p role="presentation" onClick={() => setLeavePer('Second Half')}>Second Half</p>
        </LeaveContainer>
    )
}
export default Leave;