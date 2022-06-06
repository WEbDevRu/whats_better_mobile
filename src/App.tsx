/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  useColorScheme,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MainScreen} from './screens/MainScreen';
import {ComparisonScreen} from './screens/ComparisonScreen';
import AppContextProvider from './common/providers/AppContextProvider';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <AppContextProvider>
        <Stack.Navigator>
          <Stack.Screen name="Categories" component={MainScreen} />
          <Stack.Screen name="Whats better?" component={ComparisonScreen} />
        </Stack.Navigator>
      </AppContextProvider>
    </NavigationContainer>
  );
};

export default App;
