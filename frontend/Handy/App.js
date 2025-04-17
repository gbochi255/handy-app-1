import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SignIn from "./components/SignIn.js";
import SignUp from "./components/SignUp.js";
import CustomerHomepage from "./components/CustomerHomepage.js";
import CameraApp from "./components/CameraApp.js";
import { UserProvider } from "./components/UserContext";
import ProviderHomepage from "./components/ProviderHomepage.js";
import JobItem from "./components/JobItem.js";
import JobPage from "./components/JobPage.js";
import BidItem from "./components/BidItem.js";
import BidPage from "./components/BidPage.js";
import PostJob from "./components/PostJob.js";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="CameraApp" component={CameraApp} />
          <Stack.Screen name="CustomerHomepage" component={CustomerHomepage} />
          <Stack.Screen name="ProviderHomepage" component={ProviderHomepage} />
          <Stack.Screen name="JobItem" component={JobItem} />
          <Stack.Screen name="JobPage" component={JobPage} />
          <Stack.Screen name="BidItem" component={BidItem} />
          <Stack.Screen name="BidPage" component={BidPage} />
          <Stack.Screen name="PostJob" component={PostJob} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
