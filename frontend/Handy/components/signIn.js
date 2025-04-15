import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { SignUp } from "./SignUp";
import { useNavigation } from "@react-navigation/native";

const SignIn = () => {
  const [username, changeUserName] = useState("");
  const [password, changePassword] = useState("");

  const navigation = useNavigation();

  return (
    <View>
      <TextInput
        placeholder="username"
        value={username}
        onChangeText={(newText) => changeUserName(newText)}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={(newText) => changePassword(newText)}
      />

      <Button title="Login" />

      <Button
        title="Sign-up"
        onPress={() => navigation.navigate("SignUp")}
      ></Button>
    </View>
  );
};

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//   });

export { SignIn };
