import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class FloatingButton extends Component {
    render() {
        return (
            <TouchableOpacity style={this.props.disabled ? [styles.floatingButton, styles.floatingButtonDisabled] : styles.floatingButton} onPress={this.props.onPress} disabled={this.props.disabled}>
                <Ionicons name='ios-done-all' size={30} color='#fff' />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
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