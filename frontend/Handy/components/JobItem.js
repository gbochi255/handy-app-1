import { StyleSheet, Text, View} from "react-native";


             
      export default function JobItem ({job_title}) { (
          <View style={styles.item}>
            <Text style={styles.title}>{job_title}</Text>
          </View>
          )}


const styles = StyleSheet.create({
    item: {
    paddingTop: 20,
    paddingHorizontal: 16, // left & right
    borderColor: "rgb(65, 129, 231)",
    borderWidth: 10,
  },
  title: {
    paddingTop: 20,
    paddingHorizontal: 16, // left & right
    borderColor: "rgb(65, 129, 231)",
    borderWidth: 10,
  },
})

