import React, { Component, Fragment } from 'react'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

interface IProps {
    trigger?: boolean
}
interface IState {
    collapsed: boolean
}

// 自定义侧边栏触发器
class SwitchSideBar extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props)
        this.state = {
            collapsed: false,
        }
    }
    // 切换
    handleToggle = () => {
        this.setState((state) => {
            return {
                collapsed: !state.collapsed
            }
        })
    }
    render() {
        const { collapsed } = this.state
        return (
            <Fragment >
                {
                    React.createElement(
                        collapsed ?
                            MenuUnfoldOutlined :
                            MenuFoldOutlined
                        ,
                        {
                            className: 'trigger',
                            onClick: this.handleToggle,
                        }
                    )
                }
            </Fragment>
        )
    }
}
export default SwitchSideBar