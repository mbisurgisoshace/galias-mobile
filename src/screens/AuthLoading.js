import React, { Component } from 'react';
import { StatusBar, ActivityIndicator, StyleSheet, View, AsyncStorage } from 'react-native';

export default class AuthLoading extends Component {
    componentDidMount() {
        this.isAuthenticate();
    }

    isAuthenticate = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            this.props.navigation.navigate(token ? 'App' : 'Auth');
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <ActivityIndicator />
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});