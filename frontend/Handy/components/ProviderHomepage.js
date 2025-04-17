import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Navbar from "./Navbar";
import Header from "./Header";

export default function ProviderHomepage() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState("available");
  const options = ["available", "my jobs", "my bids"];

  function handleGetJobs() {}

  return (
    <View style={styles.appContainer}>
      <Header />
      <Navbar />
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
