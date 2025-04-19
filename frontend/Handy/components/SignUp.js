import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { Linking } from "react-native";

export default function SignUp() {
  const navigation = useNavigation();
  const route = useRoute();
  const { photoUrl } = route.params || {};

  function handleSubmit() {}

  return (
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

      <Button
        title="Launch Camera"
        onPress={() => navigation.navigate("CameraApp")}
      ></Button>

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
