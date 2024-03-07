import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function useFetchPlaylists() {
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const reset = () => {
    setIsLoading(false);
  };

  const fetchPlaylists = async (channelID) => {
    console.log({ channelID });
    if (channelID) {
      setIsLoading(true);
      try {
        const { data } = await axiosInstance.get(`/channel/${channelID}/playlists`);
        console.log({ playlistDATA: data });
        setPlaylists(data?.playlists);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return { playlists, isLoading, fetchPlaylists, reset };
}
