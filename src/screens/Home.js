import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomList from '../components/CustomList';
import Spinner from '../components/Spinner';

import { newPedido, setPedido, setPedidos } from '../redux/actions/pedido.actions';
import { setClientes, getClientes } from '../redux/actions/cliente.actions';
import { setArticulos, getArticulos } from '../redux/actions/articulo.actions';

const data = [
    { id: '1', cliente: 'ALBERTUS DANIEL OMAR', total: 150.55, enviado: false },
    { id: '2', cliente: 'CYCOMAT SRL', total: 180.15, enviado: false },
    { id: '3', cliente: 'MORELLI CRISTIAN', total: 200.44, enviado: true },
    { id: '4', cliente: 'ESOPO SRL', total: 1055.22, enviado: false }
];

class Home extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerRight: (
            <TouchableOpacity style={{ marginRight: 15 }} onPress={navigation.getParam('onAdd')}>
                <Ionicons name='ios-cart' size={25} color='#fff' />
            </TouchableOpacity>
        )
    });

    componentDidMount() {
        this.init();
        this.props.navigation.setParams({ onAdd: this.onAdd });
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.pedidos !== this.props.pedidos) {
            await AsyncStorage.setItem('pedidos', JSON.stringify(this.props.pedidos));
        }
    }

    async init() {
        const pedidos = await AsyncStorage.getItem('pedidos');
        const clientes = await AsyncStorage.getItem('clientes');
        const articulos = await AsyncStorage.getItem('articulos');

        pedidos ? this.props.setPedidos(JSON.parse(pedidos)) : this.props.setPedidos([]);

        if (clientes) {
            this.props.setClientes(JSON.parse(clientes));
        } else {
            this.props.getClientes();
        }

        if (articulos) {
            this.props.setArticulos(JSON.parse(articulos));
        } else {
            this.props.getArticulos();
        }
    }

    onAdd = () => {
        this.props.newPedido();
        this.props.navigation.navigate('Tipo');
    }

    isLoading = (loading) => {
        if (loading) {
            return (
                <Spinner />
            )
        }
    };

    onItemPress = (item, index) => {
        this.props.setPedido(item);
        this.props.navigation.navigate('Add', { icon: 'ios-cloud-upload', method: 'onSync', index, disabled: item._id ? true : false });
    };

    renderItem = ({ item, index }) => (
        <ListItem title={(
            <View style={styles.itemContainer}>
                <View>
                    <Text>{`# ${item._id ? item._id : ''}`}</Text>
                    <Text>{item.cliente.razonSocial}</Text>
                </View>
                <Ionicons name='ios-cloud-done' size={20} color={item.enviado ? '#6cbe45' : '#f44336'} />
            </View>
        )} hideChevron onPress={() => this.onItemPress(item, index)} />
    );

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#b7160a" />
                <CustomList data={this.props.pedidos} renderItem={this.renderItem} keyExtractor={(item, index) => index.toString()} />
                {this.isLoading(this.props.loading)}
            </View>
        )
    }
};

const mapStateToProps = (state) => {
    return { pedidos: state.pedido.pedidos, loading: state.cliente.loading && state.articulo.loading }
}

export default connect(mapStateToProps, { newPedido, setPedido, setPedidos, setClientes, getClientes, setArticulos, getArticulos })(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    syncContainer: {
        width: 15,
        height: 15,
        borderRadius: 50,
        backgroundColor: 'red'
    }
});