import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { api } from '../../services/api';

import Recipe from '../../Components/Recipe'

export default function Home({ navigation }) {

  const isFocused = useIsFocused();

  const [food, setFood] = useState('');
  const [foods, setFoods] = useState('');

  useEffect(() => {

    async function getAllFoods() {

      try {
        const response = await api.get('/foods');
        setFoods(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    getAllFoods();

  }, [isFocused])

  async function searchFoods() {
    if (food === '') return

    const response = await api.get(`/foods?name_like=${food}`)
    setFood('');
    navigation.navigate('Search', { data: response.data })
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.logo}>
        <Text style={styles.logoLabel}>Receita Fácil</Text>
      </View>

      <Text style={styles.title}>
        Encontre a receita que combina com você
      </Text>

      <View style={styles.input}>
        <TextInput
          value={food}
          onChangeText={value => setFood(value)}
          placeholder='Digite o nome da comida'
        />
        <TouchableOpacity onPress={() => searchFoods()}>
          <Ionicons name='search' size={26} color="#46BD6A" />
        </TouchableOpacity>
      </View>

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

  logo: {
    backgroundColor: '#68D988',
    width: '50%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 40

  },
  logoLabel: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold'
  },

  title: {
    marginTop: 18,
    fontSize: 32,
    fontWeight: 'bold'
  },

  input: {
    marginTop: 18,
    backgroundColor: '#fff',
    borderRadius: 6,
    height: 50,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }

})