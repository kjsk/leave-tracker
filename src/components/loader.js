import React from "react"
import { Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons';


const Loader = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (
        <div style={{ background: `#363740`, height: `100vh`, display: `flex`, justifyContent: `center`, alignItems: `center`, position: `fixed`, top: `0`, left: `0`, width: `100%`, zIndex: 100000 }}>
            <Spin indicator={antIcon} />
        </div>
    )
}

export default Loader
