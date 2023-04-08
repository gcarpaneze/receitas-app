import { NavigationContainer } from '@react-navigation/native';

import StackNavigator from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}