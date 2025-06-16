import axios from 'axios';

export const BASE_URL = 'https://graduation-project-smart-lighting-system-production.up.railway.app';

//
// ✅ LED 관련
//
export const getLedStatus = () => axios.get(`${BASE_URL}/led`);

export const setLed = (data: { color?: string; brightness?: number; status?: 'on' | 'off' }) =>
  axios.post(`${BASE_URL}/led`, data);

export const setLEDColor = (color: string) => setLed({ color });
export const setLEDBrightness = (brightness: number) => setLed({ brightness });
export const setLEDStatus = (status: 'on' | 'off') => setLed({ status });

// ✅ Music 관련
// 현재 음악 상태 조회
export const getMusicStatus = () => axios.get(`${BASE_URL}/music`);

// 음악 재생 (모드: 'classic', 'rain', 'studying', 'sleeping')
export const playMusic = (mode: string) =>
  axios.post(`${BASE_URL}/music/play`, { mode });

// 음악 정지
export const stopMusic = () => axios.post(`${BASE_URL}/music/stop`);

// 음악 볼륨 조절 (0~100)
export const setMusicVolume = (volume: number) =>
  axios.post(`${BASE_URL}/music/volume`, { volume: Math.round(volume * 100) }); // 🔥 수정

//
// ✅ Alarm 관련
//
export const getAlarms = () => axios.get(`${BASE_URL}/alarm`);
export const addAlarm = (data: { status: string; time: string }) =>
  axios.post(`${BASE_URL}/alarm`, data);
export const deleteAlarm = (id: number) => axios.delete(`${BASE_URL}/alarm/${id}`);

//
// ✅ Routine 관련
//
interface Routine {
  id: number;
  name: string;
  time: string;
  enabled: boolean;
  actions: any; // 서버에서 JSON으로 받는 구조
}


export const getRoutines = () => axios.get(`${BASE_URL}/routine`);

export const addRoutine = (data: {
  name: string;
  time: string;
  enabled: boolean;
  actions: any;
}) => axios.post(`${BASE_URL}/routine`, data);



export const deleteRoutine = (id: number) =>
  axios.delete(`${BASE_URL}/routine/${id}`);
//
// ✅ QR 공유 관련
//
// QR 생성
export const exportQR = (routineId: string) =>
  axios.post(`${BASE_URL}/qr`, { routine_id: routineId });

// QR 불러오기
export const importQR = (data: { qr_code: string }) =>
  axios.post(`${BASE_URL}/qr/import`, data);