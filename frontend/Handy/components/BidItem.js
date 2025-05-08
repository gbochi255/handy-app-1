import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-paper";
import { acceptBid } from "../utils/api";
import { useState } from "react";

export default function BidItem({
  job_id,
  bid_id,
  amount,
  status,
  created_at,
  avatar_url,
  provider_id,
  provider_firstname,
  provider_lastname,
}) {
  const navigation = useNavigation();

  const [bidStatus, setBidStatus] = useState(status);

  function handleAcceptPress() {
    acceptBid(job_id, bid_id)
      .then(() => {
        setBidStatus("accepted");
      })
      .catch((err) => {
        console.error("Bid Failed");
      });
  }

  return (
    <Card
      style={[styles.card, bidStatus === "accepted" && styles.acceptedCard]}
    >
      <Card.Content>
        <View style={styles.row}>
          <Image
            source={{
              uri: avatar_url || "https://picsum.photos/seed/avatar/100/100",
            }}
            style={styles.avatar}
          />
          <View style={styles.middleContent}>
            <Text style={styles.detailText}>Provider ID: {provider_id}</Text>
            <Text style={styles.detailText}>
              {provider_firstname} {provider_lastname}
            </Text>
            <Text style={styles.detailText}>
              Bid Placed: {new Date(created_at).toLocaleDateString()}
            </Text>
            <Text style={styles.detailText}>Status: {status || "pending"}</Text>
            <Text style={styles.amountValue}>£{amount}</Text>
          </View>

          <TouchableOpacity
            style={styles.acceptButton}
            onPress={handleAcceptPress}
          >
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  middleContent: {
    flex: 1,
    justifyContent: "center",
  },
  detailText: {
    fontSize: 14,
    color: "#333",
  },
  amountValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },
  acceptButton: {
    backgroundColor: "#34C759",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  acceptedCard: {
    borderWidth: 4,
    borderColor: "#34C759",
  },
});
