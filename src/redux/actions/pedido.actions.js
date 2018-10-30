import { AsyncStorage } from 'react-native';
import axios from 'axios';
import moment from 'moment';

import { SYNC_NEW_PEDIDO, SYNC_NEW_PEDIDO_DONE, SET_PEDIDOS, ADD_NEW_PEDIDO, SET_PEDIDO, SET_PEDIDO_TIPO, SET_PEDIDO_CLIENTE, SET_PEDIDO_SUCURSAL, SET_PEDIDO_COMENTARIO, ADD_NEW_ITEM_PEDIDO, EDIT_ITEM_PEDIDO, REMOVE_ITEM_PEDIDO } from './';

export const syncNewPedido = (pedido, navigation, index) => {
    pedido.total = pedido.items.reduce((prev, curr) => prev + (curr.cantidad * curr.precio), 0);

    return async (dispatch) => {
        const URL = `https://galias-server-api.herokuapp.com/api/pedido/new`;

        dispatch({
            type: SYNC_NEW_PEDIDO
        });

        try {
            const token = await AsyncStorage.getItem('token');
            const res = await axios.post(URL, pedido, { headers: { 'authorization': JSON.parse(token) } });

            if (res) {
                pedido._id = res.data._id;
                pedido.enviado = true;
            }
        } catch (err) {
            console.log(err);
        }

        dispatch({
            type: SYNC_NEW_PEDIDO_DONE,
            payload: { pedido, index }
        });

        navigation.navigate('Home');
    }
};

export const newPedido = () => {
    const pedido = {
        fecha: moment(new Date()).hour(0).minute(0).second(0).millisecond(0).valueOf(),
        items: []
    };

    return {
        type: ADD_NEW_PEDIDO,
        payload: pedido
    }
}

export const setPedidos = (pedidos) => {
    return {
        type: SET_PEDIDOS,
        payload: pedidos
    }
}

export const setPedido = (pedido) => {
    return {
        type: SET_PEDIDO,
        payload: pedido
    }
};

export const setTipo = (tipo) => {
    return {
        type: SET_PEDIDO_TIPO,
        payload: tipo
    }
};

export const setCliente = (cliente) => {
    return {
        type: SET_PEDIDO_CLIENTE,
        payload: cliente
    }
};

export const setSucursal = (sucursal) => {
    return {
        type: SET_PEDIDO_SUCURSAL,
        payload: sucursal
    }
};

export const setComentario = (comentario) => {
    return {
        type: SET_PEDIDO_COMENTARIO,
        payload: comentario
    }
};

export const newItem = (item) => {
    return {
        type: ADD_NEW_ITEM_PEDIDO,
        payload: item
    }
};

export const editItem = (item, index) => {
    return {
        type: EDIT_ITEM_PEDIDO,
        payload: { item, index }
    }
}

export const removeItem = (index) => {
    return {
        type: REMOVE_ITEM_PEDIDO,
        payload: index
    }
};

