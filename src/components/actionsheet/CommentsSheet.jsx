import { FlatList, Heading } from "@gluestack-ui/themed";
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
import CommentModal from "../modal/CommentModal";
import { useAuthData } from "../../context/AuthContext";

const windowHeight = Dimensions.get("window").height;

export default function CommentsSheet({ loadComments, comments, setIsSheetOpen, isSheetOpen, videoUUID }) {
  const handleClose = () => {
    setIsSheetOpen(false);
  };
  const { isAuth, user } = useAuthData();
  console.log("Sheet", { isAuth });

  return (
    <Actionsheet
      isKeyboardDismissable={true}
      // style={{ position: "absolute", bottom: -40, left: 0 }}
      snapPoints={[95]}
      flex={1}
      isOpen={isSheetOpen}
      onClose={handleClose}
      zIndex={999}
    >
      <ActionsheetBackdrop />
      <ActionsheetContent w={"$full"} h={windowHeight > 840 ? 840 : windowHeight} zIndex={999}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        {/* <KeyboardAvoidingView enabled={false} > */}
        <Box p={"$2"} gap={"$2"} flex={1} w={"$full"}>
          <Heading>Comments</Heading>
          <FlatList
            data={comments}
            flex={1}
            w="$full"
            keyExtractor={(comment) => comment?._id}
            renderItem={({ item }) => <CommentCard comment={item} />}
          />

          <CommentModal loadComments={loadComments} isAuth={isAuth} user={user} videoUUID={videoUUID} />
        </Box>
        {/* </KeyboardAvoidingView> */}
      </ActionsheetContent>
    </Actionsheet>
  );
}

CommentsSheet.propTypes = {
  comments: PropTypes.array.isRequired,
  isSheetOpen: PropTypes.bool.isRequired,
  setIsSheetOpen: PropTypes.func.isRequired,
};
