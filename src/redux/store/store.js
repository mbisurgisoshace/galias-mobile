import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../reducers/authReducer';
import pedidoReducer from '../reducers/pedidoReducer';
import clienteReducer from '../reducers/clienteReducer';
import articuloReducer from '../reducers/articuloReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    pedido: pedidoReducer,
    cliente: clienteReducer,
    articulo: articuloReducer
});

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export default store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));