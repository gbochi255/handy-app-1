import { StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import Login from "../components/Chat/Login.js";
import Chat from "../components/Chat/Chat.js";

// { route: { params }, jobDetes }

export default function BidPage({ route: { params } }) {
  const bidInfo = params[0];
  const jobInfo = params[1];

  return (
    <View>
      <View style={styles.bidMetaData}>
        <Image></Image>
        <View style={styles.bidInfo}>
          <Text>Job: {jobInfo.job_title}</Text>
          <Text>Image: {jobInfo.image_title}</Text>
          <Text>Bid Date: {bidInfo.created_at}</Text>
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

      <SafeAreaView>
        <Login />
        <Chat />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  bidMetaData: {
    flexDirection: "row",
    borderBlockColor: "#rgb(65, 129, 231)",
    borderWidth: 1,
    padding: 5,
  },
  bidInfo: {
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
  bid_title: {
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

  //chat styling

  loginscreen: {
    flex: 1,
    backgroundColor: "#EEF1FF",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    width: "100%",
  },
  loginheading: {
    fontSize: 26,
    marginBottom: 10,
  },
  logininputContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logininput: {
    borderWidth: 1,
    width: "90%",
    padding: 8,
    borderRadius: 2,
  },
  loginbutton: {
    backgroundColor: "green",
    padding: 12,
    marginVertical: 10,
    width: "60%",
    borderRadius: "50%",
    elevation: 1,
  },
  loginbuttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
  chatscreen: {
    backgroundColor: "#F7F7F7",
    flex: 1,
    padding: 10,
    position: "relative",
  },
  chatheading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
  },
  chattopContainer: {
    backgroundColor: "#F7F7F7",
    height: 70,
    width: "100%",
    padding: 20,
    justifyContent: "center",
    marginBottom: 15,
    elevation: 2,
  },
  chatheader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chatlistContainer: {
    paddingHorizontal: 10,
  },
  chatemptyContainer: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  chatemptyText: { fontWeight: "bold", fontSize: 24, paddingBottom: 30 },
  messagingscreen: {
    flex: 1,
  },
  messaginginputContainer: {
    width: "100%",
    minHeight: 100,
    backgroundColor: "white",
    paddingVertical: 30,
    paddingHorizontal: 15,
    justifyContent: "center",
    flexDirection: "row",
  },
  messaginginput: {
    borderWidth: 1,
    padding: 15,
    flex: 1,
    marginRight: 10,
    borderRadius: 20,
  },
  messagingbuttonContainer: {
    width: "30%",
    backgroundColor: "green",
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  modalbutton: {
    width: "40%",
    height: 45,
    backgroundColor: "green",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  modalbuttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modaltext: {
    color: "#fff",
  },
  modalContainer: {
    width: "100%",
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    elevation: 1,
    height: 400,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    zIndex: 10,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  modalinput: {
    borderWidth: 2,
    padding: 15,
  },
  modalsubheading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  mmessageWrapper: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  mmessage: {
    maxWidth: "50%",
    backgroundColor: "#f5ccc2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 2,
  },
  mvatar: {
    marginRight: 5,
  },
  cchat: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    height: 80,
    marginBottom: 10,
  },
  cavatar: {
    marginRight: 15,
  },
  cusername: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  cmessage: {
    fontSize: 14,
    opacity: 0.7,
  },
  crightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  ctime: {
    opacity: 0.5,
  },
});
