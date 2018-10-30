import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, Animated, View, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Spinner from '../components/Spinner';

import { login } from '../redux/actions/auth.actions';

class Login extends Component {
    static navigationOptions = {
        header: null
    };

    state = {
        user: '',
        password: '',
        errorFadeIn: new Animated.Value(-10)
    }

    onLogin = () => {
        this.setState({ errorFadeIn: new Animated.Value(-10) });
        this.props.login(this.state.user, this.state.password, this.props.navigation);
    };

    renderError = () => {
        if (this.props.error) {
            Animated.timing(this.state.errorFadeIn, { toValue: 10, duration: 250 }).start();

            return (
                <Animated.Text style={{ position: 'absolute', bottom: this.state.errorFadeIn, backgroundColor: 'rgba(244, 67, 54, 0.5)', width: '100%', padding: 10, textAlign: 'center', color: '#fff' }}>{this.props.error}</Animated.Text>
            )
        }
    };

    isLoading = (loading) => {
        if (loading) {
            return (
                <Spinner />
            )
        }
    };

    render() {
        return (
            <ImageBackground source={require('../assets/img/fondo-min.jpg')} style={styles.container}>
                <StatusBar hidden={true} />
                <View style={styles.overlay} />
                <TextInput style={styles.input} placeholder='Usuario' autoCapitalize='none' autoCorrect={false} value={this.state.user} onChangeText={(text) => { this.setState({ user: text }) }} placeholderTextColor='#fff' />
                <TextInput style={styles.input} placeholder='Contraseña' autoCapitalize='none' autoCorrect={false} value={this.state.password} onChangeText={(text) => { this.setState({ password: text }) }} secureTextEntry placeholderTextColor='#fff' />
                <TouchableOpacity onPress={this.onLogin}>
                    <Ionicons name='ios-log-in' size={40} color='#fff' />
                </TouchableOpacity>
                {this.renderError()}
                {this.isLoading(this.props.loading)}
            </ImageBackground>
        )
    }
};

const mapStateToProps = (state) => {
    return { error: state.auth.error, loading: state.auth.loading };
}

export default connect(mapStateToProps, { login })(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#fff',
        width: '75%',
        padding: 5,
        marginBottom: 10,
        color: '#fff'
    },
    error: {
        position: 'absolute',
        alignSelf: 'flex-end'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.2)'
    }
});