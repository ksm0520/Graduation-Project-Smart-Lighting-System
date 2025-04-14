import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

// 타입 오류 우회를 위해 require + any 사용
const WheelColorPicker = require('react-native-wheel-color-picker').WheelColorPicker as any;

export default function LightControlScreen() {
  const [color, setColor] = useState('#00FFFF');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Choose Light Color</Text>

      <WheelColorPicker
        initialColor={color}
        onColorChangeComplete={setColor}
        style={styles.colorPicker}
        thumbStyle={{ height: 30, width: 30, borderRadius: 15 }}
      />

      <TextInput
        value={color}
        onChangeText={setColor}
        style={[styles.input, { borderColor: color }]}
        placeholder="#RRGGBB"
        placeholderTextColor="#aaa"
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // 어두운 배경
  },
  label: {
    fontSize: 20,
    marginBottom: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  colorPicker: {
    width: 300,
    height: 300,
    marginBottom: 30,
  },
  input: {
    width: 160,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
});
