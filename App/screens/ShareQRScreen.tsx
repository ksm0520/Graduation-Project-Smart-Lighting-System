import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Share } from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import ViewShot, { captureRef } from 'react-native-view-shot';
import { useNavigation } from "@react-navigation/native";
  

const ShareQRScreen = () => {
  const qrRef = React.useRef(null);
  const navigation = useNavigation();

 
  const routineData = {
    name: "Night",  
    color: "#3D348B",
    brightness: 70,
    routineId: "night001",
  };

  const jsonData = JSON.stringify(routineData);

  const saveQRCode = async () => {
    try {
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("??? ?????", "??? ?? ??? ?? ??? ?????.");
        return;
      }

      const uri = await captureRef(qrRef, {
        format: "png",
        quality: 1,
      });

      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("QR Codes", asset, false);

      Alert.alert("?? ??", "QR ??? ???? ???????.");
    } catch (error) {
      Alert.alert("??", "QR ?? ?? ? ??? ??????.");
      console.error(error);
    }
  };

  const shareQRCode = async () => {
    try {
      const uri = await captureRef(qrRef, {
        format: "png",
        quality: 1,
      });

      await Share.share({
        url: uri,
        message: "? QR ??? ?? ?? ??? ??? ??????!",
      });
    } catch (error) {
      Alert.alert("??", "QR ?? ?? ? ??? ??????.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Code</Text>

      <ViewShot ref={qrRef} options={{ format: 'png', quality: 1 }} style={styles.qrContainer}>
        <QRCode value={jsonData} size={220} />
      </ViewShot>


      <Text style={styles.routineText}>Name: {routineData.name}</Text>
      <Text style={styles.routineText}>Color: {routineData.color}</Text>
      <Text style={styles.routineText}>Brightness: {routineData.brightness}%</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={saveQRCode}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={shareQRCode}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShareQRScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 20,
  },
  qrContainer: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 12,
    marginBottom: 20,
  },
  routineText: {
    color: "#CCC",
    fontSize: 16,
    marginVertical: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 30,
  },
  button: {
    backgroundColor: "#3D348B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
});
