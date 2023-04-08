import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';

import Recipe from '../../Components/Recipe'

export default function Favorites() {

  const isFocused = useIsFocused()

  const [foods, setFoods] = useState('');

  useEffect(() => {

    async function getFavoritesFoods() {
      const recipes = await AsyncStorage.getItem('@recipes')
      setFoods(JSON.parse(recipes) || [])
    }

    getFavoritesFoods();

  }, [isFocused])

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>
        Receitas favoritas
      </Text>

      <FlatList
        data={foods}
        renderItem={({ item }) => <Recipe data={item} />}
        showsVerticalScrollIndicator={false}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 36,
    padding: 15,
    flex: 1,
    backgroundColor: '#f3f9ff'
  },

  title: {
    marginTop: 18,
    fontSize: 28,
    fontWeight: 'bold'
  }
})