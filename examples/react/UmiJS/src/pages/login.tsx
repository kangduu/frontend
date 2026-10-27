import { Button } from "antd"
import React from "react"
import { RouteChildrenProps } from "react-router"
import { Link, useModel } from "umi"

const Login = ({ history }: RouteChildrenProps) => {
    const { state, setState } = useModel("useAuthModel", model => ({ state: model.state, setState: model.setState }))

    React.useEffect(() => {
        console.log('Login mount');

        return () => {
            console.log('Login unmount');
        }
    }, [])

    const setUserInfo = React.useCallback(() => {
        setState(preState => {
            return preState + 1
        })
    }, [state])

    return <>
        <p>当前用户信息：{state}</p>
        <Button onClick={setUserInfo}>Plus</Button>
        <p>
            <Link to="/">返回首页</Link>
        </p>
    </>
}

export default Login