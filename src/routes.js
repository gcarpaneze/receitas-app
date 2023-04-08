import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';

import Home from './pages/Home';
import Favorites from './pages/Favorites';

import Detail from './pages/Detail';
import Search from './pages/Search'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home'
                            : 'home-outline';
                    } else if (route.name === 'Favorites') {
                        iconName = focused ? 'heart' : 'heart-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#111',
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
            })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
            />
            <Tab.Screen
                name="Favorites"
                component={Favorites}
            />
        </Tab.Navigator>
    );
}

export default function StackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="Root"
                component={TabNavigator}
            />
            <Stack.Screen
                name="Detail"
                component={Detail}
            />

            <Stack.Screen 
                name="Search"
                component={Search}
            />
        </Stack.Navigator>
    )
}