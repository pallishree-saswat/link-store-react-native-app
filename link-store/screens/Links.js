import React, { useContext } from "react";

import { Text, View, SafeAreaView } from "react-native";
import FooterTabs from "../components/FooterTabs";
import { AuthContext } from "../context/auth";

const Links = ({ navigation }) => {
  const { state, setState } = useContext(AuthContext);
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "space-between", marginTop: 10 }}
    >
      <Text>Welcome to Links</Text>
      <FooterTabs />
    </SafeAreaView>
  );
};
export default Links;
