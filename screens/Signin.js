import React, { useState } from "react";
import { Text, View, StatusBar, ScrollView } from "react-native";
import UserInput from "../components/UserInput";
import SubmitButton from "../components/SubmitButton";
import axios from "axios";
import CircleLogo from "../components/CircleLogo";

const Signin = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const { data } = axios.post("http://localhost:8000/api/signin", {
        email,
        password,
      });
      setLoading(false);
      console.log("Sign in success", data);
      alert("Signin Successful!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1, justifyContent: "center" }}>
      <StatusBar />
      <View style={{ marginVertical: 100 }}>
        <CircleLogo />
        <Text
          style={{
            fontSize: 24,
            color: "#333",
            textAlign: "center",
          }}
        >
          Sign In
        </Text>

        <UserInput
          name="Email"
          value={email}
          setValue={setEmail}
          autoCompleteType="email"
          keyboardType="email-address"
        />

        <UserInput
          name="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          autoComplteType="password"
        />

        <SubmitButton
          title="Submit"
          handleSubmit={handleSubmit}
          loading={loading}
        />

        <Text style={{ fontSize: 15, textAlign: "center" }}>
          Dont have an account ?
          <Text
            onPress={() => navigation.navigate("Signup")}
            style={{ color: "#ff2222" }}
          >
            Sign Up{" "}
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default Signin;
