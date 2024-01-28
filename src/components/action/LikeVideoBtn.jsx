import IconBtn from "../Button/IconBtn";
import useLikeVideo from "../../hooks/LikeVideo";

export default function LikeVideoBtn() {
  const { isLiked, likeVideo, likesCount } = useLikeVideo();

  return (
    <>
      <IconBtn onPress={likeVideo} name={!isLiked ? "thumbs-up-outline" : "thumbs-up"} BtnText={likesCount || null} />
    </>
  );
}
