import { combineReducers } from "redux";
import { REQUEST_DATA } from "./action/type";
import { initFetchData, initStaticData } from "./state";

interface ACTION {
    type: symbol,
    data: any,
    category?: string
}

const staticData = (state: object = initStaticData, action: ACTION) => {
    switch (action.type) {
        case REQUEST_DATA:

            break;

        default:
            return { ...state }
    }
}

const httpData = (state: object = initFetchData, action: ACTION) => {
    switch (action.type) {
        case REQUEST_DATA:
            return { ...state, isFetching: true, }

        default:
            return { ...state }
    }
}

export default combineReducers({ staticData, httpData })