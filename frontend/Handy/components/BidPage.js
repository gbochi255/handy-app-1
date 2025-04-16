import { StyleSheet, Text, View, Image } from "react-native";



export default function BidPage({ route: { params } }) {
  console.log(params, '<---params in JobPage')
  return (
    <View>
      <View style={styles.bidMetaData}>
        <Image></Image>
        <View style={styles.bidInfo}>
          <Text>Job:{params.bid_title}</Text>
          <Text>Image:{params.image_title}</Text>
          <Text>Bid Date: {params.posted_date}</Text>
        </View>
      </View>
      <View>
        <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis quasi expedita accusamus itaque recusandae dolor iusto earum, optio veniam! Hic est ipsam excepturi saepe! Vel voluptatem quod aut cumque recusandae?</Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  bidMetaData: {
    flexDirection: "row",
    borderBlockColor: "#rgb(65, 129, 231)",
    borderWidth: 1,
    padding: 5
  },
  bidInfo: {
    flex:2
  },
  item: {
    alignitems: 'center',
    paddingTop: 20,
    paddingHorizontal: 16, // left & right
    borderColor: "rgb(65, 129, 231)",
    borderWidth: 3,
    margin: 3,
    flexDirection: 'row',
    
  },
  image_title: {
    flex: 1,
    paddingTop: 20,
    borderWidth: 1,
    margin: 5
  },
  bid_title: {
    flex: 2,
    paddingTop: 20,
    borderWidth: 1,
    margin: 5
  },
  posted_date: {
    flex: 1,
    paddingTop: 20,
    borderWidth: 1,
    margin: 5
  },
})

