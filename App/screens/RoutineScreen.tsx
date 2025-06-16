import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  RefreshControl,
  Platform,
  ToastAndroid,
} from "react-native";
import { getRoutines, addRoutine, deleteRoutine } from "../api/api";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

interface Routine {
  id: number;
  name: string;
  time: string;
  enabled: boolean;
  actions: {
    music?: string;
    color?: string;
  };
}

const RoutineScreen = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [music, setMusic] = useState("classic");
  const [color, setColor] = useState("#FFD700");
  const [refreshing, setRefreshing] = useState(false);

  const fetchRoutines = async () => {
    try {
      const response = await getRoutines();
      setRoutines(response.data);
    } catch (error) {
      console.error("루틴 불러오기 실패:", error);
      if (Platform.OS === "android") {
        ToastAndroid.show("루틴 불러오기 실패", ToastAndroid.SHORT);
      }
    }
  };

  useEffect(() => {
    fetchRoutines();
  }, []);

  const handleAddRoutine = async () => {
    if (!name || !time) return;
    try {
      await addRoutine({
        name,
        time,
        enabled: true,
        actions: { music, color },
      });
      setName("");
      setTime("");
      setMusic("classic");
      setColor("#FFD700");
      fetchRoutines();
    } catch (error) {
      console.error("루틴 추가 실패:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteRoutine(id);
      fetchRoutines();
    } catch (error) {
      console.error("루틴 삭제 실패:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRoutines();
    setRefreshing(false);
  };

  const renderItem = (item: Routine) => (
    <View key={item.id} style={styles.routineItem}>
      <View>
        <Text style={styles.routineTitle}>
          <Ionicons name="time-outline" size={16} /> {item.time} |{" "}
          {item.name || "이름 없음"}
        </Text>
        <Text style={styles.routineInfo}>
          <Ionicons name="checkmark-circle" size={14} color="#6EF28D" />{" "}
          {item.enabled ? "활성화됨" : "비활성화"}
        </Text>
        <Text style={styles.routineInfo}>
          <Ionicons name="musical-notes" size={14} /> 음악:{" "}
          {item.actions?.music || "없음"}
        </Text>
        <Text style={styles.routineInfo}>
          🎨 색상:{" "}
          <Text style={{ color: item.actions?.color || "#fff" }}>
            {item.actions?.color || "없음"}
          </Text>
        </Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteBtn}>삭제</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.title}>루틴 목록</Text>
      {routines.map(renderItem)}

      <Text style={styles.subtitle}>루틴 추가</Text>
      <TextInput
        placeholder="이름"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="시간 (예: 07:30)"
        placeholderTextColor="#888"
        value={time}
        onChangeText={setTime}
        style={styles.input}
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>음악 선택</Text>
          <Picker
            selectedValue={music}
            onValueChange={(itemValue) => setMusic(itemValue)}
            style={{
            backgroundColor: "#2A1F4F", // 어두운 보라색 계열
            color: "#E5DAFF", // 밝은 보라/흰색 글씨
            borderRadius: 10,
            paddingHorizontal: 12,
            height: 48,
            marginBottom: 12,
          }}
          >
            <Picker.Item label="클래식 🎻" value="classic" />
            <Picker.Item label="빗소리 💧" value="rain" />
            <Picker.Item label="집중 📖" value="studying" />
            <Picker.Item label="수면 🛌" value="sleeping" />
          </Picker>

      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>색상 선택</Text>
          <Picker
            selectedValue={color}
            onValueChange={(itemValue) => setColor(itemValue)}
            style={{
              backgroundColor: "#2A1F4F",
              color: "#FFD700", // 예: 노란색
              borderRadius: 10,
              paddingHorizontal: 12,
              height: 48,
              marginBottom: 12,
            }}
          >
            <Picker.Item label="노랑 🟡" value="#FFD700" />
            <Picker.Item label="분홍 💗" value="#FF69B4" />
            <Picker.Item label="파랑 💙" value="#1E90FF" />
            <Picker.Item label="보라 💜" value="#8A2BE2" />
          </Picker>
      </View>

      <TouchableOpacity style={styles.addBtn} onPress={handleAddRoutine}>
        <Text style={styles.addBtnText}>추가</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RoutineScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#151122",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    marginTop: 30,
    marginBottom: 10,
  },
  routineItem: {
    backgroundColor: "#2E2644",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  routineTitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 4,
  },
  routineInfo: {
    color: "#ccc",
    fontSize: 14,
  },
  deleteBtn: {
    color: "#FF8787",
    fontSize: 14,
    alignSelf: "center",
  },
  input: {
    backgroundColor: "#322D44",
    padding: 12,
    borderRadius: 10,
    color: "#fff",
    marginBottom: 10,
  },
  pickerContainer: {
    marginBottom: 10,
  },
  label: {
    color: "#ccc",
    marginBottom: 4,
    marginLeft: 4,
  },
  picker: {
    height: 44,
    color: "#FFF",
  },
  addBtn: {
    backgroundColor: "#8C7BFA",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  addBtnText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
