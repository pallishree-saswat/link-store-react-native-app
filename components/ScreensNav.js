import React, { useContext } from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import Signup from "../screens/Signup";
import Signin from "../screens/Signin";
import Home from "../screens/Home";
import Account from "../screens/Account";
import Post from "../screens/Post";
import Links from "../screens/Links";
import LinkView from "../screens/LinkView";
import ForgotPassword from "../screens/ForgotPassword";
import { AuthContext } from "../context/auth";
import HeaderTabs from "./HeaderTabs";
import Profile from "../screens/Profile";
import TrendingLinks from "../screens/TrendingLinks";

const Stack = createNativeStackNavigator();

export default function ScreensNav() {
  const { state, setState } = useContext(AuthContext);

  const authenticated = state && state.token !== "" && state.user !== null;

  return (
    <Stack.Navigator
      initialRouteName="Home"
      // screenOptions={{ headerShown: false }}
    >
      {authenticated ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Links Daily",
              headerRight: () => <HeaderTabs />,
            }}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderTabs />,
            }}
          />
          <Stack.Screen
            name="LinkView"
            component={LinkView}
            options={{
              title: "",
            }}
          />
          <Stack.Screen
            name="Links"
            component={Links}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderTabs />,
            }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              // headerShown: false,
              headerBackTitle: "Back",
              headerRight: () => <HeaderTabs />,
            }}
          />
            <Stack.Screen
            name="Profile"
            component={Profile}
            options={({ route }) => ({
              title: route.params?.name || "",
              // headerShown: false,
              headerTransparent: true,
              headerBackTitle: "",
            })}
          />
          <Stack.Screen
            name="TrendingLinks"
            component={TrendingLinks}
            options={{
              title: "",
              headerTransparent: true,
              headerBackTitle: "",
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
