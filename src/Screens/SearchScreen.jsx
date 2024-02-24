import { Box, CloseIcon, Input, InputField, InputIcon, InputSlot, SearchIcon } from "@gluestack-ui/themed";
import useBGColor from "../hooks/useBGColor";
import IconBtn from "../components/Button/IconBtn";
import { useState } from "react";
import { router, useNavigation } from "expo-router";

export default function SearchScreen() {
  const { bgColor } = useBGColor();
  const navigation = useNavigation();

  const close = () => navigation.goBack();

  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    console.log("Seraching: ", searchText);
    // navigation.navigate(searchText);
    router.push(`/(tabs)/home/${searchText}`);
  };

  return (
    <Box bgColor={bgColor} flex={1}>
      <Box
        gap={"$2"}
        flexDirection="row"
        paddingVertical="$2"
        paddingHorizontal={"$2"}
        justifyContent="space-between"
        alignItems="flex-start"
        bgColor={bgColor}
      >
        <IconBtn noPadding iconSize={24} variant="link" size="md" onPress={close} name={"arrow-back"} />

        <Input flex={1} variant="outline" size="sm">
          <InputField
            autoFocus
            numberOfLines={1}
            placeholder="Search Watchify"
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
          {searchText.length > 0 && (
            <InputSlot pr="$3" onPress={() => setSearchText("")}>
              <InputIcon as={CloseIcon} size="md" />
            </InputSlot>
          )}
        </Input>

        {searchText.length === 0 && (
          <Box flexDirection="row" gap="$4" alignItems="center">
            <IconBtn noPadding iconSize={24} variant="link" size="md" name={"mic"} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
