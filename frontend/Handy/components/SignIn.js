import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { SignUp } from "./SignUp";
import { useNavigation } from "@react-navigation/native";

export default function SignIn() {
  const [username, changeUserName] = useState("");
  const [password, changePassword] = useState("");

  const navigation = useNavigation();


  const loginCheck = () => {
    // checkUsersApi(username, password)
    // .then(()=>{
      navigation.navigate("CustomerHomepage")
    // })
      // .catch(()=>{
      //display some text to say that password was incorrect
      // })
  }

  
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

      <Button 
      title="Login" 
      onPress={() => loginCheck()}
      ></Button>
    


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

