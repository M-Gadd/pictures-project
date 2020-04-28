import api from "../api";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useUsers = () => {
  const [users, setUsers] = useState(Array);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const allUsers = await api.getAllUsers();
    setUsers(allUsers.data.users);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { users, isLoading };
};

export const useUser = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  const fetchData = async () => {
    const { id } = (await location.state) as any;
    const oneUser = await api.getUser(id);
    setUser(oneUser.data.user);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { user, isLoading };
};
