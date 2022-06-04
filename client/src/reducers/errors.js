import { ERROR } from "../constants/actionTypes"

const errorReducer = (state = null, action) => {
    switch (action.type) {
        case ERROR:
            return { ...state, emessage: 'error' };
        default:
            return state;
    }
}

export default errorReducer
