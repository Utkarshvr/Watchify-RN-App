import * as ImagePicker from "expo-image-picker";
import { Button, ButtonText } from "@gluestack-ui/themed";
import { useState } from "react";
import { Image } from "react-native";
import axiosInstance from "../../utils/axiosInstance";
import { Box } from "@gluestack-ui/themed";

export default function rough() {
  const [imgUri, setImgUri] = useState(null);
  console.log({ imgUri });

  const uploadImgToServer = async () => {
    const formData = new FormData();
    formData.append("img", {
      uri: imgUri,
      name: imgUri?.split("/")[imgUri?.split("/")?.length - 1],
      // type: "image",
      type: `image/${imgUri.split(".").pop()}`,
    });
    console.log(formData);

    const { data } = await axiosInstance.post("/upload-img", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // const response = await fetch("https://watchifyserver.serveo.net/api/upload-img", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   body: formData,
    // });

    // const data = await response.json(); // Assuming the server returns JSON

    console.log("::uploadImgToServer:: DATA:", data);
  };

  const selectImgFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const img = result.assets[0];
      setImgUri(img?.uri);
    }
  };

  return (
    <Box flex={1} bgColor="$secondary950" p="$4">
      {!imgUri ? (
        <Button onPress={selectImgFromGallery}>
          <ButtonText>Select an Image</ButtonText>
        </Button>
      ) : (
        <Box gap="$4">
          <Image
            source={{ uri: imgUri }}
            style={{ width: "100%", height: 200, borderRadius: 8, borderWidth: 2, borderColor: "#333" }}
          />
          <Button onPress={selectImgFromGallery}>
            <ButtonText>Change Image</ButtonText>
          </Button>

          <Button onPress={uploadImgToServer}>
            <ButtonText>Upload to server</ButtonText>
          </Button>
        </Box>
      )}
    </Box>
  );
}
