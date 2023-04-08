import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import StackNavigator from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
      <StatusBar style='auto' translucent={false} backgroundColor="#fff"/>
    </NavigationContainer>
  );
}