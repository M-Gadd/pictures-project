import api from "../api";
import { useState, useEffect } from "react";

export const useProfileStreetArt = () => {
  const [streetArt, setStreetArt] = useState(Array);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    if (api.getLocalStorageUser()) {
      const profileStreetArt = await api.getOneUserImages(api.getLocalStorageUser().id);
      setStreetArt(profileStreetArt.data.streetArts);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { streetArt, isLoading };
};
export const useAllStreetArt = () => {
  const [streetArts, setStreetArts] = useState(Array);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const allStreetArts = await api.getStreetArt();
    setStreetArts(allStreetArts.data.streetArts);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { streetArts, isLoading };
};
