import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'

export default function Header({ data }) {

    const navigate = useNavigation();

    const [isFavorite, setIsFavorite] = useState(false);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {

        async function getFavoriteRecipes() {
            const response = await AsyncStorage.getItem('@recipes');

            const recipes = response ? JSON.parse(response) : [];

            setFavorites(recipes)

            const recipeIsAlreadyFavorite = recipes.find(recipe => recipe.id === data.id) || null;

            if (recipeIsAlreadyFavorite) {
                setIsFavorite(true)
            }
        }

        getFavoriteRecipes()

    }, [])


    async function handleFavorite() {
        setIsFavorite(!isFavorite);

        const reciveIsAlreadyFavorite = favorites.find(recipe => recipe.id == data.id) || null;

        if (!reciveIsAlreadyFavorite) {
            setFavorites([...favorites, data]);
            await AsyncStorage.setItem('@recipes', JSON.stringify([...favorites, data]))

        } else {
            const recipes = favorites.filter(recipe => recipe.id !== data.id)
            setFavorites(recipes);
            await AsyncStorage.setItem('@recipes', JSON.stringify(recipes))
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigate.goBack()}>
                    <Ionicons name='arrow-back' size={22} />
                </TouchableOpacity>
                <Text style={styles.name}>{data.name}</Text>
            </View>
            <TouchableOpacity onPress={() => handleFavorite()}>
                <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} color='#FF4141' size={26} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 36,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 10,
        height: 60,
        backgroundColor: '#fff'
    },
    name: {
        fontSize: 22,
        marginLeft: 8
    }

})