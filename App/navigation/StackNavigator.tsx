// navigation/StackNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import MusicScreen from '../screens/MusicScreen';
import RoutineScreen from '../screens/RoutineScreen';
import ShareQRScreen from '../screens/ShareQRScreen';
import LightControlScreen from '../screens/LightControlScreen';

export type RootStackParamList = {
  Home: undefined;
  Music: undefined;
  Routine: undefined;
  ShareQR: undefined;
  LightControl: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Music" component={MusicScreen} />
        <Stack.Screen name="Routine" component={RoutineScreen} />
        <Stack.Screen name="ShareQR" component={ShareQRScreen} />
        <Stack.Screen name="LightControl" component={LightControlScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
