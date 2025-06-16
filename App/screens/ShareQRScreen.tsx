// ShareQRScreen.tsx (expo-go 호환, BarCodeScanner 제거 버전)
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Share,
  ImageBackground,
  RefreshControl,
  ScrollView,
  ToastAndroid,
  TextInput,
  Platform,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
// import { BarCodeScanner } from "expo-barcode-scanner"; // Expo Go 미지원이라 제거
import Background from "../assets/img/Background.png";
import { getRoutines, exportQR, importQR } from "../api/api";

const ShareQRScreen = () => {
  const qrRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const [routineData, setRoutineData] = useState<any>(null);
  const [manualQR, setManualQR] = useState("");

  const fetchRoutine = async () => {
    try {
      const response = await getRoutines();
      if (Array.isArray(response?.data) && response.data.length > 0) {
        setRoutineData(response.data[response.data.length - 1]);
      }
    } catch (err) {
      console.error("루틴 불러오기 실패:", err);
    }
  };

  const saveQRCode = async () => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("권한 필요", "갤러리 저장 권한이 필요합니다.");
      return;
    }
    try {
      const uri = await captureRef(qrRef, { format: "png", quality: 1 });
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("QR Codes", asset, false);
      Alert.alert("저장 완료", "QR 코드가 갤러리에 저장되었습니다.");
    } catch (err) {
      console.error("QR 저장 실패:", err);
      Alert.alert("에러", "QR 코드 저장에 실패했습니다.");
    }
  };

  const shareQRCode = async () => {
    try {
      const res = await exportQR(routineData.id);
      const qrCode = res.data.qr_code;
      await Share.share({
        message: `공유할 QR 코드: ${qrCode}`,
      });
    } catch (err) {
      console.error("QR 공유 실패:", err);
      Alert.alert("공유 실패", "QR 코드 생성에 실패했습니다.");
    }
  };

  const handleQRImport = async (qrData: string) => {
    try {
      const res = await importQR({ qr_code: qrData });
      if (res.data?.name) {
        Alert.alert("불러오기 완료", `루틴: ${res.data.name}이 등록되었습니다.`);
        fetchRoutine();
      } else {
        Alert.alert("불러오기 실패", "해당 QR의 루틴이 없습니다.");
      }
    } catch (err) {
      console.error("QR 불러오기 실패:", err);
      Alert.alert("에러", "QR 루틴 불러오기 중 에러 발생");
    }
  };

  useEffect(() => {
    fetchRoutine();
  }, []);

  return (
    <ImageBackground source={Background} style={styles.container} resizeMode="cover">
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchRoutine} />}
      >
        {routineData && (
          <>
            <View style={styles.qrBox} ref={qrRef}>
              <QRCode
                value={routineData.id.toString()}
                size={200}
                color="#FFF"
                backgroundColor="transparent"
              />
            </View>
            <Text style={styles.routineText}>🧠 루틴: {routineData.name}</Text>
            <Text style={styles.routineText}>⏰ 시간: {routineData.time}</Text>
          </>
        )}

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.btn} onPress={saveQRCode}>
            <Text style={styles.btnText}>저장</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={shareQRCode}>
            <Text style={styles.btnText}>공유</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20, width: "100%" }}>
          <Text style={{ color: "#FFF", marginBottom: 6 }}>🔤 QR 코드 수동 입력:</Text>
          <TextInput
            placeholder="routine_3"
            placeholderTextColor="#ccc"
            style={{ borderWidth: 1, borderColor: "#888", padding: 10, borderRadius: 10, color: "#fff" }}
            value={manualQR}
            onChangeText={setManualQR}
            onSubmitEditing={() => handleQRImport(manualQR)}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default ShareQRScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  qrBox: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#9C7FFF",
    marginBottom: 20,
  },
  routineText: {
    color: "#E0DBFF",
    fontSize: 16,
    marginVertical: 4,
  },
  buttons: {
    flexDirection: "row",
    marginTop: 20,
    gap: 12,
  },
  btn: {
    backgroundColor: "#6E67CE",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 14,
  },
  btnText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
