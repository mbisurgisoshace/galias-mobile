import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

import CustomList from './CustomList';

export default class FilterableList extends Component {
    render() {
        return (
            <View style={styles.container}>
                <SearchBar lightTheme round icon={{ type: 'ionicon', name: 'ios-search' }} placeholder={this.props.placeholder} onChangeText={this.props.onChangeText} />
                <CustomList data={this.props.data} keyExtractor={this.props.keyExtractor} renderItem={this.props.renderItem} refreshControl={this.props.refreshControl} onRefresh={this.props.onRefresh} refreshing={this.props.refreshing} />
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});
