import api from "../api";
import { useState, useEffect } from "react";

export const useCommentsForOneStreetArt = (streetArtId: string) => {
  const [comments, setComments] = useState(Array);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const allComments = await api.getAllCommentsForOneStreetArt(streetArtId);
    setComments(allComments.data.comments);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { comments, isLoading, setComments };
};
