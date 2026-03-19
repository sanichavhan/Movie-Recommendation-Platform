import { useState } from "react";
import * as authService from "../../services/authService";

export const useAuth = () => {

  const [user, setUser] = useState(null);

  const login = async (data) => {
    const res = await authService.login(data);
    setUser(res.user);
  };

  const register = async (data) => {
    const res = await authService.register(data);
    setUser(res.user);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return { user, login, register, logout };
};