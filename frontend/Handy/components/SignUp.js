import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useState } from "react";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");

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
      <Button title="Launch Camera"></Button>
      <TextInput
        placeholder="describe yourself"
        multiline={true}
        numberOfLine={4}
        value={bio}
        onChangeText={setBio}
      />
      <Button title="Submit" onPress={handleSubmit}></Button>
      <Button title="provider"></Button>
    </View>
  );
}
