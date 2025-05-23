import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { getJobByID, postABid } from "../utils/api";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function ProviderJobDetailPage({ route }) {
  const { job_id } = route.params;
  const { userData } = useContext(UserContext);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [bidAmount, setBidAmount] = useState("0");
  const [submittedBid, setSubmittedBid] = useState(null);

  // Fetch job by jobId
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const jobData = await getJobByID(job_id);
        console.log("Fetched job:", jobData);
        setJob(jobData);
      } catch (error) {
        console.error("Error fetching job:", error);
        Alert.alert("Error", "Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [job_id]);

  const handleSubmitBid = () => {
    if (!bidAmount || isNaN(bidAmount) || Number(bidAmount) <= 0) {
      Alert.alert("Error", "Please enter a valid bid amount.");
      return;
    }

    postABid(job_id, Number(bidAmount), userData.user_id)
      .then((data) => {
        setSubmittedBid(Number(bidAmount));
        setShowModal(false);
        Alert.alert("Success", `Bid of $${bidAmount} submitted successfully!`);
      })
      .catch((error) => {
        console.error("Error submitting bid:", error);
        Alert.alert("Error", "Failed to submit bid.");
      });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading job...</Text>
      </View>
    );
  }

  if (!job) {
    return (
      <View style={styles.container}>
        <Text>Job not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Job Image */}
      <Image source={{ uri: job.photo_url }} style={styles.jobImage} />

      {/* Job Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.jobTitle}>{job.summary}</Text>
        <Text style={styles.jobDistance}>5 miles away</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.jobDate}>Posted: 12/4/25</Text>
          <Text style={styles.jobDate}>Target date: {job.target_date}</Text>
        </View>
        <Text style={styles.sectionTitle}>Description:</Text>
        <Text style={styles.jobDescription}>{job.job_detail}</Text>

        {/* Bid Section */}
        {submittedBid ? (
          <View style={styles.bidContainer}>
            <Text style={styles.bidTitle}>My Bid: ${submittedBid}</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.bidButton}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.bidButtonText}>Bid</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Bid Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>My Bid</Text>
            <TextInput
              style={styles.bidInput}
              value={bidAmount}
              onChangeText={setBidAmount}
              keyboardType="numeric"
              placeholder="Enter bid amount"
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmitBid}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  jobImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  detailsContainer: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  jobLocation: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  jobDistance: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  jobDate: {
    fontSize: 14,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  jobDescription: {
    fontSize: 16,
    marginBottom: 16,
  },
  bidContainer: {
    marginTop: 16,
  },
  bidTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bidButton: {
    backgroundColor: "#F05A28",
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 16,
  },
  bidButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  bidInput: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 6,
    padding: 10,
    width: "100%",
    marginBottom: 16,
    fontSize: 16,
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#F05A28",
    borderRadius: 6,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 8,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 6,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
  },
});
