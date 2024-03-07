import { Center, Spinner } from "@gluestack-ui/themed";

export default function Loading() {
  return (
    <Center flex={1}>
      <Spinner size={"large"} />
    </Center>
  );
}
