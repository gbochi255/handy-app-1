import { StyleSheet, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Navbar() {
  const navigation = useNavigation();

  return (
    <View style={styles.navbarButtonContainer}>
      <View style={styles.customerButton}>
        <Button
          title="Customer"
          onPress={() => navigation.navigate("CustomerHomepage")}
        />
      </View>
      <View style={styles.providerButton}>
        <Button
          title="Provider"
          onPress={() => navigation.navigate("ProviderHomepage")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
    marginBottom: 0,
    marginLeft: 60,
    marginRight: 60,
    borderColor: "rgb(0, 0, 0)",
    borderWidth: 2,
  },
  customerButton: {
    flex: 1,
    borderColor: "rgb(0, 0, 0)",
    borderWidth: 2,
    paddingLeft: 10,
  },
  providerButton: {
    flex: 1,
    borderColor: "rgb(0, 0, 0)",
    borderWidth: 1,
    backgroundColor: "#FF7A00",
  },
});
