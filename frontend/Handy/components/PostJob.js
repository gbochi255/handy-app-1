import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function PostJob() {
    
  const navigation = useNavigation();

  return (
    <View>
        
      <View>
        <Text>Post new job</Text>
      </View>

    </View>
  );
}
