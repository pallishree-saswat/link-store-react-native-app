import React, { useContext} from "react";

import { Text, View } from "react-native";
import { AuthContext } from "../context/auth";

const Home = ({ navigation }) => {
    const {state, setState} = useContext(AuthContext);
  return (
    <View>
      <Text>Welcome to Home</Text>
    </View>
  );
};
export default Home;
