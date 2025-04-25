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
import { useContext, useEffect, useState } from "react";
import JobItem from "./JobItem";
import { getClientJobs } from "../utils/api";
import { UserContext } from "./UserContext";

export default function CustomerHomepage() {
  const navigation = useNavigation();
  const { userData } = useContext(UserContext);

  const isProvider = userData.is_provider;
  const [activeTab, setActiveTab] = useState("Open");
  const [openJobs, setOpenJobs] = useState([]);
  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("CustomerHomepage userData.user_id:", userData.user_id);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const open = await getClientJobs(userData.user_id, "open");
        const accepted = await getClientJobs(userData.user_id, "accepted");

        setOpenJobs(open.jobs || []);
        setAcceptedJobs(accepted.jobs || []);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const displayedJobs = activeTab === "Open" ? openJobs : acceptedJobs;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      {isProvider && (
        <View style={styles.navbarButtonContainer}>
          <TouchableOpacity
            style={styles.adminButtonTouchable}
            onPress={() => navigation.navigate("ProviderHomepage")}
            activeOpacity={0.7}
          >
            <Text style={styles.adminButtonText}>Provider</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Open" && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab("Open")}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "Open" && styles.tabButtonTextActive,
            ]}
          >
            Open
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Accepted" && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab("Accepted")}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "Accepted" && styles.tabButtonTextActive,
            ]}
          >
            Accepted
          </Text>
        </TouchableOpacity>
      </View>

      {/* Job List */}
      <View style={styles.contentContainer}>
        {loading ? (
          <Text>Loading jobs...</Text>
        ) : (
          <FlatList
            data={displayedJobs}
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
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  tabButton: {
    borderWidth: 2,
    borderColor: "#F05A28",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 10,
  },
  tabButtonActive: {
    backgroundColor: "#FF7A00",
  },
  tabButtonText: {
    color: "#F05A28",
    fontSize: 14,
    fontWeight: "bold",
  },
  tabButtonTextActive: {
    color: "#fff",
  },
  navbarButtonContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  navbarButtonContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  adminButtonTouchable: {
    backgroundColor: "grey",
    borderWidth: 2,
    borderColor: "grey",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  adminButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
