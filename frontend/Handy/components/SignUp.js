import {
  View,
  TextInput,
  Text,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function SignUp() {
  const navigation = useNavigation();
  const route = useRoute();
  const { photoUrl } = route.params || {};
  const { userData, setUserData } = useContext(UserContext);

  function handleSubmit() {
    const { firstName, lastName, email, password, postcode, address, bio } =
      userData;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !postcode ||
      !address ||
      !bio ||
      !photoUrl
    ) {
      Alert.alert("Please fill in all fields");
      return;
    }
    Alert.alert("Account created");
    navigation.navigate("SignIn");
  }

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.jpg")} style={styles.logo} />

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={userData.firstName}
        onChangeText={(text) => setUserData({ ...userData, firstName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={userData.lastName}
        onChangeText={(text) => setUserData({ ...userData, lastName: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userData.email}
        onChangeText={(text) => setUserData({ ...userData, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={userData.password}
        onChangeText={(text) => setUserData({ ...userData, password: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Postcode"
        value={userData.postcode}
        onChangeText={(text) => setUserData({ ...userData, postcode: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={userData.address}
        onChangeText={(text) => setUserData({ ...userData, address: text })}
      />

      <View style={styles.cameraRow}>
        <TouchableOpacity
          style={styles.greenButton}
          onPress={() => navigation.navigate("CameraApp")}
        >
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>
        <Text style={styles.selfieLabel}>Take a selfie</Text>
      </View>

      <TextInput
        style={[styles.input, styles.bioInput]}
        placeholder="Describe yourself"
        multiline
        value={userData.bio}
        onChangeText={(text) => setUserData({ ...userData, bio: text })}
      />

      <TouchableOpacity style={styles.orangeButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {photoUrl && (
        <Text
          style={styles.photoLink}
          onPress={() => Linking.openURL(photoUrl)}
        >
          View Uploaded Photo
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
    resizeMode: "contain",
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    backgroundColor: "#fff",
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  bioInput: {
    height: 130,
  },
  cameraRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  greenButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  orangeButton: {
    backgroundColor: "#FF7A00",
    borderRadius: 6,
    paddingVertical: 24,
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
