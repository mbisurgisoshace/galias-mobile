import { AsyncStorage } from 'react-native';
import axios from 'axios';

import { SET_ARTICULOS, LIST_ARTICULO, LIST_ARTICULO_DONE, CHANGE_ARTICULO_FILTER } from './';

export const setArticulos = (articulos) => {
    return {
        type: SET_ARTICULOS,
        payload: articulos
    }
};

export const getArticulos = () => {
    return async (dispatch) => {
        const URL = `https://galias-server-api.herokuapp.com/api/articulo/list`;

        dispatch({
            type: LIST_ARTICULO
        });

        try {
            const res = await axios.get(URL);

            if (res) {
                await AsyncStorage.setItem('articulos', JSON.stringify(res.data.articulos));

                dispatch({
                    type: LIST_ARTICULO_DONE,
                    payload: res.data.articulos
                });
            }
        } catch (err) {
            console.log(err);
            dispatch({
                type: LIST_ARTICULO_DONE,
                payload: []
            });
        }
    }
};

export const setFilterArticulo = (text) => {
    return {
        type: CHANGE_ARTICULO_FILTER,
        payload: text
    }
};