import React, { useState,useRef  } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid ,
  Platform,
} from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import Background from '../assets/img/Background.png';
import Slider from '@react-native-community/slider';
import { setLEDColor, setLEDBrightness, setLEDStatus, addAlarm } from '../api/api';
import debounce from 'lodash/debounce';

interface Alarm {
  hour: string;
  minute: string;
  id: ReturnType<typeof setTimeout>;
}

const LightControlScreen: React.FC = () => {
  const [color, setColor] = useState<string>('#00FFFF');
  const [hexInput, setHexInput] = useState<string>('#00FFFF');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [brightness, setBrightness] = useState(0.5); // 기본값 50%4

    const debouncedSetColor = useRef(
    debounce((newColor: string) => {
      setLEDColor(newColor).catch((err) => console.error('색상 전송 실패:', err));
    }, 300)
  ).current;


  const turnOffLED = () => {
    setLEDStatus('off')
      .then(() => {
        console.log('💡 LED 전원 꺼짐');
        if (Platform.OS === 'android') {
          ToastAndroid.show('LED 꺼짐', ToastAndroid.SHORT);
        } else {
          console.log('LED 꺼짐 (웹)');
        }
      })
      .catch((error) => {
        console.error('❌ LED 전원 끄기 실패:', error);
        if (Platform.OS === 'android') {
          ToastAndroid.show('LED 끄기 실패', ToastAndroid.SHORT);
        } else {
          console.error('LED 끄기 실패 (웹)');
        }
      });
  };
  

  const scheduleAlarm = async () => {
    const now = new Date();
    const alarmTime = new Date();
    const hourNum = parseInt(hour);
    const minNum = parseInt(minute);

    if (
      isNaN(hourNum) || isNaN(minNum) || hourNum < 0 || hourNum > 23 || minNum < 0 || minNum > 59
    ) {
      Alert.alert('입력 오류', '0~23시, 0~59분 사이로 입력해주세요.');
      return;
    }

    alarmTime.setHours(hourNum);
    alarmTime.setMinutes(minNum);
    alarmTime.setSeconds(0);

    if (alarmTime <= now) alarmTime.setDate(alarmTime.getDate() + 1);

    const timeout = alarmTime.getTime() - now.getTime();
    const id = setTimeout(() => {
      Alert.alert('⏰ 알람', `${hourNum}시 ${minNum}분입니다!`);
      turnOffLED(); // 여기!
      setAlarms((prev) => prev.filter((a) => a.id !== id));
    }, timeout);

    try {
       const time = `${String(hourNum).padStart(2, '0')}:${String(minNum).padStart(2, '0')}`;
        await addAlarm({ status: 'on', time }); // ✅ 명세서에 맞는 구조로 수정
        setAlarms((prev) => [...prev, { hour, minute, id }]);
        setHour('');
        setMinute('');
    } catch (error) {
      console.error('알람 전송 실패:', error);
      Alert.alert('알람 전송 실패', '서버에 알람 정보를 보낼 수 없습니다.');
    }
  };


  const cancelAlarm = (id: ReturnType<typeof setTimeout>) => {
    clearTimeout(id);
    setAlarms((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <ImageBackground source={Background} resizeMode="cover" style={styles.background}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>🌈 LED 색상 조절</Text>

          <View style={styles.card}>
            <View style={{ width: '100%', height: 200, marginBottom: 75 }}>
              <ColorPicker
                color={color}
                onColorChange={(newColor) => {
                  setColor(newColor);
                  setHexInput(newColor);
                  debouncedSetColor(newColor); 
                }}
                thumbSize={30}
                sliderSize={30}
                noSnap
                row={false}
              />
            </View>
          </View>

          <View style={[styles.card, { marginTop: -16 }]}> {/* HEX 코드 입력을 별 카드로 따로 분리 */}
            <View style={styles.inputSection}>
              <Text style={styles.label}>HEX 코드 입력</Text>
              <TextInput
                style={styles.hexInput}
                value={hexInput}
                onChangeText={(value) => {
                  setHexInput(value);
                  if (/^#?[0-9A-Fa-f]{6}$/.test(value)) {
                    setColor(value.startsWith('#') ? value : `#${value}`);
                  }
                }}
                maxLength={7}
                placeholder="#RRGGBB"
                placeholderTextColor="#999"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>💡 LED 밝기</Text>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={0}
              maximumValue={1}
              value={brightness}
              minimumTrackTintColor="#A78BFA"
              maximumTrackTintColor="#ccc"
              thumbTintColor="#A78BFA"
              onValueChange={(value) => {
                setBrightness(value);
                const brightnessInt = Math.round(value * 100); // 0.23 → 23
                setLEDBrightness(brightnessInt).catch((err) =>
                  console.error('밝기 전송 실패:', err)
                );
              }}
            />
            <Text style={{ color: 'white', textAlign: 'center', marginTop: 8 }}>
              현재 밝기: {(brightness * 100).toFixed(0)}%
            </Text>
          </View>


          <Text style={[styles.title, { marginTop: 20 }]}>⏰ 알람 설정</Text>

          <View style={styles.card}>
            <View style={styles.timeInputRow}>
              <TextInput
                style={styles.timeInput}
                value={hour}
                onChangeText={setHour}
                placeholder="시"
                keyboardType="numeric"
                placeholderTextColor="#ccc"
                maxLength={2}
              />
              <Text style={styles.colon}>:</Text>
              <TextInput
                style={styles.timeInput}
                value={minute}
                onChangeText={setMinute}
                placeholder="분"
                keyboardType="numeric"
                placeholderTextColor="#ccc"
                maxLength={2}
              />
            </View>

            <TouchableOpacity style={styles.addAlarmButton} onPress={scheduleAlarm}>
              <Text style={styles.addAlarmText}>✨ 알람 추가</Text>
            </TouchableOpacity>

            {alarms.map((alarm, idx) => (
              <View key={idx} style={styles.alarmItem}>
                <Text style={styles.alarmText}>🔔 {alarm.hour}시 {alarm.minute}분</Text>
                <TouchableOpacity onPress={() => cancelAlarm(alarm.id)}>
                  <Text style={styles.cancel}>❌</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%' },
  container: { padding: 24, alignItems: 'center', paddingBottom: 100 },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white', marginVertical: 16 },
  card: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    padding: 20,
    borderRadius: 16,
    width: '100%',
    marginBottom: 24,
  },
  inputSection: { alignItems: 'center', marginBottom: 10 },
  label: { color: 'white', marginBottom: 6, fontSize: 14 },
  hexInput: {
    width: 150,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'white',
    textAlign: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  timeInputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeInput: {
    width: 60,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    borderColor: '#aaa',
    borderWidth: 1,
    fontSize: 18,
  },
  colon: { color: 'white', fontSize: 26, fontWeight: 'bold', marginHorizontal: 10 },
  addAlarmButton: {
    backgroundColor: 'rgba(180, 160, 255, 0.15)',
    borderColor: '#A78BFA',
    borderWidth: 1.5,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#A78BFA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    marginBottom: 12,
  },
  addAlarmText: {
    fontSize: 17,
    color: '#E9D8FD',
    fontWeight: 'bold',
  },
  alarmItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  alarmText: { color: 'white', fontSize: 16 },
  cancel: { color: '#F56565', fontSize: 18, fontWeight: 'bold' },
  
  
});

export default LightControlScreen;
