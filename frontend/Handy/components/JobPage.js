import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import testBidData from "../assets/testBidData";
import BidItem from "./BidItem";

export default function JobPage({ job_id }) {
  return (
    <View>
      <View style={styles.jobMetaData}>
        <Image></Image>
        <View style={styles.jobInfo}>
          <Text>Job:</Text>
          <Text>Image:</Text>
          <Text>Posted_date:</Text>
        </View>
      </View>
      <View>
        <Text>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis
          quasi expedita accusamus itaque recusandae dolor iusto earum, optio
          veniam! Hic est ipsam excepturi saepe! Vel voluptatem quod aut cumque
          recusandae?
        </Text>
      </View>
      <View style={styles.container}>
        <SafeAreaView>
          <FlatList
            data={testBidData} 
            keyExtractor={(item) => item.bid_id.toString()}
            renderItem={({ item }) => (
              <BidItem
                bid_id={item.bid_id}
                job_id={item.job_id}
                amount={item.amount}
                provider_id={item.provider_id}
                status={item.status}
                created_at={item.created_at}
              />
            )}
          />
        </SafeAreaView>
      </View>
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
});
