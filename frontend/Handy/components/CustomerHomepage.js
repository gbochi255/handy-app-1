import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import testJobData from "../assets/testJobData";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import JobItem from "./JobItem";

export default function CustomerHomepage() {
  const navigation = useNavigation();


function renderList ({item}) {
    return <Text>a</Text>;

}


  return (
    <View style={styles.appContainer}>




      {/* navbar section */}
      <View style={styles.navbarButtonContainer}>
        <View style={styles.customerButton}>
          <Button title="Customer" />
        </View>

        <View style={styles.providerButton}>
          <Button
            title="Provider"
            onPress={() => navigation.navigate("ProviderHomepage")}
          />
        </View>
      </View>

      {/* main section */}
      <View>
        <Text style={{ fontSize: 40 }}>My Jobs</Text>


        <View style={styles.addJobButton}>
          <Button
            title="Add Job"
            onPress={() => navigation.navigate("PostJob")}
          ></Button>
        </View>


          <View style={styles.container}>
      
               <SafeAreaView>
                <FlatList
                  data={testJobData}
                  renderItem={({item})=>  <JobItem 
                  image_title={item.image_title}
                  job_title={item.job_title}
                  posted_date={item.posted_date}
                  job_id={item.job_id}
                  
                  
                  />}
                  keyExtractor={item => item.job_id}
                />
               </SafeAreaView> 
  
          </View>



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
    backgroundColor: "#3DADFF",
  },
  providerButton: {
    flex: 1,
    borderColor: "rgb(0, 0, 0)",
    borderWidth: 2,
  },
  myJobsTitle: {
    font: 60,
  },
  addJobButton: {
    borderColor: "rgb(0, 0, 0)",
    borderWidth: 2,
    backgroundColor: "#66D575",
  },
  container: {
    paddingTop: 20,
    paddingHorizontal: 16, // left & right
    borderColor: "rgb(0, 0, 0)",
    borderWidth: 10,
  },
});
