import { AsyncStorage } from 'react-native';
import axios from 'axios';

import { SET_CLIENTES, LIST_CLIENTE, LIST_CLIENTE_DONE, CHANGE_CLIENTE_FILTER } from './';

export const setClientes = (clientes) => {
    return {
        type: SET_CLIENTES,
        payload: clientes
    }
};

export const getClientes = () => {
    return async (dispatch) => {
        const URL = `https://galias-server-api.herokuapp.com/api/cliente/list`;

        dispatch({
            type: LIST_CLIENTE
        });

        try {
            const res = await axios.get(URL);

            if (res) {
                await AsyncStorage.setItem('clientes', JSON.stringify(res.data.clientes));

                dispatch({
                    type: LIST_CLIENTE_DONE,
                    payload: res.data.clientes
                });
            }
        } catch (err) {
            console.log(err);
            dispatch({
                type: LIST_CLIENTE_DONE,
                payload: []
            });
        }
    }
};

export const setFilterCliente = (text) => {
    return {
        type: CHANGE_CLIENTE_FILTER,
        payload: text
    }
};