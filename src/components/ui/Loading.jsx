import { Center, Spinner } from "@gluestack-ui/themed";
import useBGColor from "../../hooks/useBGColor";

export default function Loading() {
  const { bgColor } = useBGColor();

  return (
    <Center bgColor={bgColor} flex={1}>
      <Spinner size={"large"} />
    </Center>
  );
}
