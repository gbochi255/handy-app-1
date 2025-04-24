import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

import { getBids } from "../utils/api";
import BidItem from "./BidItem";

import Header from "./Header";

export default function JobPage({ route }) {
  const {
    job_id,
    summary,
    job_detail,
    created_by,
    status,
    photo_url,
    target_date,
    location,
  } = route.params;
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBidsByJobId = async (job_id) => {
      try {
        setLoading(true);

        const bids = await getBids(job_id);
        setBids(bids || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBidsByJobId(job_id);
  }, [job_id]);

  return (
    <View>
      <Header />
      <View style={styles.jobMetaData}>
        <Image
          source={{ uri: photo_url || "https://picsum.photos/seed/1/200/200" }}
          style={styles.image}
        />
        <View style={styles.jobInfo}>
          <Text style={styles.title}>{summary}</Text>
          <Text style={styles.date}>Target Date: {target_date} </Text>
        </View>
      </View>
      <View>
        <Text style={styles.details}>Details: {job_detail}</Text>
      </View>

      <SafeAreaView>
        <FlatList
          data={bids.filter(
            (bid) =>
              bid.status === "pending" ||
              bid.status === "open" ||
              bid.status === "accepted"
          )}
          keyExtractor={(item) => item.bid_id.toString()}
          renderItem={({ item }) => (
            <BidItem
              job_id={job_id}
              bid_id={item.bid_id}
              amount={item.amount}
              status={item.status}
              created_at={item.created_at}
              avatar_url={item.avatar_url}
              provider_id={item.provider_id}
              provider_firstname={item.pr_firstname}
              provider_lastname={item.pr_lastname}
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  jobMetaData: {
    flexDirection: "row",
    borderBlockColor: "#rgb(65, 129, 231)",
    borderWidth: 1,
    padding: 5,
  },
  jobInfo: {
    flex: 2,
  },
  item: {
    alignitems: "center",
    paddingTop: 20,
    paddingHorizontal: 16, // left & right
    borderColor: "rgb(65, 129, 231)",
    borderWidth: 3,
    margin: 3,
    flexDirection: "row",
  },
  image_title: {
    flex: 1,
    paddingTop: 20,
    borderWidth: 1,
    margin: 5,
  },
  job_title: {
    flex: 2,
    paddingTop: 20,
    borderWidth: 1,
    margin: 5,
  },
  posted_date: {
    flex: 1,
    paddingTop: 20,
    borderWidth: 1,
    margin: 5,
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 2,
    marginRight: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 500,
    marginBottom: 10,
  },
  date: {
    fontSize: 15,
    color: "red",
  },
  details: {
    fontSize: 22,
    fontWeight: 300,
    padding: 10,
  },
});
