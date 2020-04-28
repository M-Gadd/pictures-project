import api from "../api";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export interface UseVisitsForOneStreetArtReturn {
  visitsForOneStreetArt: any;
  isLoading: any;
  setVisitsForOneStreetArt: any;
  usersVisited: any;
  setUsersVisited: any;
}

export const useVisits = () => {
  const [visits, setVisits] = useState(Array);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    // const allVisits = await api.getAllVisits();
    // setVisits(allVisits.data.visits);
    // setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { visits, isLoading, setVisits };
};
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
