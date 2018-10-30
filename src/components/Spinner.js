import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

export default Spinner = () => (
    <View style={styles.spinner}>
        <ActivityIndicator size="large" color="#f44336" />
    </View>
);

const styles = StyleSheet.create({
    spinner: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    }
});