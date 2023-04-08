import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'

import Recipe from '../../Components/Recipe';

export default function Search({ route, navigation }) {

  const recipes = route.params.data;
  
  return (
    <>
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name='arrow-back' size={22} />
          </TouchableOpacity>
          <Text style={styles.title}>Veja o que encontramos</Text>
        </View>
      </View>

      <View style={styles.container}>
        <FlatList 
          data={recipes}
          renderItem={({item}) => <Recipe data={item}/>}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    height: 60,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 18,
    marginLeft: 8
  },

  container: {
    padding: 15,
    flex: 1,
    backgroundColor: '#f3f9ff'
  }

})