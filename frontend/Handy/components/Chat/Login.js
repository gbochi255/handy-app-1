import React, { useState } from "react";
import {
    Text,
    SafeAreaView,
    View,
    TextInput,
    Pressable,
    Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";


const Login = ({ navigation }) => {
    const [username, setUsername] = useState("");


    const storeUsername = async () => {
        try {
            //👇🏻 async function - saves the username to AsyncStorage
            //   redirecting to the Chat page
            await AsyncStorage.setItem("username", username);
            // navigation.navigate("Chat");
            console.log({username})
        } catch (e) {
            Alert.alert("Error! While saving username");
        }
    };


    //👇🏻 checks if the input field is empty
    const handleSignIn = () => {
        if (username.trim()) {
             //👇🏻 calls AsyncStorage function
            storeUsername();
        } else {
            Alert.alert("Username is required.");
        }
    };

    return (
<View>
        <SafeAreaView>
            <View>
                <Text >Sign in</Text>
                <View >
                    <TextInput
                        autoCorrect={false}
                        placeholder='Enter your username'
                        onChangeText={(value) => setUsername(value)}
                    />
                </View>

                <Pressable onPress={handleSignIn}>
                    <View>
                        <Text>Get Started</Text>
                    </View>
                </Pressable>
            </View>
        </SafeAreaView>
</View>
    );

};

export default Login;