import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar, ScrollView, Modal } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import numeral from 'numeral';
import axios from 'axios';

import CustomList from '../components/CustomList';
import FloatingButton from '../components/FloatingButton';
import Spinner from '../components/Spinner';
import Prompt from '../components/Prompt';

import { syncNewPedido, setComentario, editItem, removeItem } from '../redux/actions/pedido.actions';
import Swipeout from 'react-native-swipeout';

numeral.register('locale', 'es', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal: function (number) {
        return number === 1 ? 'er' : 'ème';
    },
    currency: {
        symbol: '$'
    }
});

numeral.locale('es');

class AddPedido extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Total: ${navigation.getParam('total', 0)}`,
        headerStyle: {
            backgroundColor: '#f44336',
        },
        headerTintColor: '#fff',
        headerRight: (
            <TouchableOpacity style={{ marginRight: 15 }} onPress={navigation.getParam(`${navigation.getParam('method')}`)} disabled={navigation.getParam('disabled', false)}>
                <Ionicons name={`${navigation.getParam('icon')}`} size={25} color={navigation.getParam('disabled', false) ? 'rgba(199, 200, 202, 0.8)' : '#fff'} />
            </TouchableOpacity>
        )
    });

    state = {
        cantidad: '',
        item: {},
        ctacte: null,
        isModalOpen: false,
        loadingCtaCte: false,
        isModalCtaCteOpen: false
    };

    componentDidMount() {
        const total = this.formatAmount(this.calculateTotal(this.props.pedido.items));
        this.props.navigation.setParams({ total, onAdd: this.onAdd, onSync: this.onConfirmarPedido });
    };

    componentDidUpdate(prevProps) {
        if (prevProps.pedido.items !== this.props.pedido.items) {
            const total = this.formatAmount(this.calculateTotal(this.props.pedido.items));
            this.props.navigation.setParams({ total });
        }
    };

    isDisabled = () => {
        if (!this.props.pedido.cliente || this.props.pedido.items.length === 0) {
            return true;
        }
    };

    isDisabledCtaCte = () => {
        if (!this.props.pedido.cliente) {
            return true;
        }
    };

    isLoading = (loading) => {
        if (loading) {
            return (
                <Spinner />
            )
        }
    };

    calculateTotal = (items) => items.reduce((prev, curr) => prev + (curr.cantidad * curr.precio), 0);

    formatDate = date => moment(date).format('DD/MM/YYYY');

    formatAmount = amount => numeral(amount).format('$0,0.00');

    onAdd = () => {
        this.props.navigation.navigate('Articulo');
    };

    onEdit = (item, index) => {
        this.setState({ isModalOpen: true, item: { item, index } });
    };

    onDelete = (index) => {
        this.props.removeItem(index);
    };

    onSearchCliente = () => {
        this.props.navigation.navigate('Cliente');
    };

    onCtaCte = async () => {
        try {
            this.setState({ loadingCtaCte: true });

            const request = await axios.get(`http://centrocompartido.engux.com.ar:8099/galias-server-backend/ctacte/pendientes/${this.props.pedido.cliente.codigo}`);

            if (request.status === 200) {
                this.setState({ isModalCtaCteOpen: true, ctacte: request.data, loadingCtaCte: false });
            }
        } catch (err) {
            console.log(err);
            this.setState({ loadingCtaCte: false });
        }
    };

    onConfirmarPedido = () => {
        this.props.syncNewPedido(this.props.pedido, this.props.navigation, this.props.navigation.getParam('index', null));
    };

    onCancelModal = () => {
        this.setState({ cantidad: '', item: {}, isModalOpen: false });
    }

    onSaveModal = () => {
        const { item, index } = this.state.item;
        const cant = parseInt(this.state.cantidad, 10);

        item.cantidad = cant;

        this.props.editItem(item, index);

        this.setState({ cantidad: '', item: {}, isModalOpen: false });
    }

    renderItem = ({ item, index }) => {
        const swipeButtons = [
            { component: (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Ionicons style={{ alignSelf: 'center' }} name='ios-settings' size={20} color='#fff' /></View>), backgroundColor: '#3464f4', onPress: () => this.onEdit(item, index) },
            { component: (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Ionicons style={{ alignSelf: 'center' }} name='ios-trash' size={20} color='#fff' /></View>), backgroundColor: '#f44336', onPress: () => this.onDelete(index) },
        ];

        return (
            <Swipeout right={swipeButtons} backgroundColor='transparent'>
                <ListItem title={(
                    <View style={styles.itemContainer}>
                        <Text style={{ flex: 3, fontSize: 11 }}>{item.articulo.descripcion}</Text>
                        <Text style={{ flex: 1, fontSize: 12, textAlign: 'right' }}>{item.cantidad}</Text>
                        <Text style={{ flex: 1.5, fontSize: 12, textAlign: 'right' }}>{this.formatAmount(item.precio)}</Text>
                    </View>
                )} hideChevron />
            </Swipeout>
        );
    };

    renderModalItem = ({ item }) => {
        const color = this.isVencido(item.fecha, this.props.pedido.cliente.condicionPago);

        return (
            <ListItem title={(
                <View>
                    <Text style={styles.ctacteFac}>{`${item.tipoComp} ${item.comprobante}`}</Text>
                    <View style={styles.ctacteDatosContainer}>
                        <Text style={{ color }}>{this.formatDate(item.fecha)}</Text>
                        <Text style={[styles.ctacteImporte, { color }]}>{this.formatAmount(item.importe)}</Text>
                    </View>
                </View>
            )} hideChevron />
        )
    };

    isVencido = (fecha, dias) => {
        const fechaActual = moment(new Date()).hour(0).minute(0).second(0).millisecond(0);
        const fechaVencimiento = moment(fecha).add(dias, 'days');

        if (fechaVencimiento < fechaActual) {
            return '#f44336'
        } else {
            return '#000'
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#b7160a" />
                <View style={styles.clienteContainer}>
                    <Ionicons name='ios-person' size={25} color='#f44336' />
                    <View style={styles.razonSocialContainer}>
                        <Text style={styles.razonSocial}>{this.props.pedido.cliente ? this.props.pedido.cliente.razonSocial : undefined}</Text>
                        <TouchableOpacity onPress={this.onSearchCliente}>
                            <Ionicons name='ios-search' size={25} color='#f44336' />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={this.onCtaCte} disabled={this.isDisabledCtaCte()} >
                        <Ionicons name='ios-paper' size={25} color={this.isDisabledCtaCte() ? 'rgba(199, 200, 202, 0.8)' : '#f44336'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.comentarioContainer}>
                    <Ionicons name='ios-paper' size={25} color='#f44336' />
                    <TextInput style={styles.comentario} placeholder='Comentario' onChangeText={(text) => this.props.setComentario(text)} />
                </View>
                <View style={styles.pedidoContainer}>
                    <Ionicons name='ios-cart' size={25} color='#f44336' />
                    <ScrollView>
                        <CustomList data={this.props.pedido.items} keyExtractor={(item, index) => index.toString()} renderItem={this.renderItem} />
                    </ScrollView>
                </View>
                {this.props.pedido._id ? null : <FloatingButton onPress={this.onConfirmarPedido} disabled={this.isDisabled()} />}
                {this.isLoading(this.props.loading || this.state.loadingCtaCte)}
                {this.state.isModalOpen ? (
                    <Prompt title='Editar' description='Ingrese la nueva cantidad' cancelBtn='Cancelar' submitBtn='Guardar' onCancel={this.onCancelModal} onSubmit={this.onSaveModal}>
                        <TextInput value={this.state.cantidad} style={styles.input} onChangeText={(text) => this.setState({ cantidad: text })} keyboardType='number-pad' />
                    </Prompt>
                ) : null}
                <Modal animationType='slide' transparent={false} visible={this.state.isModalCtaCteOpen} onRequestClose={() => this.setState({ isModalCtaCteOpen: false })}>
                    <View style={styles.ctacteContainer}>
                        <Ionicons name='ios-paper' size={25} color='#f44336' />
                        <Text style={styles.ctacteTitle}>{this.state.ctacte ? `Cuenta Corriente - ${this.formatAmount(this.state.ctacte.total)}` : 'Cuenta Corriente'}</Text>
                    </View>
                    <ScrollView>
                        <CustomList data={this.state.ctacte ? this.state.ctacte.pendientes : []} keyExtractor={item => item.id.toString()} renderItem={this.renderModalItem} />
                    </ScrollView>
                </Modal>
            </View>
        )
    };
};

const mapStateToProps = (state) => {
    return { pedido: state.pedido.pedido, loading: state.pedido.loading };
};

export default connect(mapStateToProps, { syncNewPedido, setComentario, editItem, removeItem })(AddPedido);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 0
    },
    clienteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginHorizontal: 10,
    },
    razonSocialContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#34495e',
        marginHorizontal: 10,
        padding: 5
    },
    razonSocial: {
        flex: 1
    },
    ctacteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginHorizontal: 10,
    },
    ctacteTitle: {
        color: '#f44336',
        marginLeft: 10
    },
    ctacteFac: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#34495e'
    },
    ctacteDatosContainer: {
        flexDirection: 'row'
    },
    ctacteImporte: {
        flex: 1,
        textAlign: 'right'
    },
    comentarioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginHorizontal: 10,
    },
    comentario: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#34495e',
        marginHorizontal: 10,
        padding: 5
    },
    pedidoContainer: {
        flex: 1,
        marginTop: 15,
        marginHorizontal: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5
    },
    floatingButton: {
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        left: 10,
        borderRadius: 50,
        backgroundColor: 'rgba(244, 67, 54, 0.8)'
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#000',
        width: '90%',
        padding: 5,
        marginBottom: 10,
        color: '#000'
    }
});