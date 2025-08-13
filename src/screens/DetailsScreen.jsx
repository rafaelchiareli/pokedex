import React, { useEffect, useState } from 'react';
import { fetchPokemonDetails } from '../services/api';
import { ActivityIndicator, Image, View, Text } from 'react-native'; // <--- Importamos o 'Text' aqui

export default function DetailsScreen({ route }) {
    const { pokemonUrl } = route.params;
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        async function loadDetails() {
            const data = await fetchPokemonDetails(pokemonUrl);
            setPokemon(data);
        }
        loadDetails();
    }, [pokemonUrl]); // <--- Adicionamos a dependência 'pokemonUrl'

    if (!pokemon) {
        return <ActivityIndicator style={{ marginTop: 50 }} size='large' />;
    }

    return (
        <View>
            <Text>{pokemon.name}</Text>
            <Image
                source={{ uri: pokemon.sprites.front_default }}
                style={{ width: 150, height: 150 }}
            />
            <Text>Altura: {pokemon.height}</Text>
            <Text>Peso: {pokemon.weight}</Text>
            <Text>
                Tipos: {pokemon.types.map(t => t.type.name).join(', ')}
            </Text>
        </View>
    );
}