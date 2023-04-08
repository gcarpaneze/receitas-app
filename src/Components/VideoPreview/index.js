import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

export default function VideoPreview({ data }) {

    const navigation = useNavigation();

    return (
        <>
            <View style={styles.headerContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name='arrow-back' size={22} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Voltar</Text>
                </View>
            </View>

            <WebView
                style={styles.container}
                source={{ uri: data.video }}
            />
        </>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 10,
        height: 60,
        backgroundColor: '#4CBE6C'
    },
    title: {
        fontSize: 18,
        marginLeft: 8,
        color: '#fff'
    },

    container: {
        flex: 1
    }
})