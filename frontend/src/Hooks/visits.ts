import api from "../api";
import { useState, useEffect } from "react";

export interface UseVisitsForOneStreetArtReturn {
  visitsForOneStreetArt: any;
  isLoading: any;
  setVisitsForOneStreetArt: any;
  usersVisited: any;
  setUsersVisited: any;
}

export const useVisitsForOneStreetArt = (
  streetArtId: string,
): UseVisitsForOneStreetArtReturn => {
  const [visitsForOneStreetArt, setVisitsForOneStreetArt] = useState(Array);
  const [usersVisited, setUsersVisited] = useState(Array);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const allVisits = await api.getAllVisitsForOneStreetArt(streetArtId);
    setVisitsForOneStreetArt(allVisits.data.visits);
    setUsersVisited(allVisits.data.users);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return {
    visitsForOneStreetArt,
    isLoading,
    setVisitsForOneStreetArt,
    usersVisited,
    setUsersVisited,
  };
};
