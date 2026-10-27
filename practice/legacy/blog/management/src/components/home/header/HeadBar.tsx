import React, { Fragment } from 'react'
import SwitchSideBar from "src/components/home/header/SwitchSideBar";
// import { Button } from 'antd';

interface IProps {
    onClick?: React.MouseEventHandler  // 必须指定点击事件的类型
}

class HeadBar extends React.Component<IProps> {

    handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget
        target.style.color = "#000"
        console.log(e.currentTarget.style);
    }
    render() {
        return (
            <Fragment>
                <SwitchSideBar />
                {/* <Button type="primary" onClick={this.handleClick}>按钮</Button> */}
            </Fragment >
        )
    }
}

export default HeadBar