import React, { useEffect, useState } from 'react';
import {
    View, Text, FlatList,
    TouchableOpacity, StyleSheet, ActivityIndicator
} from 'react-native';
import { fetchPokemons } from '../services/api';
import CardPokemon from './CardPokemon';


export default function HomeScreen({ navigation }) {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [isFetchinMore, setIsFetchingMore] = useState(false)

    const LIMIT = 20;

    async function LoadMorePokemons(){
        if (isFetchinMore) return;
        setIsFetchingMore(true);
        const data = await fetchPokemons(LIMIT, offset);
        setPokemons((prev) =>[...prev, ...data]);
        setOffset((prev) => prev + LIMIT);
        setIsFetchingMore(false);
    }
    useEffect(() => {
        async function loadData() {
            const data = await fetchPokemons(LIMIT, 0);
            setPokemons(data);
            setOffset(LIMIT);
            setLoading(false);
        }
        loadData();
    }, []);
    if (loading) return <ActivityIndicator style={{ marginTop: 50 }} size="large" />

    return (
        <View style={styles.container}>
            <FlatList
                data={pokemons}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <CardPokemon 
                    onPress={() => navigation.navigate('Details', { pokemonUrl: item.url })}
                    name={item.name}
                    url={item.url}
                   />
                )}
                numColumns={2}
                contentContainerStyle={styles.listContent}
                columnWrapperStyle={styles.column}
                onEndReached={LoadMorePokemons}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    isFetchinMore && <ActivityIndicator style={{
                        marginVertical: 20 
                    }} /> 
                }
            /> 

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,   
    },
    
    listContent: {
        paddingHorizontal:8, paddingVertical: 10
    },
    column: {
        justifiContent: 'space-between', 

    }


});