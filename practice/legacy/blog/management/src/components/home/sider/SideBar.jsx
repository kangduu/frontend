import React, { Component } from 'react';
import { Layout } from 'antd';
import SiderMenu from "src/components/home/sider/SiderMenu";
import logo from "src/assets/imgs/logo.png";
import "./side.less"

class SideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false
        }
    }
    onCollapse = collapsed => {
        this.setState({ collapsed })
    }

    render() {
        const { collapsed } = this.state
        const { Sider } = Layout;
        return (
            <Sider
                className="app-side"
                theme="dark"
                collapsible
                collapsed={collapsed}
                onCollapse={this.onCollapse}
            >
                <div className="app-logo">
                    <img src={logo} alt="logo" width="32px" />
                    {
                        !collapsed && <h1>前端微剧场</h1>
                    }
                </div>
                <SiderMenu />
            </Sider>
        )
    }
}
export default SideBar