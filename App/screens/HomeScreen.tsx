import React, { useState } from 'react';
import {
  View,
  Pressable,
  Image,
  ImageBackground,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
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
      {menuOpen && (
        <View className="absolute top-20 left-5 bg-black/70 p-4 rounded-lg space-y-2 z-20">
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
        </View>
      )}
      {/* 버튼을 가로세로 중앙에 배치 (Tailwind 제거하고 기본 스타일 사용) */}
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => setIsOn(!isOn)}>
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
});
