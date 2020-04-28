import { useState, useEffect } from "react";
import api from "../api";

// useSearchStreetArtProps {

// }

export const useSearchStreetArt = (data: any) => {
  const [searchStreetArt, setSearchStreetArt] = useState(Array);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const searchedStreetArts = await api.getSearchStreetArt(data);
    console.log("Search: ", searchedStreetArts.data);
    setSearchStreetArt(searchedStreetArts.data.streetArts);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { searchStreetArt, isLoading };
};
