import React, { useEffect, useState } from 'react';
import {
    View, Text, FlatList,
    TouchableOpacity, StyleSheet, ActivityIndicator
} from 'react-native';
import { fetchPokemons } from '../services/api';


export default function HomeScreen({ navigation }) {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function loadData() {
            const data = await fetchPokemons();
            setPokemons(data);
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
                    <TouchableOpacity style={styles.item}
                        onPress={() => navigation.navigate('Details', { pokemonUrl: item.url })}>
                        <Text style={styles.text}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 16
    },
    item: {
        padding: 20,
        backgroundColor: '#eee',
        marginBottom: 10,
        borderRadius: 8
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16
    }


});