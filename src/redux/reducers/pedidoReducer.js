import { SYNC_NEW_PEDIDO, SYNC_NEW_PEDIDO_DONE, ADD_NEW_PEDIDO, SET_PEDIDOS, SET_PEDIDO, SET_PEDIDO_TIPO, SET_PEDIDO_CLIENTE, SET_PEDIDO_SUCURSAL, SET_PEDIDO_COMENTARIO, ADD_NEW_ITEM_PEDIDO, EDIT_ITEM_PEDIDO, REMOVE_ITEM_PEDIDO } from '../actions';

export default pedidoReducer = (state = { pedido: null, pedidos: [], loading: false }, action) => {
    switch (action.type) {
        case SYNC_NEW_PEDIDO: {
            return { ...state, loading: true };
        }
        case SYNC_NEW_PEDIDO_DONE: {
            const { pedido, index } = action.payload;
            const pedidos = [...state.pedidos];

            if (index !== null) {
                pedidos[index] = pedido;
            } else {
                pedidos.push(pedido);
            }

            return { ...state, pedidos: pedidos, loading: false };
        }
        case SET_PEDIDOS: {
            return { ...state, pedidos: action.payload };
        }
        case ADD_NEW_PEDIDO:
            return { ...state, pedido: action.payload };
        case SET_PEDIDO:
            return { ...state, pedido: action.payload };
        case SET_PEDIDO_TIPO:
            return { ...state, pedido: { ...state.pedido, extra: action.payload } };
        case SET_PEDIDO_CLIENTE:
            return { ...state, pedido: { ...state.pedido, cliente: action.payload } };
        case SET_PEDIDO_SUCURSAL:
            return { ...state, pedido: { ...state.pedido, sucursal: action.payload } };
        case SET_PEDIDO_COMENTARIO:
            return { ...state, pedido: { ...state.pedido, comentario: action.payload } };
        case ADD_NEW_ITEM_PEDIDO:
            return { ...state, pedido: { ...state.pedido, items: [...state.pedido.items, ...action.payload] } };
        case EDIT_ITEM_PEDIDO:
            const { item, index } = action.payload;
            const editItems = [...state.pedido.items];

            editItems[index] = item;

            return { ...state, pedido: { ...state.pedido, items: editItems } };
        case REMOVE_ITEM_PEDIDO:
            const deleteItems = [...state.pedido.items];

            deleteItems.splice(action.payload, 1);

            return { ...state, pedido: { ...state.pedido, items: deleteItems } };
    }

    return state;
};