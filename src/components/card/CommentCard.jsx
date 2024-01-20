import { Box, Text } from "@gluestack-ui/themed";
import React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import IconBtn from "../Button/IconBtn";
import { useAuthData } from "../../context/AuthContext";

export default function CommentCard({ comment }) {
  const { isAuth } = useAuthData();
  console.log("Comment Card: ", isAuth);

  return (
    <>
      <Box p="$2" flex={1} gap={"$2"} flexDirection="row" alignItems="center" w="$full" justifyContent="space-between">
        <Box flexDirection="row" gap="$2">
          <TouchableOpacity>
            <Image width={24} height={24} source={{ uri: comment?.commenter?.picture }} borderRadius={9999} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Box gap="$1">
              <Box gap="$1" flexDirection="row">
                <Text size="xs" color="$secondary500">{`@${comment?.commenter?.user_handle} | `}</Text>
                {comment?.createdAt && (
                  <Text size="xs" color="$secondary500">
                    {formatDistanceToNow(comment?.createdAt, { addSuffix: true })}
                  </Text>
                )}
              </Box>
              {/* Content */}
              <Text size="sm">{comment?.content}</Text>
              {/* Actions */}
            </Box>
          </TouchableOpacity>
        </Box>
        <IconBtn rounded name={"dots-three-vertical"} iconType="Entypo" variant="link" />
      </Box>
    </>
  );
}

CommentCard.PropTypes = {
  comment: PropTypes.object,
};
