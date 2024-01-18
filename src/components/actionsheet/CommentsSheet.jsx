import { FlatList, Heading, ScrollView } from "@gluestack-ui/themed";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  Box,
} from "@gluestack-ui/themed";
import { Dimensions } from "react-native";

import PropTypes from "prop-types";
import CommentCard from "../card/CommentCard";

export default function CommentsSheet({ comments, setIsSheetOpen, isSheetOpen }) {
  const handleClose = () => {
    setIsSheetOpen(false);
  };

  const windowHeight = Dimensions.get("window").height;

  console.log({ comments });

  return (
    <Actionsheet flex={1} isOpen={isSheetOpen} onClose={handleClose} zIndex={999}>
      <ActionsheetBackdrop />
      <ActionsheetContent w={"$full"} h={windowHeight > 840 ? 840 : windowHeight} zIndex={999}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        <Box p={"$2"} gap={"$2"} flex={1} w={"$full"}>
          <Heading>Comments</Heading>
          <FlatList
            data={comments}
            flex={1}
            w="$full"
            keyExtractor={(comment) => comment?._id}
            renderItem={({ item }) => <CommentCard comment={item} />}
          />
        </Box>
      </ActionsheetContent>
    </Actionsheet>
  );
}

CommentsSheet.propTypes = {
  comments: PropTypes.array.isRequired,
  isSheetOpen: PropTypes.bool.isRequired,
  setIsSheetOpen: PropTypes.func.isRequired,
};
