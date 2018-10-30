import { SET_ARTICULOS, LIST_ARTICULO, LIST_ARTICULO_DONE, CHANGE_ARTICULO_FILTER } from '../actions';

export default articuloReducer = (state = { articulos: [], loading: false, filter: '' }, action) => {
    switch (action.type) {
        case SET_ARTICULOS: {
            return { ...state, articulos: action.payload, loading: false }
        }
        case LIST_ARTICULO: {
            return { ...state, loading: true };
        }
        case LIST_ARTICULO_DONE:
            return { ...state, articulos: action.payload, loading: false };
        case CHANGE_ARTICULO_FILTER:
            return { ...state, filter: action.payload };
    }

    return state;
};