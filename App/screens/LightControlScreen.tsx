import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import Background from '../assets/img/Background.png';

const LightControlScreen: React.FC = () => {
  const [color, setColor] = useState<string>('#00FFFF');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [alarmSet, setAlarmSet] = useState(false);
  const [alarmId, setAlarmId] = useState<ReturnType<typeof setTimeout> | null>(null);

  // 추후 Raspberry Pi와 연동될 LED 제어 함수
  const turnOffLED = () => {
    console.log('💡 LED OFF 명령 전송');
    // 예: fetch('http://raspberrypi.local/led/off') 또는 MQTT publish 등
  };

  const scheduleAlarm = () => {
    const now = new Date();
    const alarmTime = new Date();
    const hourNum = parseInt(hour);
    const minNum = parseInt(minute);

    if (
      isNaN(hourNum) || isNaN(minNum) ||
      hourNum < 0 || hourNum > 23 ||
      minNum < 0 || minNum > 59
    ) {
      Alert.alert('잘못된 입력', '시간은 0~23, 분은 0~59 사이로 입력해주세요.');
      return;
    }

    alarmTime.setHours(hourNum);
    alarmTime.setMinutes(minNum);
    alarmTime.setSeconds(0);

    if (alarmTime <= now) {
      alarmTime.setDate(alarmTime.getDate() + 1); // 내일 알람으로 설정
    }

    const timeout = alarmTime.getTime() - now.getTime();

    const id = setTimeout(() => {
      Alert.alert('알람', `${hourNum}시 ${minNum}분 알람입니다!`);
      turnOffLED(); // 💡 실제 전등 끄는 함수 호출
      setAlarmSet(false);
    }, timeout);

    setAlarmId(id);
    setAlarmSet(true);
    Alert.alert('알람 설정 완료', `${hourNum}시 ${minNum}분에 알람이 울립니다.`);
  };

  const cancelAlarm = () => {
    if (alarmId) clearTimeout(alarmId);
    setAlarmSet(false);
    setHour('');
    setMinute('');
  };

  return (
    <ImageBackground source={Background} resizeMode="cover" style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.heading}>색상 선택</Text>
        <ColorPicker
          color={color}
          onColorChange={setColor}
          thumbSize={30}
          sliderSize={30}
          noSnap={true}
          row={false}
        />

        <View style={styles.alarmSection}>
          <Text style={styles.heading}>알람 설정</Text>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={hour}
              onChangeText={setHour}
              placeholder="시"
              placeholderTextColor="#ccc"
              maxLength={2}
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={minute}
              onChangeText={setMinute}
              placeholder="분"
              placeholderTextColor="#ccc"
              maxLength={2}
            />
          </View>
          {!alarmSet ? (
            <TouchableOpacity style={styles.button} onPress={scheduleAlarm}>
              <Text style={styles.buttonText}>알람 설정</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={cancelAlarm}>
              <Text style={styles.buttonText}>알람 취소</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: 'white',
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  alarmSection: {
    marginTop: 40,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#63B3ED',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#FF6B6B',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LightControlScreen;
