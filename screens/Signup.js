import React, { useState } from "react";
import { Text, View, StatusBar, ScrollView } from "react-native";
import UserInput from "../components/UserInput";
import SubmitButton from "../components/SubmitButton";
import axios from "axios";
import CircleLogo from "../components/CircleLogo";

const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (!name || !email || !phoneNumber || !password) {
      alert("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const { data } = axios.post(
        "http://localhost:8000/api/signup",
        {
          name,
          email,
          password,
          phoneNumber,
        }
      );
      setLoading(false);
      console.log("Sign up success", data);
      alert("Signup Successful!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View style={{ marginVertical: 100, flex: 1, justifyContent: "center" }}>
        <CircleLogo />
        <Text
          style={{
            fontSize: 24,
            color: "#333",
            textAlign: "center",
          }}
        >
          Sign up
        </Text>
        <UserInput
          name="Name"
          value={name}
          setValue={setName}
          autoCapitalize="words"
          autoCorrect={false}
        />
        <UserInput
          name="Email"
          value={email}
          setValue={setEmail}
          autoCompleteType="email"
          keyboardType="email-address"
        />
        <UserInput
          name="Phone Number"
          value={phoneNumber}
          setValue={setPhoneNumber}
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
          Already Joined ?
          <Text
            onPress={() => navigation.navigate("Signin")}
            style={{ color: "#ff2222" }}
          >
            Sign In{" "}
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default Signup;
