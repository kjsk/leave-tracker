import React, { Fragment } from "react"
import { Button, Modal } from 'antd';
import { ConformContainer } from './styles';


const PopUpPage = () => {
    return (
        <Fragment>
            <ConformContainer>
                <Modal
                    title="Confirmation"
                    centered
                    visible={true}
                    // onOk={() => setVisible(false)}
                    // onCancel={() => setVisible(false)}
                    width={1000}
                    okText='Approve'
                    cancelText='Back'
                >
                    <p style={{ fontSize: `24px`, color: `#333333`, fontWeight: `600`, margin: `51px 0` }}>Are you sure you want to Approve?</p>
                </Modal>
            </ConformContainer>
        </Fragment>
    )
}

export default PopUpPage
