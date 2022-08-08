import styled from "styled-components"

export const LoginContainer = styled.div`
background: #363740;
height: 100vh;
display: flex;
justify-content: center; 
align-items: center;
position: relative;
overflow: hidden;
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






${'' /* admin container */}


#AdminContainer {
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
#AdminContainer h2 {
    font-style: normal;
font-weight: 700;
font-size: 22px;
line-height: 30px;
text-align: center;
letter-spacing: 0.3px;
color: #252733;
 }
#AdminContainer .input_main {
    width: 100%;
}
#AdminContainer .input_main #input_fields {
    margin-top: 24px;
}
#AdminContainer .input_main label {
    font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 15px;
letter-spacing: 0.3px;
color: #686868;   
}
#AdminContainer .input_main input {
    width: 100%;
    height: 42px;
    background: #FCFDFE;
border: 1px solid #F0F1F7;
border-radius: 8px;
outline-color: #3751FF;
transition: 0.5s ease-in-out;
padding: 10px;
}
#AdminContainer .input_main input:hover {
    background: #F0F1F7;
}
#AdminContainer .input_main textarea {
    width: 100%;
    height: 80px;
    border: 1px solid #F0F1F7;
border-radius: 8px;
outline-color: #3751FF;
transition: 0.5s ease-in-out;
resize: none;
padding: 10px;
}
#AdminContainer .input_main textarea:hover {
    background: #F0F1F7;
}
#AdminContainer .input_main .buttons_main{
    display: flex;
    gap: 1rem;
    margin-top: 48px;
}
#AdminContainer .input_main .buttons_main button:nth-child(2) {
    background: #3751FF !important;
}

`


export const UserContainer = styled.div`
h3 {
    font-style: normal;
font-weight: 700;
font-size: 22px;
line-height: 32px;
letter-spacing: 0.2px;
color: #333333;
width: 381px;
}
span {
    display: flex;
    gap: 12px;
    margin-top: 31px;
    align-items: center;
    font-weight: 400;
font-size: 20px;
line-height: 20px;
letter-spacing: 0.2px;
color: #333333;
}
span img {
    width: 24px
}
`