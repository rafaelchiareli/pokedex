import React, { useEffect, useState } from 'react';
import { fetchPokemonDetails } from '../services/api';
import { ActivityIndicator, Image, View, Text, StyleSheet } from 'react-native'; // <--- Importamos o 'Text' aqui
import PokemonInfo from './PokemonInfo';

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
        <PokemonInfo pokemon={pokemon} />
    );
}
