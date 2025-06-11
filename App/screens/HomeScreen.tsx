import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Animated,
  Pressable,
  ImageBackground,
  Text,
  StyleSheet,
  ToastAndroid,
  BackHandler,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/StackNavigator';
import { Audio } from 'expo-av';
import { setLEDStatus } from '../api/api';

import Background from '../assets/img/Background.png';
import BtS from '../assets/sounds/BtS.mp3';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [isOn, setIsOn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(1)).current;

  // ✅ 사운드
  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(BtS);
      await sound.playAsync();
    } catch (error) {
      console.log('Sound playback error:', error);
    }
  };

  // ✅ 전원 상태 전환
  const togglePower = async () => {
    const nextState = !isOn;
    setIsOn(nextState);
    playSound();

    // ✅ 토스트 분기 처리
    if (Platform.OS === 'android') {
      ToastAndroid.show(nextState ? 'Light On' : 'Light Off', ToastAndroid.SHORT);
    } else {
      console.log(nextState ? 'Light On' : 'Light Off');
    }

    try {
      await setLEDStatus(nextState ? 'on' : 'off');
      console.log(`✅ LED 전원 전송 성공: ${nextState}`);
    } catch (error) {
      console.error('❌ LED 전원 전송 실패:', error);

      if (Platform.OS === 'android') {
        ToastAndroid.show('LED 전원 제어 실패', ToastAndroid.SHORT);
      } else {
        console.error('LED 전원 제어 실패 (웹)');
      }
    }
  };


  // ✅ 드롭다운 애니메이션
  useEffect(() => {
    Animated.spring(dropdownAnim, {
      toValue: menuOpen ? 1 : 0,
      useNativeDriver: true,
      speed: 1,
      bounciness: 80,
    }).start();
  }, [menuOpen]);

  // ✅ 전원 버튼 글로우 애니메이션
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // ✅ Android 뒤로가기 처리
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (menuOpen) {
        setMenuOpen(false);
        return true;
      }
      return false;
    });
    return () => backHandler.remove();
  }, [menuOpen]);

  return (
    <ImageBackground source={Background} resizeMode="cover" style={styles.background}>
      {/* 설정 아이콘 */}
      <View style={styles.settingsIcon}>
        <Pressable onPress={() => setMenuOpen(!menuOpen)}>
          <Ionicons name="settings-outline" size={28} color="white" />
        </Pressable>
      </View>

      {/* 드롭다운 메뉴 */}
        <Animated.View
          pointerEvents={menuOpen ? 'auto' : 'none'}
          style={[
            styles.dropdownMenu,
            {
              opacity: dropdownAnim,
              transform: [
                {
                  translateY: dropdownAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-30, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Pressable onPress={() => navigation.navigate('LightControl')} style={styles.menuItem}>
            <Ionicons name="bulb-outline" size={22} color="#FFB6C1" />
            <Text style={styles.menuText}>Light Control</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Music')} style={styles.menuItem}>
            <Ionicons name="musical-notes-outline" size={22} color="#ADD8E6" />
            <Text style={styles.menuText}>Music</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Routine')} style={styles.menuItem}>
            <Ionicons name="repeat-outline" size={22} color="#98FB98" />
            <Text style={styles.menuText}>Routine</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('ShareQR')} style={styles.menuItem}>
            <Ionicons name="qr-code-outline" size={22} color="#FFFACD" />
            <Text style={styles.menuText}>Share QR</Text>
          </Pressable>
      </Animated.View>

      {/* 전원 버튼 */}
      <View style={styles.buttonContainer}>
        <Animated.View style={{ transform: [{ scale: glowAnim }] }}>
          <Pressable
            onPress={togglePower}
            style={({ pressed }) => [
              {
                width: 160,
                height: 160,
                borderRadius: 80,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isOn
                  ? 'rgba(147, 51, 234, 0.25)'
                  : 'rgba(59, 130, 246, 0.15)',
                shadowColor: isOn ? '#C084FC' : '#60A5FA',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: pressed ? 0.5 : 0.9,
                shadowRadius: 30,
                elevation: 12,
                transform: [{ scale: pressed ? 0.95 : 1 }],
              },
            ]}
          >
            <Ionicons
              name="power"
              size={60}
              color="white"
              style={{ opacity: 0.9 }}
            />
          </Pressable>
        </Animated.View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  settingsIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 20,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 180,
    left: '10%',
    width: '80%',
    backgroundColor: 'rgba(30, 64, 175, 0.75)', // 살짝 더 진하고 몽환적으로
    paddingVertical: 24,
    borderRadius: 16,
    zIndex: 20,
    gap: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    width: '90%',
    justifyContent: 'center',
  },
  menuText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
