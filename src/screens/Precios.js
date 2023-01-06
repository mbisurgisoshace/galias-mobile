import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { ListItem } from 'react-native-elements';

import FilterableList from '../components/FilterableList';

import { getArticulos, setFilterArticulo } from '../redux/actions/articulo.actions';

class Precios extends Component {
    static navigationOptions = {
        header: null
    }

    componentWillUnmount() {
        this.props.setFilterArticulo('');
    }

    onFilterChange = text => {
        this.props.setFilterArticulo(text);
    };

    onRefresh = () => {
        this.props.getArticulos();
    };

    renderItem = ({ item }) => (
        <ListItem title={(
            <View>
                <Text>{item.codigo}</Text>
                <Text>{item.descripcion}</Text>
                <Text>{numeral(item.precioVta).format('$0,0.00')}</Text>
            </View>
        )} hideChevron />
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

export default connect(mapStateToProps, { getArticulos, setFilterArticulo })(Precios);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});
