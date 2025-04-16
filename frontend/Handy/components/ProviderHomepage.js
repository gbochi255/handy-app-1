import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function ProviderHomepage() {
  const navigation = useNavigation();

  return (
    <View style={styles.appContainer}>
      {/* navbar section */}
      <View style={styles.navbarButtonContainer}>
        <View style={styles.customerButton}>
          <Button 
          title="Customer"
          onPress={() => navigation.navigate("CustomerHomepage")}
          />
        </View>
        <View style={styles.providerButton}>
          <Button 
          title="Provider"
           />
        </View>
      </View>

      {/* main section */}
  
            <View >
              <Text >Provider</Text>
            </View>

    </View>
  );
}



const styles = StyleSheet.create({
    appContainer: {
      flex: 1,
      paddingTop: 20,
      paddingHorizontal: 16, // left & right
      borderColor: "rgb(65, 129, 231)",
      borderWidth: 10,
    },
  
    navbarButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      margin: 20,
      marginBottom: 40,
      marginLeft: 60,
      marginRight: 60,
      borderColor: "rgb(0, 0, 0)",
      borderWidth: 2,
    },
    customerButton: {
      flex: 1,
      borderColor: "rgb(0, 0, 0)",
      borderWidth: 2,
    },
    providerButton: {
      flex: 1,
      borderColor: "rgb(0, 0, 0)",
      borderWidth: 2,
      backgroundColor: "#3DADFF",
    },
    myJobsTitle: {
      font: 60,
    },
    addJobButton: {
      borderColor: "rgb(0, 0, 0)",
      borderWidth: 2,
      backgroundColor: "#66D575",
    },
  });

  