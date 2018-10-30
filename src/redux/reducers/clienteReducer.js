import { SET_CLIENTES, LIST_CLIENTE, LIST_CLIENTE_DONE, CHANGE_CLIENTE_FILTER } from '../actions';

export default clienteReducer = (state = { clientes: [], loading: false, filter: '' }, action) => {
    switch (action.type) {
        case SET_CLIENTES: {
            return { ...state, clientes: action.payload, loading: false }
        }
        case LIST_CLIENTE: {
            return { ...state, loading: true };
        }
        case LIST_CLIENTE_DONE:
            return { ...state, clientes: action.payload, loading: false };
        case CHANGE_CLIENTE_FILTER:
            return { ...state, filter: action.payload };
    }

    return state;
};