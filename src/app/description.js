import { Box } from "@gluestack-ui/themed";
import React from "react";
import useBGColor from "../hooks/useBGColor";
import { Heading } from "@gluestack-ui/themed";
import { ScrollView } from "react-native-gesture-handler";
import { renderDescription } from "../utils/UIhelpers";
import { useLocalSearchParams } from "expo-router";

export default function description() {
  const { bgColor } = useBGColor();
  const { desc } = useLocalSearchParams();

  return (
    <Box flex={1} p="$2" bgColor={bgColor}>
      <Box gap={"$2"}>
        <Heading>Description</Heading>
        <ScrollView>{desc ? renderDescription(desc) : null}</ScrollView>
      </Box>
    </Box>
  );
}
