// navigation/StackNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import MusicScreen from '../screens/MusicScreen';
import RoutineScreen from '../screens/RoutineScreen';
import ShareQRScreen from '../screens/ShareQRScreen';
import LightControlScreen from '../screens/LightControlScreen';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Music: undefined;
  Routine: undefined;
  ShareQR: undefined;
  LightControl: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// 공통 header 스타일
const headerStyle = {
  backgroundColor: 'rgba(180, 225, 255, 0.4)',
  elevation: 0,
  shadowOpacity: 0,
  borderBottomWidth: 0,
};

const defaultScreenOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerStyle: headerStyle as any, // ✅ 강제 타입 무시
  headerTitleAlign: 'center',
  headerTintColor: '#000000',
};

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Music"
          component={MusicScreen}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="Routine"
          component={RoutineScreen}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="ShareQR"
          component={ShareQRScreen}
          options={defaultScreenOptions}
        />
        <Stack.Screen
          name="LightControl"
          component={LightControlScreen}
          options={defaultScreenOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
