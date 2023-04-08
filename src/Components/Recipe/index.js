import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

export default function Recipe({ data }) {

  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detail', { ...data })}
      style={styles.container}
    >
      <Image
        source={{ uri: data.cover }}
        style={styles.image}
      />
      <View style={styles.containerInfo}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.details}>{data.total_ingredients} ingredientes | {data.time} minutos</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
    borderRadius: 6
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 6,
    opacity: 0.9
  },
  containerInfo: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    marginLeft: 10,
    marginBottom: 10
  },
  name: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold'
  },
  details: {
    color: '#fff',
    fontSize: 16,
  }
})