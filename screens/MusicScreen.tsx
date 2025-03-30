// MusicScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MusicScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🏠 전원 제어 메인 화면</Text>
    </View>
  );
};

export default MusicScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
