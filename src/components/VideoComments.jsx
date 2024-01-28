import { Box, Text } from "@gluestack-ui/themed";
import { useState } from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CommentsSheet from "./actionsheet/CommentsSheet";
import { useCommentsData } from "../context/CommentsContext";

export default function VideoCommentsWrapper() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setIsSheetOpen(true)}>
        <VideoComments />
      </TouchableOpacity>

      <CommentsSheet isSheetOpen={isSheetOpen} setIsSheetOpen={setIsSheetOpen} />
    </>
  );
}

function VideoComments() {
  const { comments, isLoading } = useCommentsData();
  if (comments?.length === 0 || isLoading) return;

  return (
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
  );
}
