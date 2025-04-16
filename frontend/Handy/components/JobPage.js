import { StyleSheet, Text, View} from "react-native";


             
      export default function JobPage ({route:{params}}) { 
        console.log(params, '<---params in JobPage')
        return (
          <View>
            <Text>Job:{params.job_title}</Text>
            <Text>Image:{params.image_title}</Text>
            <Text>Posted_date:{params.posted_date}</Text>
           
            
        </View>
        )}


const styles = StyleSheet.create({
    item: {
      alignitems:'center',
    paddingTop: 20,
    paddingHorizontal: 16, // left & right
    borderColor: "rgb(65, 129, 231)",
    borderWidth: 3,
    margin: 3,
    flexDirection:'row'
  },
  image_title: {
    flex:1,
    paddingTop: 20,
    borderWidth: 1,
    margin: 5
  },
  job_title: {
    flex:2,
    paddingTop: 20,
    borderWidth: 1,
    margin: 5
  },
  posted_date: {
    flex:1,
    paddingTop: 20,
    borderWidth: 1,
    margin: 5
  },
})

