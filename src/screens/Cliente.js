import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomList from '../components/CustomList';
import FilterableList from '../components/FilterableList';

import { getClientes, setFilterCliente } from '../redux/actions/cliente.actions';
import { setCliente, setSucursal } from '../redux/actions/pedido.actions';

class Cliente extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        cliente: null,
        isModalOpen: false
    };

    componentWillUnmount() {
        this.props.setFilterCliente('');
    }

    onFilterChange = text => {
        this.props.setFilterCliente(text);
    };

    onItemPress = (item) => {
        this.props.setCliente(item);
        this.setState({ isModalOpen: true, cliente: item });
    };

    onModalItemPress = (item) => {
        this.props.setSucursal(item);
        this.props.navigation.navigate('Add');
    };

    onRefresh = () => {
        this.props.getClientes();
    };

    renderItem = ({ item }) => (
        <ListItem title={(
            <View>
                <Text>{item.codigo}</Text>
                <Text>{item.razonSocial}</Text>
            </View>
        )} hideChevron onPress={() => this.onItemPress(item)} />
    );

    renderModalItem = ({ item }) => (
        <ListItem title={(
            <View>
                <Text>{`${item.calle} ${item.altura}`}</Text>
                <Text>{`${item.localidad}`}</Text>
            </View>
        )} hideChevron onPress={() => this.onModalItemPress(item)} />
    );

    render() {
        return (
            <View style={styles.container}>
                <FilterableList data={this.props.clientes}
                    keyExtractor={item => item._id}
                    onChangeText={this.onFilterChange}
                    renderItem={this.renderItem}
                    placeholder='Buscar por código o razón social...'
                    onRefresh={this.onRefresh}
                    refreshing={this.props.loading} />
                <Modal animationType='slide' transparent={false} visible={this.state.isModalOpen} onRequestClose={() => this.setState({ isModalOpen: false })}>
                    <View style={styles.sucursalContainer}>
                        <Ionicons name='ios-business' size={25} color='#f44336' />
                        <Text style={styles.sucursalTitle}>Sucursales</Text>
                    </View>
                    <CustomList data={this.state.cliente ? this.state.cliente.sucursales : []} keyExtractor={item => item._id} renderItem={this.renderModalItem} />
                </Modal>
            </View>
        )
    }
};

const filter = (clientes, text) => {
    if (text.length === 0) {
        return clientes;
    } else if (isNaN(parseInt(text, 10))) {
        return clientes.filter(item => item.razonSocial.toLowerCase().includes(text.toLowerCase()));
    } else {
        return clientes.filter(item => item.codigo.toString().includes(text));
    }
};

const mapStateToProps = (state) => {
    return { clientes: filter(state.cliente.clientes, state.cliente.filter), loading: state.cliente.loading }
};

export default connect(mapStateToProps, { getClientes, setFilterCliente, setCliente, setSucursal })(Cliente);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    sucursalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginHorizontal: 10,
    },
    sucursalTitle: {
        color: '#f44336',
        marginLeft: 10
    }
});