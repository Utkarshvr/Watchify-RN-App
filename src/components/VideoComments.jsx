import { Box, Text } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CommentsSheet from "./actionsheet/CommentsSheet";
import { useAuthData } from "../context/AuthContext";

export default function VideoComments({ videoUUID }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { isAuth } = useAuthData();
  console.log("VIDEO COMMENTS", { isAuth });

  const loadComments = async () => {
    if (isLoading || !videoUUID) return;

    setIsLoading(true);
    try {
      const url = `/video/${videoUUID}/comments`;
      const { data } = await axiosInstance.get(url);

      setComments(data?.data?.comments);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [videoUUID]);

  return (
    <>
      <TouchableOpacity onPress={() => setIsSheetOpen(true)}>
        <Box p={"$3"} gap={"$2"} bgColor="$secondary800" borderRadius={"$3xl"}>
          <Text fontFamily="p6sb" size="xs">
            Comments {comments?.length ? `(${comments?.length})` : null}
          </Text>

          <Box flexDirection="row" gap="$1.5" alignItems="center">
            <Image source={{ uri: comments[0]?.commenter?.picture }} width={24} height={24} borderRadius={999} />

            <Text size="xs" numberOfLines={1}>
              {comments[0]?.content}
            </Text>
          </Box>
        </Box>
      </TouchableOpacity>

      <CommentsSheet
        videoUUID={videoUUID}
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
        comments={comments}
        loadComments={loadComments}
      />
    </>
  );
}
