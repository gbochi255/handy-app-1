import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { JobPage } from "./JobPage";
import { useNavigation } from "@react-navigation/native";


// {
//   image_title,
//   job_title,
//   posted_date,
//   job_id,
// }

// bid_id: 1,
// job_id:1,
// amount: "£20",
// provider_id: 3,
// status: "open",
// created_at: "25/04/25"

export default function BidItem({bidItem}) {
  
  
  console.log(bidItem, "<<<< props in BidItem");
  
  const bids = [{}]
  const navigation = useNavigation()
  

  return (
    <View>

      <TouchableHighlight onPress={() => navigation.navigate("BidPage", bidItem)} underlayColor="white">
        <View style={styles.item}>
          <Text >Amount: {bidItem.amount}</Text>
         <Text style={styles.job_title}>Provider: {bidItem.provider_id}</Text>
         <Text style={styles.posted_date}>Status: {bidItem.status}</Text>
         <Text style={styles.posted_date}>Bid Date:{bidItem.created_at}</Text>

        </View>
      </TouchableHighlight>

    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    alignitems: "center",
    paddingHorizontal: 5, // left & right
    borderColor: "rgb(199, 194, 191)",
    borderWidth: 3,
    margin: 3,
    flexDirection: "row",
    borderRadius: 5,
    height: 120,
    marginBottom:10
  },
  image_title: {
    flex: 1,
    paddingTop: 20,
    borderWidth: 1,
    margin: 5,
  },
  bid_title: {
    flex: 2,
    paddingTop: 20,
    borderWidth: 1,
    margin: 5,
  },
  bid_date: {
    flex: 1,
    paddingTop: 20,
    borderWidth: 1,
    margin: 5,
  },
});
