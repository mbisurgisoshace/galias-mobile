import React, { Component } from 'react';
import { StyleSheet, Text, View, Picker, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import numeral from 'numeral';
import axios from 'axios';

import FormPromoAb from '../components/FormPromoAb';
import FormPromoPorc from '../components/FormPromoPorc';
import FormPromoSin from '../components/FormPromoSin';

import { newItem } from '../redux/actions/pedido.actions';

class Promocion extends Component {
    state = {
        promo: 'a+b',
        stock: '0,0',
        loading: false
    };

    async componentDidMount() {
        this.setState({ loading: true });

        const articulo = this.props.navigation.getParam('articulo');
        const cantidad = await axios.get(`http://centrocompartido.engux.com.ar:8099/galias-server-backend/articulo/stock/${articulo.codigo}`);

        this.setState({ stock: numeral(cantidad.data).format('0,0'), loading: false });
    }

    onConfirmar = promo => {
        const articulo = this.props.navigation.getParam('articulo');

        if (this.state.promo === 'a+b') {
            const { cantidadA, cantidadB } = promo;
            const item1 = { articulo, cantidad: cantidadA, precio: articulo.precioVta, descuento: 0, promocion: 'a+b', pendiente: cantidadA };
            const item2 = { articulo, cantidad: cantidadB, precio: 0, descuento: 0, promocion: 'a+b', pendiente: cantidadB };

            this.props.newItem([item1, item2]);
        }

        if (this.state.promo === '%') {
            const { cantidad, porcentaje } = promo;
            const item = { articulo, cantidad: cantidad, precio: (articulo.precioVta * (1 - porcentaje / 100)), descuento: porcentaje, promocion: '%', pendiente: cantidad };

            this.props.newItem([item]);
        }

        if (this.state.promo === 'sin') {
            const { cantidad } = promo;
            const item = { articulo, cantidad: cantidad, precio: articulo.precioVta, descuento: 0, promocion: 'sin', pendiente: cantidad };

            this.props.newItem([item]);
        }

        this.props.navigation.navigate('Add');
    };

    renderForm = () => {
        if (this.state.promo === 'a+b') return <FormPromoAb onConfirmar={this.onConfirmar} />;
        if (this.state.promo === '%') return <FormPromoPorc onConfirmar={this.onConfirmar} />;
        if (this.state.promo === 'sin') return <FormPromoSin onConfirmar={this.onConfirmar} />;
    };

    render() {
        const articulo = this.props.navigation.getParam('articulo');

        return (
            <View style={styles.container}>
                <View style={styles.promocionContainer}>
                    <Ionicons name='ios-barcode' size={25} color='#f44336' />
                    <Text style={styles.promocionTitle}>{`${articulo.codigo} - ${articulo.descripcion}`}</Text>
                </View>
                <View style={styles.promocionContainer}>
                    <Ionicons name='ios-archive' size={25} color='#f44336' />
                    {this.state.loading ? <ActivityIndicator size="small" color="#f44336" /> : <Text style={styles.stockTitle}>{this.state.stock}</Text>}
                </View>
                <Picker selectedValue={this.state.promo} onValueChange={(value, index) => this.setState({ promo: value })} mode='dialog' prompt='Promociones'>
                    <Picker.Item label='A + B' value='a+b' />
                    <Picker.Item label='Descuento por %' value='%' />
                    <Picker.Item label='No aplica promoción' value='sin' />
                </Picker>
                {this.renderForm()}
            </View>
        )
    }
}

export default connect(null, { newItem })(Promocion);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    promocionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginHorizontal: 10,
    },
    promocionTitle: {
        color: '#f44336',
        marginLeft: 10
    },
    stockTitle: {
        marginLeft: 10,
        fontWeight: 'bold'
    }
});
