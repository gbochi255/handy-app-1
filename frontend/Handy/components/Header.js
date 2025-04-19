import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation();
  const { userData, setUserData } = useContext(UserContext);
  const defaultImage = (
    <Image
      source={require("../assets/profileicon.jpg")}
      style={styles.profileIcon}
    />
  );
  const profileImage = (
    <Image
      source={require("../assets/defaultProfile.png")}
      style={styles.profileIcon}
    />
  );

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Image source={require("../assets/logo.jpg")} style={styles.logo} />
      </TouchableOpacity>

      {!userData.token ? defaultImage : profileImage}
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
