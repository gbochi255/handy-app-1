<<<<<<< HEAD
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { Linking } from "react-native";

=======
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
import { registerUser } from "../utils/api";
>>>>>>> 1e2280fabdd0dbbe8f6026d253fec851e0ba7405
export default function SignUp() {
  const navigation = useNavigation();
  const route = useRoute();
  const { photoUrl } = route.params || {};

<<<<<<< HEAD
  function handleSubmit() {}
=======
  const { userData, setUserData } = useContext(UserContext);

  function handleSubmit() {
    const {
      firstName,
      lastName,
      email,
      password,
      postcode,
      county,
      city,
      bio,
    } = userData;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !postcode ||
      !bio ||
      !photoUrl
    ) {
      Alert.alert("Please fill in all fields");
      return;
    }

    registerUser(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.password,
      userData.postcode,
      userData.county,
      userData.city,
      photoUrl,
      userData.bio,
      userData.long,
      userData.lat,
      userData.isProvider
    )
      .then(() => {
        //reset the userData
        setUserData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          postcode: "",
          region: "",
          long: "",
          lat: "",
          bio: "",
          photoUrl: null,
          isProvider: false,
        });
      })
      .then((err) => {
        console.log("post error!");
      });

    Alert.alert("Account created");
    navigation.navigate("SignIn");
  }

  function handlePostcodeLookup() {
    axios
      .get(
        `https://api.geoapify.com/v1/postcode/search?postcode=${userData.postcode}&countrycode=gb&apiKey=d779b7f845cb429d96619e265d148015`
      )
      .then(({ data }) => {
        // console.log(data.features[0].properties.city);
        // console.log(data.features[0].properties.county);
        // console.log(data.features[0].properties.long);
        // console.log(data.features[0].properties.lat);

        setUserData({
          ...userData,
          city: data.features[0].properties.city,
          county: data.features[0].properties.county,
          long: data.features[0].properties.lon,
          lat: data.features[0].properties.lat,
        });
      })
      .catch((error) => {
        Alert.alert("Postcode not found!");
      });
  }
>>>>>>> 1e2280fabdd0dbbe8f6026d253fec851e0ba7405

  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback>
      <ScrollView>
    <View>
      <Text>First Name</Text>
      <TextInput
        placeholder="first name"
        value={firstName}
        onChangeText={setFirstName}
      ></TextInput>
      <Text>Last Name</Text>
      <TextInput
        placeholder="last name"
        value={lastName}
        onChangeText={setLastName}
      ></TextInput>
      <Text>Email</Text>
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      ></TextInput>
      <Text>Password</Text>
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
      ></TextInput>
      <Text>Post Code</Text>
      <TextInput
        placeholder="postcode"
        value={postcode}
        onChangeText={setPostcode}
      ></TextInput>
      <Text>Address Lookup??</Text>
      <TextInput
        placeholder="address lookup"
        value={address}
        onChangeText={setAddress}
      ></TextInput>

<<<<<<< HEAD
      <Button
        title="Launch Camera"
        onPress={() => navigation.navigate("CameraApp")}
      ></Button>
=======
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
                {userData.city || userData.county || "*** City ***"}
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
>>>>>>> 1e2280fabdd0dbbe8f6026d253fec851e0ba7405

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
