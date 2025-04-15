import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';

const App: React.FC = () => {
  const [color, setColor] = useState<string>('#00FFFF');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>선택한 색상: {color}</Text>
      <ColorPicker
        color={color}
        onColorChange={(selectedColor: string) => setColor(selectedColor)}
        thumbSize={30}
        sliderSize={30}
        noSnap={true}
        row={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  label: { fontSize: 18, marginBottom: 20 },
});

export default App;
