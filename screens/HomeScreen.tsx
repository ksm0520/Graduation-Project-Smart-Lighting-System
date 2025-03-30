import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [isOn, setIsOn] = useState(false);

  const navigation = useNavigation();

 

  return (
    <View className="flex-1 justify-center items-center bg-white px-4">
      {/* ON/OFF 버튼 */}
      <Pressable
        onPress={() => setIsOn(!isOn)}
        className={`w-40 h-40 rounded-full justify-center items-center shadow-lg
          ${isOn ? 'bg-green-500' : 'bg-gray-400'}
          active:scale-95 transition duration-200`}
      >
        <Text className="text-white text-2xl font-bold">
          {isOn ? 'ON' : 'OFF'}
        </Text>
      </Pressable>

      {/* 간격 */}
      <View className="h-12" />

      {/* 이동 버튼들 */}
      <View className="w-full flex-row justify-between px-4">
        <Pressable
          className="bg-blue-500 px-6 py-3 rounded-xl active:bg-blue-600"
          onPress={() => console.log('이동1')}
        >
          <Text className="text-white font-semibold">음악 제어</Text>
        </Pressable>

        <Pressable
          className="bg-purple-500 px-6 py-3 rounded-xl active:bg-purple-600"
          onPress={() => console.log('이동2')}
        >
          <Text className="text-white font-semibold">루틴 설정</Text>
        </Pressable>

        <Pressable
          className="bg-orange-500 px-6 py-3 rounded-xl active:bg-orange-600"
          onPress={() => console.log('이동3')}
        >
          <Text className="text-white font-semibold">공유</Text>
        </Pressable>
      </View>
    </View>
  );
}
