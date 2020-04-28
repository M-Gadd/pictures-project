import api from "../api";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export interface UseLikesForOneStreetArtReturn {
  likesForOneStreetArt: any;
  isLoading: any;
  setLikesForOneStreetArt: any;
  usersLiked: any;
  setUsersLiked: any;
}

export const useLikesForOneStreetArt = (
  streetArtId: string,
): UseLikesForOneStreetArtReturn => {
  const [likesForOneStreetArt, setLikesForOneStreetArt] = useState(Array);
  const [usersLiked, setUsersLiked] = useState(Array);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const allLikes = await api.getAllLikesForOneStreetArt(streetArtId);
    setLikesForOneStreetArt(allLikes.data.likes);
    setUsersLiked(allLikes.data.users);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return {
    likesForOneStreetArt,
    isLoading,
    setLikesForOneStreetArt,
    usersLiked,
    setUsersLiked,
  };
};
