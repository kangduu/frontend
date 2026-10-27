
import { createStore, combineReducers, compose, applyMiddleware, bindActionCreators } from "redux";
import reducers from "./reducers";

// 应用唯一的store，单一数据源
const store = createStore(reducers)

export default store