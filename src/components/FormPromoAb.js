import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FloatingButton from './FloatingButton';

export default class FormPromoAb extends Component {
    state = {
        cantidadA: '',
        cantidadB: ''
    }

    isDisabled = () => {
        if (this.state.cantidadA === '' || this.state.cantidadB === '') {
            return true;
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput value={this.state.cantidadA} style={styles.cantidad} onChangeText={(text) => this.setState({ cantidadA: text })} keyboardType='number-pad' placeholder='Cantidad (A)' />
                <TextInput value={this.state.cantidadB} style={styles.cantidad} onChangeText={(text) => this.setState({ cantidadB: text })} keyboardType='number-pad' placeholder='Cantidad (B)' />
                {/* <TouchableOpacity style={this.isDisabled() ? [styles.floatingButton, styles.floatingButtonDisabled] : styles.floatingButton} onPress={() => this.props.onConfirmar(this.state)} disabled={this.isDisabled()}>
                    <Ionicons name='ios-done-all' size={30} color='#fff' />
                </TouchableOpacity> */}
                <FloatingButton onPress={() => this.props.onConfirmar(this.state)} disabled={this.isDisabled()} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    cantidad: {
        borderBottomWidth: 1,
        borderBottomColor: '#34495e',
        marginHorizontal: 10,
        padding: 5
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
    floatingButtonDisabled: {
        backgroundColor: 'rgba(199, 200, 202, 0.8)'
    }
});