import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FloatingButton from './FloatingButton';

export default class FormPromoPorc extends Component {
    state = {
        cantidad: '',
        porcentaje: ''
    }

    isDisabled = () => {
        if (this.state.cantidad === '' || this.state.porcentaje === '') {
            return true;
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput value={this.state.cantidad} style={styles.cantidad} onChangeText={(text) => this.setState({ cantidad: text })} keyboardType='number-pad' placeholder='Cantidad' />
                <TextInput value={this.state.porcentaje} style={styles.cantidad} onChangeText={(text) => this.setState({ porcentaje: text })} keyboardType='number-pad' placeholder='%' />
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