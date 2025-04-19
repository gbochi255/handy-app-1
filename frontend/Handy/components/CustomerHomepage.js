import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import testJobData from "../assets/testJobData";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import JobItem from "./JobItem";
import Navbar from "./Navbar";
import Header from "./Header";

export default function CustomerHomepage() {
  const navigation = useNavigation();

  function renderList({ item }) {
    return <Text>a</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <Navbar />

      {/* main section */}

      {/* <Text style={{ fontSize: 20 }}>My Jobs</Text> */}

      {/* <View style={styles.addJobButton}>
          <Button
            title="Add Job"
            onPress={() => navigation.navigate("PostJob")}
          ></Button>
        </View> */}

      <View style={styles.contentContainer}>
        <FlatList
          data={testJobData}
          renderItem={({ item }) => (
            <JobItem
              image_title={item.image_title}
              job_title={item.job_title}
              posted_date={item.posted_date}
              job_id={item.job_id}
              distance={item.distance}
            />
          )}
          keyExtractor={(item) => item.job_id}
        />
      </View>

      <TouchableOpacity
        style={styles.orangeButton}
        onPress={() => navigation.navigate("PostJob")}
      >
        <Text style={styles.buttonText}>Post a New Job</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 16,
  },
  appContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  addJobButton: {
    borderColor: "rgb(0, 0, 0)",
    borderWidth: 2,
    backgroundColor: "#66D575",
  },
  contentContainer: {
    flex: 1,
    paddingTop: 20,
  },
  orangeButton: {
    backgroundColor: "#FF7A00",
    borderRadius: 6,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
