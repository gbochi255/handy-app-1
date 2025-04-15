import { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { supabase } from "../lib/supabase";
import { useNavigation } from "@react-navigation/native";

export default function CameraApp() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  if (!permission) {
    return <Text>Requesting permission...</Text>;
  }

  if (!permission.granted) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 20 }}>
          No access to camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={{
            backgroundColor: "#007AFF",
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const uploadPhoto = (uri) => {
    const fileName = uri.split("/").pop();

    fetch(uri)
      .then((res) => res.blob())
      .then((blob) => {
        return supabase.storage
          .from("photos")
          .upload(`photos/${Date.now()}-${fileName}`, blob, {
            contentType: "image/jpeg",
          });
      })
      .then(({ data, error }) => {
        if (error) {
          console.error("Upload error:", error);
          return;
        }

        console.log("Upload success:", data);

        const { data: publicUrlData } = supabase.storage
          .from("photos")
          .getPublicUrl(data.path);

        const publicUrl = publicUrlData.publicUrl;
        navigation.navigate("SignUp", { photoUrl: publicUrl });
      })
      .catch((err) => {
        console.error("Upload failed:", err);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing="front" />
      {photoUri && (
        <Image
          source={{ uri: photoUri }}
          style={{
            position: "absolute",
            top: 50,
            right: 20,
            width: 100,
            height: 150,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "#fff",
          }}
        />
      )}
      <TouchableOpacity
        onPress={() => {
          if (cameraRef.current) {
            cameraRef.current.takePictureAsync().then((photo) => {
              console.log("Photo URI:", photo.uri);
              setPhotoUri(photo.uri);
              uploadPhoto(photo.uri);
            });
          }
        }}
        style={{
          position: "absolute",
          bottom: 40,
          alignSelf: "center",
          backgroundColor: "gray",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Take a Picture</Text>
      </TouchableOpacity>
    </View>
  );
}
