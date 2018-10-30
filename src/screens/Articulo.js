import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';

import FilterableList from '../components/FilterableList';

import { getArticulos, setFilterArticulo } from '../redux/actions/articulo.actions';

class Articulo extends Component {
    static navigationOptions = {
        header: null
    }

    componentWillUnmount() {
        this.props.setFilterArticulo('');
    }

    onFilterChange = text => {
        this.props.setFilterArticulo(text);
    };

    onItemPress = (item) => {
        this.props.navigation.navigate('Promocion', { articulo: item });
    };

    onRefresh = () => {
        this.props.getArticulos();
    };

    renderItem = ({ item }) => (
        <ListItem title={(
            <View>
                <Text>{item.codigo}</Text>
                <Text>{item.descripcion}</Text>
            </View>
        )} hideChevron onPress={() => this.onItemPress(item)} />
    );

    render() {
        return (
            <View style={styles.container}>
                <FilterableList data={this.props.articulos}
                    keyExtractor={item => item._id}
                    onChangeText={this.onFilterChange}
                    renderItem={this.renderItem}
                    placeholder='Buscar por código o descripción...'
                    onRefresh={this.onRefresh}
                    refreshing={this.props.loading} />
            </View>
        )
    }
};

const filter = (articulos, text) => {
    if (text.length === 0) {
        return articulos;
    } else if (isNaN(parseInt(text, 10))) {
        return articulos.filter(item => item.descripcion.toLowerCase().includes(text.toLowerCase()));
    } else {
        return articulos.filter(item => item.codigo.includes(text));
    }
};

const mapStateToProps = (state) => {
    return { articulos: filter(state.articulo.articulos, state.articulo.filter), loading: state.articulo.loading }
};

export default connect(mapStateToProps, { getArticulos, setFilterArticulo })(Articulo);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});