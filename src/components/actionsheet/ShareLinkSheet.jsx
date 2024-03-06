import { Button, ButtonIcon, CopyIcon, Heading, Text } from "@gluestack-ui/themed";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
  Box,
} from "@gluestack-ui/themed";
import * as Clipboard from "expo-clipboard";

export default function ShareLinkSheet({ isShareSheetOpen, setIsShareSheetOpen, link }) {
  const handleClose = () => setIsShareSheetOpen(false);
  const handleCopyLink = async () => await Clipboard.setStringAsync(link);

  return (
    <Box>
      <Actionsheet isOpen={isShareSheetOpen} onClose={handleClose} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent h="$72" zIndex={999}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          <Box p={"$2"} gap={"$2"} flex={1} w={"$full"}>
            <Box>
              <Heading>Share</Heading>
              <Text size="xs" color={"$secondary200"}>
                {link?.replace("https://", "")}
              </Text>
            </Box>
            <Box gap={"$1"}>
              <ActionsheetItem onPress={handleCopyLink}>
                <Button variant="link" action="secondary" size="sm" rounded={"$full"}>
                  <ButtonIcon as={CopyIcon} />
                </Button>
                <ActionsheetItemText>Copy Link</ActionsheetItemText>
              </ActionsheetItem>
            </Box>
            {/* <Divider /> */}
          </Box>
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
}
