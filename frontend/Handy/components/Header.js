import { StyleSheet, View, Image } from "react-native";
//change customer page to this later
export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <Image source={require("../assets/logo.jpg")} style={styles.logo} />
      <Image
        source={require("../assets/profileicon.jpg")}
        style={styles.profileIcon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#f0f0f0",
  },
  logo: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  profileIcon: {
    width: 75,
    height: 75,
    resizeMode: "contain",
    padding: 10,
    borderRadius: 50,
    borderColor: "#FF7A00",
    borderWidth: 2,
  },
});
