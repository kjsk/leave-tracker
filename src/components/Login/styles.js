import styled from "styled-components"

export const LoginContainer = styled.div`
background: #363740;
height: 100vh;
display: flex;
justify-content: center; 
align-items: center;
* {
    padding: 0;
    margin: 0;
}

#LoginContainer {
    width: 380px;
    height: 582px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px;
    box-sizing: border-box;
    border-radius: 8px;
}

#LoginContainer img {
    width: 48px;
    height: 48px;
}

#LoginContainer h2 {
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #252733;
    margin: 32px 0 0 0;
}

#LoginContainer h4 {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #9FA2B4;
    margin: 12px 0 0 0;
}

#LoginContainer button {
    width: 100%;
    height: 42px;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.3px;
    color: #252733;
    border: 1px solid #EDEDEE;
    box-sizing: border-box;
    border-radius: 8px;
    margin: 48px 0 0 0;
    cursor: pointer;
    transition: 0.5s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
}

#LoginContainer button img {
    width: 20px;
    height: 20px;
    margin: 0 20px 0 0;
}

#LoginContainer button:hover {
    border: 2px solid #EDEDEE;
}
`