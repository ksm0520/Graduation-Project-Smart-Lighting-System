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
import { Audio } from 'expo-av';

import Background from '../assets/img/Background.png';
import onBT from '../assets/img/onBT.png';
import offBT from '../assets/img/offBT.png';
import BtS from '../assets/sounds/BtS.mp3';


type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [isOn, setIsOn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const screenHeight = Dimensions.get('window').height;

  // 컴포넌트 내부에 추가 (menuOpen 위에)
const dropdownAnim = useRef(new Animated.Value(0)).current;
const dropdownBg = 'rgba(30, 64, 175, 0.7)';

const playSound = async () => {
  try {
    const { sound } = await Audio.Sound.createAsync(BtS);
    await sound.playAsync();
  } catch (error) {
    console.log('Sound playback error:', error);
  }
};

useEffect(() => {
  Animated.spring(dropdownAnim, {
    toValue: menuOpen ? 1 : 0,
    useNativeDriver: true,
    speed: 1,
    bounciness: 80, // 튕김 효과
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
            outputRange: [-30, 0], // 위에서 아래로 살짝 내려오기
          }),
        },
      ],
    },
    {
      position: 'absolute',
      top: 180,
      left: '10%',
      width: '80%',
      backgroundColor: dropdownBg,
      padding: 16,
      paddingTop: 80,
      paddingBottom: 80,
      borderRadius: 12,
      zIndex: 20,
      gap: 20,
      
      alignItems: 'center', // 텍스트 가운데 정렬
    },
  ]}
>
  <Pressable onPress={() => navigation.navigate('LightControl')}>
    <Text style={{ color: '#FF6363', fontSize: 20, fontWeight: 'bold' }}>Light Control</Text>
  </Pressable>
  <Pressable onPress={() => navigation.navigate('Music')}>
    <Text style={{ color: '#63B3ED', fontSize: 20, fontWeight: 'bold' }}>Music</Text>
  </Pressable>
  <Pressable onPress={() => navigation.navigate('Routine')}>
    <Text style={{ color: '#68D391', fontSize: 20, fontWeight: 'bold' }}>Routine</Text>
  </Pressable>
  <Pressable onPress={() => navigation.navigate('ShareQR')}>
    <Text style={{ color: '#F6E05E', fontSize: 20, fontWeight: 'bold' }}>Share QR</Text>
  </Pressable>
</Animated.View>

      {/* 버튼을 가로세로 중앙에 배치 (Tailwind 제거하고 기본 스타일 사용) */}
        <View style={styles.buttonContainer}>
        <Pressable
  onPress={() => {
    setIsOn(!isOn);
    playSound(); // 🔊 버튼 누를 때 사운드
  }}
  style={({ pressed }) => [
    {
      transform: [{ scale: pressed ? 0.9 : 1 }],
      borderRadius: 100,
      borderWidth: 2,
      borderColor: pressed ? '#4A90E2' : 'black', // 누를 때 테두리 색 변경
      padding: pressed ? 14 : 10, // 누를 때 살짝 커짐
      backgroundColor: pressed ? 'rgba(255,255,255,0.2)' : 'transparent',
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
    fontSize: 25,
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
    top: 160,
    left: 18,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 90,
    borderRadius: 50,
    zIndex: 20,
    gap: 20,
  },
  
});
