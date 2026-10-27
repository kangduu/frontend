
import { Button } from 'antd';
import React from 'react';
import { RouteChildrenProps } from 'react-router';
import { Access, useAccess, useModel } from 'umi';
export default function IndexPage({ history }: RouteChildrenProps) {
  const { state, setState } = useModel('useAuthModel', model => ({ state: model.state, setState: model.setState }))
  const { initialState } = useModel('@@initialState');

  const access = useAccess()
  console.log("access", access);

  const minusUserInfo = React.useCallback(() => {
    setState((preState) => {
      return preState - 1
    })
  }, [state])

  return (
    <>
      <p>用户：{JSON.stringify(initialState as any)}</p>
      <p>统计：{state}</p>
      <Button onClick={() => { history.push("/login") }}>登录</Button>
      <Button onClick={minusUserInfo}>Minus</Button>
      <div>
        <Access
          accessible={access.canReadWorkplace}
          fallback={<>Can not read foo content.</>}
        >
          有权查看工作台
        </Access>
      </div>
    </>
  );
}
