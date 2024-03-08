import * as ImagePicker from "expo-image-picker";
import * as VideoThumbnails from "expo-video-thumbnails";

import { router } from "expo-router";
import { useUploadVideoAPI } from "../context/UploadVideoContext";

export default function useUploadVideo() {
  const { setVideo, setThumbnail } = useUploadVideoAPI();

  const generateThumbnail = async (videoUri, time) => {
    try {
      const thumbnail = await VideoThumbnails.getThumbnailAsync(videoUri, {
        time,
      });
      console.log({ SELECTED_THUMBANIL_RESULTS: thumbnail });
      return thumbnail;
    } catch (e) {
      console.warn(e);
    }
  };

  const uploadVideo = async ({ pushToScreen = false }) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log({ SELECTED_VIDEO_RESULTS: result });

    if (!result.canceled) {
      const vid = result.assets[0];
      const thumbnail = await generateThumbnail(vid?.uri, 2000); // Capture frame at 5000 milliseconds
      setThumbnail(thumbnail);

      setVideo(vid);
      if (pushToScreen) router.push("/upload-video");
    }
  };

  const uploadThumbnail = async ({ pushToScreen = false }) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const img = result.assets[0];
      setThumbnail(img);
      if (pushToScreen) router.push("/upload-video");
    }
  };

  return { uploadVideo, uploadThumbnail };
}
