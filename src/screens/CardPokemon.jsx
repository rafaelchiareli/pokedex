import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CardPokemon({name, onPress}){
    return (

        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Text style={styles.text}>{name}</Text>
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    card:{
        padding: 20,
        backgroundColor: "#9c5454ff",
        marginBottom: 10,
        borderRadius: 8
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18
    }
})