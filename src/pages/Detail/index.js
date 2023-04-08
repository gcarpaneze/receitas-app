import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Share, Modal } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'

import Header from '../../Components/Header';
import VideoPreview from '../../Components/VideoPreview';

export default function Detail({ navigation, route }) {

  const [showModal, setShowModal] = useState(false);

  const recipe = route.params;

  async function handleShareRecipe() {
    await Share.share({
      message: `Compartilhe a receita ${recipe?.name}`
    })
  }

  return (

    <>
      <Header data={recipe} />

      <View style={styles.container}>

        <View>
          <Image
            source={{ uri: recipe.cover }}
            style={styles.image}
          />

          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={styles.btnPlay}
          >
            <Ionicons name='play-circle-outline' size={32} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.containerDetails}>
          <View >
            <Text style={styles.recipeName}>{recipe.name}</Text>
            <Text style={styles.amountIngredients}>Ingredientes: {recipe.total_ingredients}</Text>
          </View>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => handleShareRecipe()}
          >
            <Ionicons name="share-social-outline" size={30} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
        >

          {recipe.ingredients.map(ingredient => {
            return (
              <View
                key={ingredient.id}
                style={styles.ingredientName}
              >
                <Text style={{ fontWeight: 'bold' }}>{ingredient.name}</Text>
                <Text>{ingredient.amount}</Text>
              </View>
            )
          })}

          <View style={styles.instructionContainerTitle}>
            <Text style={styles.instructionContainerTitleLabel}>Modo de preparo</Text>
          </View>

          {recipe.instructions.map(instruction => {
            return (
              <View
                key={instruction.id}
                style={styles.instructionItemContainer}
              >
                <Text style={styles.sequenceInstruction}>{instruction.id} - </Text>
                <Text style={styles.descriptionInstruction}>{instruction.text}</Text>
              </View>
            )
          })}
        </ScrollView>

        <Modal
          animationType='fade'
          transparent={false}
          visible={showModal}
          onRequestClose={() => {
            setShowModal(false)
          }}
        >
          <VideoPreview data={recipe}/>
        </Modal>

      </View>

    </>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: '#f3f9ff'
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 6,
    opacity: 0.9,
    marginBottom: 10,
  },
  btnPlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  containerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 4,
    height: 70
  },
  recipeName: {
    fontSize: 26,
    fontWeight: 'bold'
  },
  amountIngredients: {
    fontSize: 18,
    marginBottom: 15
  },
  ingredientName: {
    backgroundColor: '#fff',
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    height: 50,
    borderRadius: 6
  },
  instructionContainerTitle: {
    backgroundColor: '#4CBE6C',
    height: 40,
    borderRadius: 6,
    justifyContent: 'center',
    padding: 5,
    marginBottom: 10
  },
  instructionContainerTitleLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  instructionItemContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 30,
    width: '100%'
  },
  sequenceInstruction: {
    fontSize: 22,
    fontWeight: 'bold'
  }
})