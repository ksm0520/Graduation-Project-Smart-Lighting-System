// LightControlScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LightControlScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🏠 색,밝기 조절 및 타이머</Text>
    </View>
  );
};

export default LightControlScreen;

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
