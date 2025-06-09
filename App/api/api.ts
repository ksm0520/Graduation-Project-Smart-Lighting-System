import axios from 'axios';

const BASE_URL = 'https://graduation-project-smart-lighting-system-production.up.railway.app';

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
  axios.post(`${BASE_URL}/music/volume`, { volume });

//
// ✅ Alarm 관련
//
export const getAlarms = () => axios.get(`${BASE_URL}/alarm`);
export const addAlarm = (data: { hour: number; minute: number }) => {
  return axios.post(`${BASE_URL}/alarm`, data);
};
export const deleteAlarm = (id: number) => axios.delete(`${BASE_URL}/alarm/${id}`);

//
// ✅ Routine 관련
//
export const getRoutines = () => axios.get(`${BASE_URL}/routine`);
export const addRoutine = (data: { title: string; time: string }) =>
  axios.post(`${BASE_URL}/routine`, data);
export const deleteRoutine = (id: number) => axios.delete(`${BASE_URL}/routine/${id}`);

//
// ✅ QR 공유 관련
//
export const exportQR = () => axios.get(`${BASE_URL}/qr/export`);
export const importQR = (data: { routines: { title: string; time: string }[] }) =>
  axios.post(`${BASE_URL}/qr/import`, data);
