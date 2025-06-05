import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Background from '../assets/img/Background.png';

const songs = ['classic', 'rain', 'studying', 'sleeping', ];

const songIcons: Record<string, string> = {
  classic: '🎻',
  rain: '💧',
  studying: '📖',
  sleeping: '🛌',
};


const MusicScreen = () => {
  const [currentSong, setCurrentSong] = useState<string | null>(null);

  const playMusic = (song: string) => {
    console.log(`🎵 재생 요청: ${song}`);
    setCurrentSong(song);
    // fetch('http://raspberrypi.local/play', { method: 'POST', body: JSON.stringify({ song }) });
  };

  const stopMusic = () => {
    console.log('⏹ 정지 요청');
    setCurrentSong(null);
    // fetch('http://raspberrypi.local/stop');
  };

  return (
    <ImageBackground source={Background} resizeMode="cover" style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>🎵  Music  🎵</Text>

        <View style={styles.songList}>
          {songs.map((song) => {
            const isPlaying = song === currentSong;
            const icon = isPlaying ? '🔊' : songIcons[song];

            return (
              <TouchableOpacity
                key={song}
                style={[styles.songButton, isPlaying && styles.activeSong]}
                onPress={() => playMusic(song)}
              >
                <Text style={styles.songText}>
                  {`${isPlaying ? '🔊' : songIcons[song.toLowerCase()] || '🎵'} ${song}`}
                </Text>
              </TouchableOpacity>
            );
          })}

        </View>

        <TouchableOpacity style={styles.stopButton} onPress={stopMusic}>
          <Text style={styles.stopText}>⏹ 정지</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default MusicScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  title: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  songList: {
    width: '100%',
    gap: 16,
    alignItems: 'center',
  },
  songButton: {
    width: '90%',
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
  },
  activeSong: {
    backgroundColor: 'rgba(192, 132, 252, 0.2)', // 보라빛 강조
  },
  songText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    includeFontPadding: false, // Android에서 글씨 아래 공백 제거
  },
  stopButton: {
    marginTop: 50,
    paddingVertical: 14,
    paddingHorizontal: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    shadowColor: '#C084FC',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  stopText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
