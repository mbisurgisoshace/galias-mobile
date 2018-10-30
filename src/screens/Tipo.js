import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';

import CustomList from '../components/CustomList';

import { setTipo } from '../redux/actions/pedido.actions';

const TIPOS = [
    'comun',
    'extra'
];

class Tipo extends Component {
    onTipoPressed = (tipo) => {
        tipo === 'comun' ? this.props.setTipo(false) : this.props.setTipo(true);
        this.props.navigation.navigate('Add', {icon: 'ios-add', method: 'onAdd'});
    };

    renderItem = ({ item }) => (
        <ListItem title={item.toUpperCase()} hideChevron onPress={() => this.onTipoPressed(item)} />
    );

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#b7160a" />
                <CustomList data={TIPOS} renderItem={this.renderItem} keyExtractor={item => item} />
            </View>
        )
    }
}

export default connect(null, { setTipo })(Tipo);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});
