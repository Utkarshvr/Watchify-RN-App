import { Heading, ScrollView } from "@gluestack-ui/themed";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  Box,
} from "@gluestack-ui/themed";
import { Dimensions } from "react-native";
import { renderDescription } from "../../utils/UIhelpers";

import PropTypes from "prop-types";

export default function VideoDescSheet({ desc, setIsDescSheetOpen, isDescSheetOpen }) {
  const handleClose = () => {
    setIsDescSheetOpen(false);
  };

  const windowHeight = Dimensions.get("window").height;
  console.log({ windowHeight });
  return (
    <Actionsheet isOpen={isDescSheetOpen} onClose={handleClose} zIndex={999}>
      <ActionsheetBackdrop />
      <ActionsheetContent h={windowHeight > 840 ? 840 : windowHeight} zIndex={999}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        <Box p={"$2"} gap={"$2"}>
          <Heading>Description</Heading>
          <ScrollView>{desc ? renderDescription(desc) : null}</ScrollView>
        </Box>
      </ActionsheetContent>
    </Actionsheet>
  );
}

VideoDescSheet.propTypes = {
  desc: PropTypes.string,
  isDescSheetOpen: PropTypes.bool,
  setIsDescSheetOpen: PropTypes.func,
};
