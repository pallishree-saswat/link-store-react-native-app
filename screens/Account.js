import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import FooterTabs from "../components/FooterTabs";
import { AuthContext } from "../context/auth";
import UserInput from "../components/UserInput";
import SubmitButton from "../components/SubmitButton";
import CircleLogo from "../components/CircleLogo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
const Account = ({ navigation }) => {
  const { state, setState } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // image
  const [uploadImage, setUploadImage] = useState("");
  const [image, setImage] = useState({ url: "", public_id: "" });

  useEffect(() => {
    if (state) {
      const { name, email, role, image } = state.user;
      setName(name);
      setEmail(email);
      setRole(role);
      setImage(image);
    }
  }, [state]);

  const handleSubmit = async () => {
    setLoading(true);
    if (!password) {
      alert("Password is required");
      setLoading(false);
      return;
    }
    // api request
    try {
      // console.log("im here")
      const { data } = await axios.post("/update-password", { password });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        alert("👍 Password updated");
        setPassword("");
        setLoading(false);
      }
    } catch (err) {
      alert("Password update failed. Try again.");
      console.log(err);
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    // console.log(permissionResult);
    // return;
    if (permissionResult.granted === false) {
      alert("Camera access is required");
      return;
    }
    // get image from image
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    // console.log("PICKER RESULT => ", pickerResult);
    if (pickerResult.cancelled === true) {
      return;
    }
    // save to state for preview
    let base64Image = `data:image/jpg;base64,${pickerResult.base64}`;
    setUploadImage(base64Image);
    // send to backend for uploading to cloudinary
    // console.log("here only");
    const { data } = await axios.post(`/upload-image`, {
      image: base64Image,
    });
    // console.log("UPLOADED RESPONSE => ", data);
    // update async storage
    const as = JSON.parse(await AsyncStorage.getItem("@auth")); // {user: {}, token: ''}
    as.user = data;
    await AsyncStorage.setItem("@auth", JSON.stringify(as));
    // update context
    setState({ ...state, user: data });
    setImage(data.image);
    alert("👍 Profile image saved");
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "space-between",
        marginTop: 10,
      }}
    >
      <View style={{ marginVertical: 100 }}>
        <CircleLogo>
          {image && image.url ? (
            <Image
              source={{ uri: image.url }}
              style={{
                width: 190,
                height: 190,
                borderRadius: 100,
                marginVertical: 20,
              }}
            />
          ) : uploadImage ? (
            <Image
              source={{ uri: uploadImage }}
              style={{
                width: 190,
                height: 190,
                borderRadius: 100,
                marginVertical: 20,
              }}
            />
          ) : (
            <TouchableOpacity onPress={() => handleUpload()}>
              <FontAwesome5 name="camera" size={25} color="orange" />
            </TouchableOpacity>
          )}
        </CircleLogo>

        {image && image.url ? (
          <TouchableOpacity onPress={() => handleUpload()}>
            <FontAwesome5
              name="camera"
              size={25}
              color="orange"
              style={{ marginTop: -5, marginBottom: 10, alignSelf: "center" }}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <Text
          style={{
            fontSize: 24,
            color: "#333",
            textAlign: "center",
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            paddingBottom: 10,
            fontSize: 18,
            color: "#333",
            textAlign: "center",
          }}
        >
          {email}
        </Text>
        <Text
          light
          style={{
            paddingBottom: 50,
            fontSize: 12,
            color: "#333",
            textAlign: "center",
          }}
        >
          {role}
        </Text>

        <UserInput
          name="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          autoComplteType="password"
        />

        <SubmitButton
          title="Update Password"
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </View>
      <View>
        <FooterTabs />
      </View>
    </ScrollView>
  );
};
export default Account;
