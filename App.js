import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Signup from "./screens/Signup";
import Signin from "./screens/Signin";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Signin"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Signin" component={Signin} />
      </Stack.Navigator>
    </NavigationContainer>
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
