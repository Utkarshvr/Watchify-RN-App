import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetIcon,
  ActionsheetItem,
  ActionsheetItemText,
  Box,
} from "@gluestack-ui/themed";

import { SocialIcon } from "../../utils/UIhelpers";
import { Linking } from "react-native";

export default function LinkSheet({ links = [], isLinkSheetOpen, setIsLinkSheetOpen }) {
  const handleClose = () => {
    setIsLinkSheetOpen(false);
  };

  console.log({ isLinkSheetOpen });
  return (
    <Box>
      <Actionsheet isOpen={isLinkSheetOpen} onClose={handleClose} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent h="$64" zIndex={999}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          {links?.map((link) => (
            <ActionsheetItem
              key={link?.url}
              onPress={() => {
                Linking.openURL(link?.url);
                handleClose();
              }}
            >
              <SocialIcon url={link?.url} />

              <ActionsheetItemText>{link?.platform}</ActionsheetItemText>
            </ActionsheetItem>
          ))}
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
}
