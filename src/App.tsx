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
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MainScreen} from './screens/MainScreen';
import {ComparisonScreen} from './screens/ComparisonScreen';
import AppContextProvider from './common/providers/AppContextProvider';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <AppContextProvider>
        <Stack.Navigator>
          <Stack.Screen name="home" component={MainScreen} />
          <Stack.Screen name="comparison" component={ComparisonScreen} />
        </Stack.Navigator>
      </AppContextProvider>
    </NavigationContainer>
  );
};

export default App;
