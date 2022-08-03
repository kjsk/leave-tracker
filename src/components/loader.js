import React from "react"
import { Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons';


const Loader = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (
        <div style={{ background: `black`, height: `100vh`, display: `flex`, justifyContent: `center`, alignItems: `center`, opacity: 0.5, position: `fixed`, top: `0`, left: `0`, width: `100%`, zIndex: 500 }}>
            <Spin indicator={antIcon} />
        </div>
    )
}

export default Loader
