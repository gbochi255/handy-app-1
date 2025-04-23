import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useEffect, useState } from "react";
import JobItem from "./JobItem";
import { getJobs } from "../utils/api";

export default function CustomerHomepage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { userData } = useContext(UserContext);
  const loggedIn = userData.isProvider;

  useEffect(() => {
    getJobs()
      .then((jobObjects) => {
        setJobs(jobObjects.jobs);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch jobs:", err);
        setLoading(false);
      });
  }, []);
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      {loggedIn ? (
        <View style={styles.navbarButtonContainer}>
          <View style={styles.providerButton}>
            <Button
              title="Handy Admin"
              onPress={() => navigation.navigate("ProviderHomepage")}
            />
          </View>
        </View>
      ) : null}

      <View style={styles.contentContainer}>
        {loading ? (
          <Text>Loading jobs...</Text>
        ) : (
          <FlatList
            data={jobs}
            keyExtractor={(item) => item.job_id.toString()}
            renderItem={({ item }) => (
              <JobItem
                job_id={item.job_id}
                summary={item.summary}
                job_detail={item.job_detail}
                created_by={item.created_by}
                status={item.status}
                photo_url={item.photo_url}
                target_date={item.target_date}
                location={item.location}
              />
            )}
          />
        )}
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
  navbarButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
    marginBottom: 0,
    marginLeft: 60,
    marginRight: 60,
    borderColor: "rgb(0, 0, 0)",
    borderWidth: 2,
  },
  providerButton: {
    flex: 1,
    borderColor: "rgb(0, 0, 0)",
    borderWidth: 1,
    backgroundColor: "#FF7A00",
  },
});
