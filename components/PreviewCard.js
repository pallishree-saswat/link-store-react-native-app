import React,{useContext} from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import { LinkContext } from "../context/link";
import { AuthContext } from "../context/auth";
import IconSet from "./IconSet";
const PreviewCard = ({
  ogTitle = "Untitled",
  ogDescription = "No description found...",
  ogImage = { url: "https://via.placeholder.com/500x500.png?text=Image" },
  handlePress = (f) => f,
  link = {},
  showIcons = false,
}) => {
  // context
  const [links, setLinks] = useContext(LinkContext);
  // const {auth, setAuth} = useContext(AuthContext);
  const { state, setState } = useContext(AuthContext);


  const handleLikePress = async (link) => {
    // console.log("link clicked", link._id);
    const { data } = await axios.put("/like", { linkId: link._id });
    setLinks((links) => {
      const index = links.findIndex((l) => l._id === link._id);
      // data.postedBy = auth.user;
      links[index] = data;
      return [...links];
    });
  };

  const handleUnLikePress = async (link) => {
    // console.log("link clicked", link._id);
    const { data } = await axios.put("/unlike", { linkId: link._id });
    setLinks((links) => {
      const index = links.findIndex((l) => l._id === link._id);
      // data.postedBy = auth.user;
      links[index] = data;
      return [...links];
    });
  };

  const ogImageUrl = (ogImage) => {
    if (ogImage?.url) {
      return ogImage.url;
    } else if (ogImage?.length > 0) {
      return ogImage[0].url;
    } else {
      return "https://via.placeholder.com/500x500.png?text=Image";
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        width: "92%",
        height: 280,
        borderRadius: 14,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom: 20,
      }}
    >
       <Image
        style={{
          height: "70%",
          width: "100%",
          borderTopRightRadius: 14,
          borderTopLeftRadius: 14,
        }}
        source={{ uri: ogImageUrl(ogImage) }}
      />
     <View style={showIcons ? { marginBottom: -40} : {}}>
        <IconSet
          handleLikePress={handleLikePress}
          handleUnLikePress={handleUnLikePress}
          link={link}
          showIcons={showIcons}
          auth={state}
        />
      </View>

      <TouchableOpacity onPress={() => handlePress(link)}>
        <View style={{ padding: 5, height: 50 }}>
          <Text style={{ paddingTop: 4, paddingBottom: 3, fontSize: 14 }}>
            {ogTitle}
          </Text>
          <Text style={{ fontSize: 12 }}>{ogDescription}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PreviewCard;
