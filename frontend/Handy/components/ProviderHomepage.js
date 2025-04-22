import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import testJobData from "../assets/testJobData";
import JobItem from "./JobItem";
import Header from "./Header";

export default function ProviderHomepage() {
  return (
    <View style={styles.appContainer}>
      <Header />

      <View style={styles.contentContainer}>
        <FlatList
          data={testJobData}
          renderItem={({ item }) => (
            <JobItem
              summary={item.summary}
              job_detail={item.job_detail}
              created_by={item.created_by}
              status={item.status}
              photo_url={item.photo_url}
              target_date={item.target_date}
              location={item.location}
            />
          )}
          keyExtractor={(item) => item.job_id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    alignContent: "center",
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
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#FF7A00",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#FF7A00",
  },
  label: {
    fontSize: 16,
    textTransform: "capitalize",
  },
});
