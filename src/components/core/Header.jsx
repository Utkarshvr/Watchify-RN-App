import Logo from "../brand/Logo";
import {
  BellIcon,
  Box,
  Button,
  ButtonIcon,
  CloseIcon,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  SearchIcon,
} from "@gluestack-ui/themed";
import LoginBtn from "../Button/LoginBtn";
import LogoutBtn from "../Button/LogoutBtn";
import useBGColor from "../../hooks/useBGColor";
import IconBtn from "../Button/IconBtn";
import { useEffect, useState } from "react";
import { Text } from "@gluestack-ui/themed";
import { router, useGlobalSearchParams, useNavigation } from "expo-router";

const SearchHeader = ({ close, prevText }) => {
  const { bgColor } = useBGColor();
  const navigation = useNavigation();
  const currentScreen = navigation.getId();

  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    router.push(`${currentScreen}/${searchText}`);
    close();
  };

  useEffect(() => {
    if (prevText) setSearchText(prevText);
  }, [prevText]);

  return (
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
  );
};

export default function Header({ navigation, layout, options, route }) {
  const { bgColor } = useBGColor();

  const canGoBack = navigation.canGoBack();

  const [isSearching, setIsSearching] = useState(false);

  const closeSearchHeader = () => setIsSearching(false);

  const currentScreen = navigation.getId();

  const { searchTextStudio, searchTextHome } = useGlobalSearchParams();

  const prevText =
    currentScreen?.endsWith("home") && searchTextHome
      ? searchTextHome
      : currentScreen?.endsWith("studio") && searchTextStudio
        ? searchTextStudio
        : null;

  // console.log({ currentScreen, searchTextStudio, searchTextHome });
  // console.log({ prevText });
  return (
    <Box
      gap={"$2"}
      flexDirection="row"
      paddingVertical="$2"
      paddingHorizontal={"$2"}
      justifyContent="space-between"
      alignItems="center"
      bgColor={bgColor}
    >
      {isSearching ? (
        <SearchHeader close={closeSearchHeader} prevText={prevText} />
      ) : (
        <>
          {canGoBack ? (
            <IconBtn
              noPadding
              iconSize={24}
              variant="link"
              size="md"
              onPress={() => navigation.goBack()}
              name={"chevron-back"}
            />
          ) : (
            <Logo />
          )}
          {/* {prevText && (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => setIsSearching(true)}>
              <Input flex={1} variant="outline" py={"$0.5"} isReadOnly size="sm">
                <InputField numberOfLines={1} placeholder="Search Watchify" value={prevText} />
              </Input>
            </TouchableOpacity>
          )} */}
          <Box flexDirection="row" gap="$4" alignItems="center">
            <Button rounded="$full" size="xl" variant="link" action="secondary">
              <ButtonIcon as={BellIcon} />
            </Button>
            <Button
              // onPress={() => router.push("/(tabs)/search")}
              // onPress={() => navigation.navigate("search")}
              onPress={() => setIsSearching(true)}
              rounded="$full"
              size="xl"
              variant="link"
              action="secondary"
            >
              <ButtonIcon as={SearchIcon} />
            </Button>

            <LoginBtn showText={false} />
            <LogoutBtn showText={false} />
          </Box>
        </>
      )}
    </Box>
  );
}
