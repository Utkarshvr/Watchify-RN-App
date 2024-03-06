import { useAuthData } from "../../context/AuthContext";
import { Center, Spinner } from "@gluestack-ui/themed";

export default function LoadingOverlay() {
  const { isLoading } = useAuthData();
  if (isLoading)
    return (
      <Center
        position="absolute"
        top={0}
        left={0}
        zIndex={999999999999999}
        height={"$full"}
        width={"$full"}
        flex={1}
        style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
        p={"$3"}
        gap={"$5"}
      >
        <Spinner size={"large"} />
      </Center>
    );
  else return;
}
