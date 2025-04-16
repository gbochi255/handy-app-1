import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { JobPage } from "./JobPage";
import { useNavigation } from "@react-navigation/native";


// {
//   image_title,
//   job_title,
//   posted_date,
//   job_id,
// }


export default function JobItem(props) {

  const navigation = useNavigation()
  

  return (
    <View>

      <TouchableHighlight onPress={() => navigation.navigate("JobPage", props)} underlayColor="white">
        <View style={styles.item}>
          <Text style={styles.image_title}>{props.image_title}</Text>
         <Text style={styles.job_title}>{props.job_title}</Text>
         <Text style={styles.posted_date}>{props.posted_date}</Text>
        </View>
      </TouchableHighlight>

    </View>
  );
}

const styles = StyleSheet.create({
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
