import { Effect, ImmerReducer, Reducer } from 'umi';

export interface CounterModelState {
    count: number
}

export interface CounterModelType {
    namespace: string;
    state: CounterModelState;
    effects: {
        fetchData: Effect
    };
    reducers: {
        minus: ImmerReducer<CounterModelState>;
        plus: ImmerReducer<CounterModelState>;
    };
}
export interface CounterActionType {
    type: string,
    payload?: number
}

const CounterModel: CounterModelType = {
    namespace: "counter",
    state: {
        count: 100
    },

    // 同步
    reducers: {
        // 减
        minus(state: CounterModelState, action: CounterActionType) {
            const { payload } = action
            const increment = payload || 10
            return {
                ...state,
                count: state.count - increment
            }
        },
        plus(state: CounterModelState, action: CounterActionType) {
            const { payload } = action
            const increment = payload || 5
            return {
                ...state,
                count: state.count + increment
            }
        }
    },

    // 异步
    effects: {
        *fetchData() { }
    }
}

export default CounterModel