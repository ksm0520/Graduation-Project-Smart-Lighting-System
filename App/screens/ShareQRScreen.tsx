// ShareQRScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ShareQRScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🏠 QR공유창 </Text>
    </View>
  );
};

export default ShareQRScreen;

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
