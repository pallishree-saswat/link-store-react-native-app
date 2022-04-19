
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Signup from "./screens/Signup";
import Signin from "./screens/Signin";
import { AuthProvider } from "./context/auth";
import Home from "./screens/Home";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator
          initialRouteName="Signin"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}


