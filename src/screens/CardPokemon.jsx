import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View , Image} from 'react-native';
import { typeColors } from '../utils/typeColors';
export default function CardPokemon({ name, onPress, url }) {
    const [type, setType] = useState(null);

    const getPokemonId = () => {
        const parts = url.split('/').filter(Boolean);
    
        return parts[parts.length - 1];
    }

    const id = getPokemonId();
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                     console.log(imageUrl);
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url);
                const data = await res.json();
              
                setType(data?.types?.[0]?.type?.name ?? null);
            } catch { }
        })();

    }, [url]);

    const backgroundColor = (typeColors?.[type]) || "#f5f5f5"; //pega a cor definida para o type no typecolors
    const textColor = type ? "#fff" : "#222" ;//se o tipo tiver uma cor, coloca a cor do texto clara

    return (

        <TouchableOpacity  style={[styles.card, { backgroundColor }]} onPress={onPress}>

            <View style={styles.content}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
                <Text style={[styles.name, {textColor}]} numberOfLines={1}>
                    {name}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 8,
        margin: 6,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 140,
        elevation: 2,
        shadowColor: "#000",
    
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
    },
    content: {
        alignItems: 'center',
        width: '100%',
    },
    image: {
        width: 96,
        height: 96,
        resizeMode: 'contain'
    },
    name: {
        marginTop: 7,
        fontWeight: '700',
        fontSize: 14,
        textAlign: 'center'
    }
})