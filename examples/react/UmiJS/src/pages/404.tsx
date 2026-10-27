import { Button, Result } from "antd"
import { RouteChildrenProps } from "react-router"

export default ({ history }: RouteChildrenProps) => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={() => {history.replace('/') }}>Back Home</Button>}
        />)
}