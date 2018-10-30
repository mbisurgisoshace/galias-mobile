import { LOGIN, LOGOUT, LOGIN_SUCCESFULL, LOGIN_FAILED } from '../actions';

export default authReducer = (state = { token: '', error: '', loading: false }, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, error: '', loading: true };
        case LOGIN_SUCCESFULL:
            return { ...state, token: action.payload, loading: false };
        case LOGIN_FAILED:
            return { ...state, token: '', error: action.payload, loading: false };
        case LOGOUT:
            return { ...state, token: '' }
    }

    return state;
};