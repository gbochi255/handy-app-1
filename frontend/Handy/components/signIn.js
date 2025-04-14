import {useState} from 'react'
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

const SignIn = () => {
    const [username, changeUserName] = useState('');
    const [password, changePassword] = useState('');


  return (
    <View>


      <TextInput
      placeholder="username"
      value={username}
      onChangeText={newText => changeUserName(newText)}
      
      />
      <TextInput 
      placeholder="password"
      value={password}
      onChangeText={newText => changePassword(newText)}
      />

      <Button
        title="Login"
      />
      
      <Button
        title="Sign-up"
      />
      

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
