import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function useFetchPlaylists() {
  const [playlists, setPlaylists] = useState([]);

  const fetchPlaylists = async (channelID) => {
    console.log({ channelID })
    if (channelID) {
      try {
        const { data } = await axiosInstance.get(`/channel/${channelID}/playlists`);
        console.log({ playlistDATA: data });
        setPlaylists(data?.playlists);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return { playlists, fetchPlaylists };
}
