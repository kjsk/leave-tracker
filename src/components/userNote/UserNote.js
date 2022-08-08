import React, { useEffect, useState } from "react";
import { UserContainer } from "../Login/styles";
import mail from "../../data/assets/mail.svg";

const UserNote = () => {

    return (
        <UserContainer>
            <h3>Pls contact your Admin for further access to the application</h3>
            <span><img src={mail} alt="img" />jamescel.gmail.com</span>
        </UserContainer>
    )
}
export default UserNote
