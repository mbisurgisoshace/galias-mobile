import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Icon } from 'react-native-elements';

import Spinner from '../components/Spinner';

import { setPedidos } from '../redux/actions/pedido.actions';
import { getClientes } from '../redux/actions/cliente.actions';
import { getArticulos } from '../redux/actions/articulo.actions';

class Settings extends Component {
    static navigationOptions = {
        header: null
    };

    state = {
        loading: false
    }

    onSincronizar = () => {
        this.props.getClientes();
        this.props.getArticulos();
    };

    onBorrarDatos = async () => {
        try {
            this.setState({ loading: true });

            await AsyncStorage.removeItem('pedidos');

            this.props.setPedidos([]);

            this.setState({ loading: false });
        } catch (err) {
            console.log(err);
        }
    };

    onCerrarSesion = async () => {
        try {
            this.setState({ loading: true });

            await AsyncStorage.removeItem('token');

            this.props.navigation.navigate('Login');
        } catch (err) {
            console.log(err);
        }
    };

    isLoading = (loading1, loading2) => {
        if (loading1 || loading2) {
            return (
                <Spinner />
            )
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#b7160a" />
                <ListItem title='Sincronizar' key='sincronizar' rightIcon={<Icon containerStyle={{ width: 30 }} name='ios-sync' type='ionicon' color='#f44336' />} onPress={this.onSincronizar} />
                <ListItem title='Borrar Datos' key='borrar datos' rightIcon={<Icon containerStyle={{ width: 30 }} name='ios-trash' type='ionicon' color='#f44336' />} onPress={this.onBorrarDatos} />
                <ListItem title='Cerrar Sesion' key='cerrar sesion' rightIcon={<Icon containerStyle={{ width: 30 }} name='ios-log-out' type='ionicon' color='#f44336' />} onPress={this.onCerrarSesion} />
                {this.isLoading(this.state.loading, this.props.loading)}
            </View>
        )
    }
};

const mapStateToProps = (state) => {
    return { loading: state.cliente.loading && state.articulo.loading };
}

export default connect(mapStateToProps, { setPedidos, getClientes, getArticulos })(Settings);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});