import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { List } from 'react-native-elements';

export default class CustomList extends Component {
    render() {
        return (
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop: 0 }}>
                <FlatList data={this.props.data}
                    keyExtractor={this.props.keyExtractor}
                    renderItem={this.props.renderItem}
                    refreshControl={this.props.refreshControl}
                    onRefresh={this.props.onRefresh}
                    refreshing={this.props.refreshing} />
            </List>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});
