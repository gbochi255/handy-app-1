import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-paper";

export default function BidItem({
  job_id,
  amount,
  provider_id,
  status,
  created_at,
}) {
  const navigation = useNavigation();

  return (
    <Card style={styles.card} onPress={() => navigation.navigate("BidPage")}>
      <Card.Content>
        <View style={styles.row}>
          <View style={styles.leftContent}>
            <Text style={styles.amountLabel}>Amount</Text>
            <Text style={styles.amountValue}>{amount}</Text>
          </View>

          <View style={styles.middleContent}>
            <Text style={styles.detailText}>Provider ID: {provider_id}</Text>
            <Text style={styles.detailText}>Status: {status || "pending"}</Text>
          </View>

          <View style={styles.rightContent}>
            <Text style={styles.dateLabel}>Bid Date</Text>
            <Text style={styles.dateValue}>{created_at}</Text>
          </View>
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
  leftContent: {
    width: 80,
    justifyContent: "center",
    alignItems: "flex-start",
    marginRight: 10,
  },
  amountLabel: {
    fontSize: 12,
    color: "gray",
  },
  amountValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  middleContent: {
    flex: 1,
    justifyContent: "center",
  },
  detailText: {
    fontSize: 14,
    color: "#333",
  },
  rightContent: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  dateLabel: {
    fontSize: 12,
    color: "gray",
  },
  dateValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
