import React from 'react';
import { Empty } from 'antd';

const EmptyRoster = ({ text }) => {
    return (
        <div id="message_blocks" style={{ width: `fit-content`, margin: `3vw auto auto auto` }}>
            <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                    width: `25vw`,
                    height: `15vw`,
                }}
                description={
                    <span style={{ fontSize: `20px`, fontWeight: `bold`, color: `#6BA1DF` }}>
                        {text}
                    </span>
                }
            />
        </div>
    )
}
export default EmptyRoster;