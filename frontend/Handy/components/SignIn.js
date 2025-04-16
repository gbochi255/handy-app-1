import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData } = useContext(UserContext);
  const navigation = useNavigation();

  function verifyUser() {
    setUserData({
      firstName: "John",
      lastName: "Smith",
      email: "john@smith.com",
      password: "banana",
      postcode: "E14 0GX",
      region: "London",
      long: "-0.007487",
      lat: "51.516586",
      bio: "Great with a hammer",
      photoUrl: "./assets/defaultProfile.png",
      isProvider: true,
      token: true,
    });

    navigation.navigate("CustomerHomepage");

    // axios
    //   .post("url/login", {
    //     username,
    //     password,
    //   })
    //   .then((res) => {
    //     setUserData({
    //       ...userData,
    //       token: res.data.user.token,
    //     });
    //     navigation.navigate("CustomerHomepage");
    //   })
    //   .catch((err) => {
    //     Alert.alert("Login failed");
    //   });
  }

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.jpg")} style={styles.logo} />

      <TextInput
        style={styles.input}
        placeholder="username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.orangeButton}
        onPress={() => {
          verifyUser();
        }}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.orangeButton}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logo}
        onPress={() => navigation.navigate("CustomerHomepage")}
      >
        <Image source={require("../assets/backdoor.png")} style={styles.logo} />
      </TouchableOpacity>

      <TouchableOpacity
        source={require("../assets/backdoor.png")}
        style={styles.backdoor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  backdoor: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    backgroundColor: "#fff",
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  orangeButton: {
    backgroundColor: "#FF7A00",
    borderRadius: 6,
    paddingVertical: 12,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
