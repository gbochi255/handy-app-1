import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CustomerHomepage() {
  const navigation = useNavigation();

  return (
    <View>

      <View>
        <Text>Customer | Provider</Text>
      </View>

      <View>
        <Text>Customer Homepage</Text>
      </View>

      <Button title="Add Job" onPress={() => navigation.navigate("PostJob")}></Button>

      <View>
        <Text>Current Job 1</Text>
      </View>
    </View>
  );
}
