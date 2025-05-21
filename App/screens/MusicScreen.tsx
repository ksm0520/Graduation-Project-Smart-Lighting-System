import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Background from '../assets/img/Background.png';
import SystemSetting from 'react-native-system-setting';

const songs = ['Dream.mp3', 'Sunset.mp3', 'Chill Vibes.mp3'];
const SONG_DURATION = 120; // 임의로 120초로 고정 (2분), 실제 연동 시 변경 필요

const MusicScreen = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentSong = songs[currentSongIndex];

 const playMusic = async (song: string) => {
  const currentVolume = await SystemSetting.getVolume();
  console.log(`🎵 라즈베리파이로 재생 요청: ${song}, 실시간 볼륨: ${currentVolume}`);
};


  const stopMusic = () => {
    console.log('⏹ 라즈베리파이로 정지 요청');
  };

  const getNextIndex = () => {
    if (isShuffle) {
      let next;
      do {
        next = Math.floor(Math.random() * songs.length);
      } while (next === currentSongIndex);
      return next;
    }
    return (currentSongIndex + 1) % songs.length;
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      stopMusic();
      clearInterval(intervalRef.current!);
    } else {
      playMusic(currentSong);
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 1) {
            clearInterval(intervalRef.current!);
            if (isRepeat) {
              setProgress(0);
              handlePlayPause();
            } else {
              setCurrentSongIndex(getNextIndex());
              setProgress(0);
              setIsPlaying(false);
            }
            return 1;
          }
          return prev + 1 / SONG_DURATION;
        });
      }, 1000);
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const nextIndex = getNextIndex();
    setCurrentSongIndex(nextIndex);
    setProgress(0);
    if (isPlaying) {
      playMusic(songs[nextIndex]);
    }
  };

  const handlePrev = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    setProgress(0);
    if (isPlaying) {
      playMusic(songs[prevIndex]);
    }
  };

  useEffect(() => {
    const listener = SystemSetting.addVolumeListener((data) => {
      console.log('📢 시스템 볼륨 변경 감지됨:', data);
      setVolume(data.value);
    });

    SystemSetting.getVolume().then((v) => {
      console.log('📥 초기 볼륨:', v);
      setVolume(v);
    });

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      SystemSetting.removeVolumeListener(listener);
    };
  }, []);

  return (
    <ImageBackground source={Background} resizeMode="cover" style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.songTitle}>{currentSong.replace('.mp3', '')}</Text>

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={progress}
          minimumTrackTintColor="#63B3ED"
          maximumTrackTintColor="#fff"
          thumbTintColor="#63B3ED"
          disabled
        />

        <View style={styles.controls}>
          <TouchableOpacity onPress={handlePrev}>
            <Text style={styles.controlText}>⏮</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePlayPause}>
            <Text style={styles.controlText}>{isPlaying ? '⏸' : '▶️'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNext}>
            <Text style={styles.controlText}>⏭</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.extraControls}>
          <TouchableOpacity onPress={() => setIsRepeat(!isRepeat)}>
            <Text style={[styles.optionText, isRepeat && styles.activeOption]}>🔁 반복</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsShuffle(!isShuffle)}>
            <Text style={[styles.optionText, isShuffle && styles.activeOption]}>🔀 셔플</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.volumeLabel}>🔊 볼륨 ({Math.round(volume * 100)}%)</Text>
      </View>
    </ImageBackground>
  );
};

export default MusicScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  songTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 100,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  controls: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  controlText: {
    fontSize: 40,
    color: 'white',
  },
  extraControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  optionText: {
    fontSize: 18,
    color: 'white',
  },
  activeOption: {
    fontWeight: 'bold',
    color: '#63B3ED',
  },
  volumeLabel: {
    color: 'white',
    marginTop: 30,
    marginBottom: 5,
    fontSize: 16,
    textAlign: 'center',
  },
});
