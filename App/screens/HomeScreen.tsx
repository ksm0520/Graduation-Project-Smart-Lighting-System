import React, { useState } from 'react';
import {
  View,
  Animated,
  Pressable,
  Image,
  ImageBackground,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/StackNavigator';

import Background from '../assets/img/Background.png';
import onBT from '../assets/img/onBT.png';
import offBT from '../assets/img/offBT.png';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [isOn, setIsOn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const screenHeight = Dimensions.get('window').height;

  // 컴포넌트 내부에 추가 (menuOpen 위에)
const dropdownAnim = useRef(new Animated.Value(0)).current;

useEffect(() => {
  Animated.timing(dropdownAnim, {
    toValue: menuOpen ? 1 : 0,
    duration: 200,
    useNativeDriver: true,
  }).start();
}, [menuOpen]);


  return (
    <ImageBackground
    source={Background}
    resizeMode="cover"
    style={{ flex: 1 }}
    className="w-full"
  >
      {/* 설정 아이콘 */}
      <View className="absolute top-10 left-5 z-20">
        <Pressable onPress={() => setMenuOpen(!menuOpen)}>
          <Ionicons name="settings-outline" size={28} color="white" />
        </Pressable>
      </View>

      {/* 드롭다운 메뉴 */}
      <Animated.View
  pointerEvents={menuOpen ? 'auto' : 'none'}
  style={[
    {
      opacity: dropdownAnim,
      transform: [
        {
          translateY: dropdownAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-20, 0],
          }),
        },
      ],
    },
    styles.dropdown,
  ]}
>
  <Pressable onPress={() => navigation.navigate('LightControl')}>
    <Text style={styles.menuText}>Light Control</Text>
  </Pressable>
  <Pressable onPress={() => navigation.navigate('Music')}>
    <Text style={styles.menuText}>Music</Text>
  </Pressable>
  <Pressable onPress={() => navigation.navigate('Routine')}>
    <Text style={styles.menuText}>Routine</Text>
  </Pressable>
  <Pressable onPress={() => navigation.navigate('ShareQR')}>
    <Text style={styles.menuText}>Share QR</Text>
  </Pressable>
</Animated.View>

      {/* 버튼을 가로세로 중앙에 배치 (Tailwind 제거하고 기본 스타일 사용) */}
        <View style={styles.buttonContainer}>
          <Pressable
      onPress={() => setIsOn(!isOn)}
      style={({ pressed }) => [
        {
          transform: [{ scale: pressed ? 0.95 : 1 }],
          borderRadius: 100,
          borderWidth: 2,
          borderColor: 'black',
          padding: 10,
          backgroundColor: pressed ? 'rgba(255,255,255,0.1)' : 'transparent',
        },
      ]}
    >
      <Image
        source={isOn ? offBT : onBT}
        style={styles.buttonImage}
        resizeMode="contain"
      />
    </Pressable>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  menuText: {
    color: 'white',
    fontSize: 16,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    width: 160,
    height: 160,
  },
  dropdown: {
    position: 'absolute',
    top: 80,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 16,
    borderRadius: 12,
    zIndex: 20,
    gap: 10,
  },
  
});
