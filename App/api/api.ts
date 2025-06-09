import axios from 'axios';

//  기본 axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://your-backend-url.com', // 나중에 실제 주소로 교체
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

// ✅ 기능별 API 호출 함수 모음


// 🌟 1. HomeScreen - 전원 제어 (LED ON/OFF)
export const toggleLED = (isOn: boolean) => {
  return api.post('/led/power', { power: isOn }); // 예: true면 켜짐
};

// 🌈 2. LightControlScreen - 색상/밝기 조절
export const setLEDColor = (color: string) => {
  return api.post('/led/color', { color }); // 예: "#FFAA00"
};

export const setLEDBrightness = (value: number) => {
  return api.post('/led/brightness', { brightness: value }); // 0.0 ~ 1.0
};

// ⏰ 3. LightControlScreen - 알람 등록 및 취소
export const addAlarm = (hour: number, minute: number) => {
  return api.post('/led/alarm', { hour, minute });
};

export const cancelAlarm = (alarmId: string) => {
  return api.delete(`/led/alarm/${alarmId}`);
};

// 🎵 4. MusicScreen - 음악 재생/정지/볼륨
export const playMusic = (song: string) => {
  return api.post('/music/play', { song });
};

export const stopMusic = () => {
  return api.post('/music/stop');
};

export const setVolume = (value: number) => {
  return api.post('/music/volume', { volume: value }); // 0.0 ~ 1.0
};

// 🔁 5. RoutineScreen - 루틴 추가/조회/삭제
export const addRoutine = (routine: any) => {
  return api.post('/routine', routine);
};

export const getRoutines = () => {
  return api.get('/routine');
};

export const deleteRoutine = (id: string) => {
  return api.delete(`/routine/${id}`);
};

// 📤 6. ShareQRScreen - 루틴 공유 QR
export const getRoutineQR = () => {
  return api.get('/routine/qr');
};

export const applyRoutineFromQR = (qrCode: string) => {
  return api.post('/routine/qr', { code: qrCode });
};
