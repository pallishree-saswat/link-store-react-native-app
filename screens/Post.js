import React, { useContext, useState } from "react";
import axios from "axios";
import { Text, SafeAreaView, ScrollView, TextInput, View } from "react-native";
import FooterTabs from "../components/FooterTabs";
import { AuthContext } from "../context/auth";
import SubmitButton from "../components/SubmitButton";

const Post = ({ navigation }) => {
  const { state, setState } = useContext(AuthContext);
  // context
  // const {links, setLinks} = useContext(LinkContext);
  // state
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [urlPreview, setUrlPreview] = useState({});

  const handleChange = async (text) => {
    // try {
    //   setLoading(true);
    //   setLink(text);
    //   if (urlRegex({ strict: false }).test(text)) {
    //     ogs({ url: text }, (error, results, response) => {
    //       // console.log(results);
    //       if (results.success) {
    //         setUrlPreview(results);
    //       }
    //       setLoading(false);
    //     });
    //   } else {
    //     setLoading(false);
    //   }
    // } catch (err) {
    //   console.log(err);
    //   setLoading(false);
    // }
  };

  const handleSubmit = async () => {
    // console.log("title and link => ", title, link, urlPreview);
    if (!link || !title) {
      alert("Paste url and give it a nice title 😎");
      return;
    }
    // try {
    //   const { data } = await axios.post("/post-link", {
    //     link,
    //     title,
    //     urlPreview,
    //   });
    //   console.log("data => ", data);
    //   // update link context
    //   setLinks([data, ...links]);
    //   setTimeout(() => {
    //     alert("🎊 Link posted");
    //     navigation.navigate("Home");
    //   }, 500);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "space-between", marginTop: 10 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            paddingTop: 30,
            fontSize: 18,
            color: "#333",
            textAlign: "center",
          }}
        >
          {" "}
          PASTE WEBSITE URL
        </Text>
        <TextInput
          value={link}
          onChangeText={(text) => handleChange(text)}
          placeholder="Paste the url"
          autoCapitalize="none"
          autoCorrect={false}
          style={{
            borderWidth: 1,
            borderColor: "grey",
            height: 50,
            marginVertical: 30,
            marginHorizontal: 15,
            borderRadius: 30,
            padding: 15,
          }}
        />

        <TextInput
          value={title}
          onChangeText={(text) => setTitle(text)}
          placeholder="Give it a title"
          autoCapitalize="sentences"
          style={{
            borderWidth: 1,
            borderColor: "grey",
            height: 50,
            marginVertical: 10,
            marginHorizontal: 15,
            borderRadius: 30,
            padding: 15,
          }}
        />

        <View style={{ paddingTop: 25 }}>
          <SubmitButton
            title="Submit"
            loading={loading}
            handleSubmit={handleSubmit}
          />
        </View>
        {/* <Text>{JSON.stringify(urlPreview, null, 4)}</Text> */}
      </ScrollView>

      <FooterTabs />
    </SafeAreaView>
  );
};
export default Post;
