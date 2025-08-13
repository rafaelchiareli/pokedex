import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function PokemonInfo({pokemon}){
    return (
        <View style={styles.container}>
                    <Text style={styles.name}>{pokemon.name}</Text>
                    <Image
                        source={{ uri: pokemon.sprites.front_default }}
                        style={styles.pokemonImage }
                    />
                    <Text style={styles.detail}>Altura: {pokemon.height}</Text>
                    <Text style={styles.detail}>Peso: {pokemon.weight}</Text>
                    <Text style={styles.detail}>
                        Tipos: {pokemon.types.map(t => t.type.name).join(', ')}
                    </Text >
                </View>
        
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40
    },
    name: {
        fontSize: 36,
        fontWeigth: 'bold',
        marginBotton: '12'
    },
    detail: {
        fontSize: 18,
        marginTop: 8
    },
    pokemonImage: {
        width: 200, height: 200
    }


});