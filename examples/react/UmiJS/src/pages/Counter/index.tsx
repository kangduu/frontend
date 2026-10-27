import { Button } from "antd";
import { EffectCallback, FC, useCallback, useEffect } from "react";
import { CounterModelState, CounterActionType, ConnectProps, Loading, connect } from 'umi';

interface PageProps extends ConnectProps {
    counter: CounterModelState;
    loading: boolean;
}

const CounterePage: FC<PageProps> = ({ counter, dispatch }) => {
    const { count } = counter

    // TODO : 如何写成 useEffect
    const touchDispatch = useCallback<(action: CounterActionType) => (() => void)>((action): () => void => {
        ((dispatch as Function)(action))
        return () => { }
    }, [])

    return <div>
        <p>Count：{count}</p>
        <Button onClick={() => touchDispatch({ type: "counter/minus" })}>Minus</Button>
        <Button onClick={() => touchDispatch({ type: "counter/plus", payload: '12' })}>Plus</Button>
    </div >
}

const mapStateToProps = ({ counter, loading }: { counter: CounterModelState, loading: Loading }) => {
    return {
        counter,
        loading: loading.models.counter
    }
}

export default connect(mapStateToProps)(CounterePage)