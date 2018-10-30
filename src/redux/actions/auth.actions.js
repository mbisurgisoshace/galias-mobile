import { AsyncStorage } from 'react-native';
import axios from 'axios';

import { LOGIN, LOGOUT, LOGIN_SUCCESFULL, LOGIN_FAILED } from './';

export const login = (email, password, navigation) => {
    return async (dispatch) => {
        const URL = `https://galias-server-api.herokuapp.com/signin`;

        dispatch({
            type: LOGIN
        });

        try {
            const res = await axios.post(URL, { email, password });

            if (res) {
                await AsyncStorage.setItem('token', JSON.stringify(res.data.token));

                dispatch({
                    type: LOGIN_SUCCESFULL,
                    payload: res.data.token
                });

                navigation.navigate('App');
            }
        } catch (err) {
            console.log(err);
            dispatch({
                type: LOGIN_FAILED,
                payload: 'No se ha podido iniciar sesión'
            });
        }
    }
};