import { Result, Button } from 'antd';
import { RouteChildrenProps } from 'react-router';

export default ({ history }: RouteChildrenProps) => {
    return (<Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button type="primary" onClick={() => { history.replace('/') }}>Back Home</Button>}
    />)
}