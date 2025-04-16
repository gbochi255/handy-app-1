import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export default function SignUp() {
  const navigation = useNavigation();
  const route = useRoute();
  const { photoUrl } = route.params || {};

  const { userData, setUserData } = useContext(UserContext);

  function handleSubmit() {
    const { firstName, lastName, email, password, postcode, region, bio } =
      userData;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !postcode ||
      !region ||
      !bio ||
      !photoUrl
    ) {
      Alert.alert("Please fill in all fields");
      return;
    }

    // axios
    //   .post(`/url/register`, {
    //     firstName: userData.firstName,
    //     lastName: userData.lastName,
    //     email: userData.email,
    //     password: userData.password,
    //     postcode: userData.postcode,
    //     region: userData.region,
    //     long: userData.long,
    //     lat: userData.lat,
    //     bio: userData.bio,
    //     photoUrl: photoUrl,
    //     isProvider: userData.isProvider,
    //   })
    //   .then(() => {
    //     setUserData({
    //       firstName: "",
    //       lastName: "",
    //       email: "",
    //       password: "",
    //       postcode: "",
    //       region: userData.region,
    //       long: userData.long,
    //       lat: userData.lat,
    //       bio: "",
    //       isProvider: false,
    //       photoUrl: null,
    //     });
    //   })
    //   .then((err) => {
    //     console.log("post error!");
    //   });

    Alert.alert("Account created");
    navigation.navigate("SignIn");
  }

  function handlePostcodeLookup() {
    axios
      .get(`https://api.postcodes.io/postcodes/${userData.postcode}`)
      .then(({ data }) => {
        console.log(data);
        setUserData({
          ...userData,
          region: data.result.region,
          long: data.result.longitude,
          lat: data.result.latitude,
        });

        console.log(data.result.region);
        console.log(data.result.longitude);
        console.log(data.result.latitude);
      })
      .catch((error) => {
        Alert.alert("Postcode not found!");
      });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.container}>
            <Image source={require("../assets/logo.jpg")} style={styles.logo} />

            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={userData.firstName}
              onChangeText={(text) =>
                setUserData({ ...userData, firstName: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={userData.lastName}
              onChangeText={(text) =>
                setUserData({ ...userData, lastName: text })
              }
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
              onChangeText={(text) =>
                setUserData({ ...userData, password: text })
              }
            />

            <View style={styles.postcodeRow}>
              <TextInput
                style={styles.postcodeInput}
                placeholder="Enter Postcode"
                value={userData.postcode}
                onChangeText={(text) =>
                  setUserData({ ...userData, postcode: text })
                }
                autoCapitalize="characters"
              />
              <TouchableOpacity
                style={styles.lookupButton}
                onPress={() => {
                  handlePostcodeLookup();
                }}
              >
                <Text style={styles.buttonText}>Lookup Postcode</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.readOnlyInput}>
              <Text style={styles.readOnlyText}>
                {userData.region || "*** Region ***"}
              </Text>
            </View>

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
            <View style={styles.checkboxRow}>
              <Checkbox
                value={userData.isProvider}
                onValueChange={(newValue) =>
                  setUserData({ ...userData, isProvider: newValue })
                }
                tintColors={{ true: "#FF7A00", false: "#ccc" }}
              />
              <Text style={styles.checkboxLabel}>
                I want to be a Service Provider
              </Text>
            </View>
            <TouchableOpacity
              style={styles.orangeButton}
              onPress={handleSubmit}
            >
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    height: 100,
  },
  cameraRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  postcodeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
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
  postcodeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    backgroundColor: "#fff",
    padding: 12,
    fontSize: 16,
  },
  lookupButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  readOnlyInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    backgroundColor: "#eaeaea",
    padding: 12,
    marginBottom: 10,
  },
  readOnlyText: {
    fontSize: 16,
    color: "#555",
  },
  checkboxRow: {
    flexDirection: "row",
    padding: 5,
  },
  checkboxLabel: {
    marginLeft: 10,
  },
});
