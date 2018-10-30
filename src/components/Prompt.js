import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default class Prompt extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.prompt}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.description}>{this.props.description}</Text>
                    {this.props.children}
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.btnCancel}>{this.props.cancelBtn}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.props.onSubmit}>
                            <Text style={styles.btnSubmit}>{this.props.submitBtn}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    prompt: {
        borderRadius: 5,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 1,
        backgroundColor: '#fff',
        padding: 15
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 10
    },
    description: {
        marginBottom: 5
    },
    buttons: {
        flexDirection: 'row',
        alignSelf: 'flex-end'
    },
    btnCancel: {
        fontWeight: '300',
        color: '#f44336',
        marginRight: 15 
    },
    btnSubmit: {
        fontWeight: '300',
        color: '#6cbe45' 
    }
});