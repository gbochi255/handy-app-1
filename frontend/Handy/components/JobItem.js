import { StyleSheet, Text, View, Image } from "react-native";
import { JobPage } from "./JobPage";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-paper";

// {
//   image_title,
//   job_title,
//   posted_date,
//   job_id,
// }

export default function JobItem(props) {
  const navigation = useNavigation();

  return (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate("JobPage", props)}
    >
      <Card.Content>
        <View style={styles.row}>
          <Image
            source={{
              uri: `https://picsum.photos/seed/${props.job_id}/200/200`,
            }}
            style={styles.image}
          />
          <View style={styles.middleContent}>
            <Text style={styles.jobTitle}>{props.job_title}</Text>
            <Text style={styles.postedDate}>{props.posted_date}</Text>
          </View>
          <View style={styles.rightContent}>
            <Text style={styles.distanceLabel}>Distance</Text>
            <Text style={styles.distanceValue}>{props.distance} miles</Text>
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
  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 10,
  },
  middleContent: {
    flex: 1,
    justifyContent: "center",
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  postedDate: {
    fontSize: 14,
    color: "gray",
  },
  rightContent: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  distanceLabel: {
    fontSize: 12,
    color: "gray",
  },
  distanceValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
