import * as authApi from "../api/authApi";

const register = (userData) => authApi.registerUser(userData);

const login = (userData) => authApi.loginUser(userData);

const logout = () => authApi.logoutUser();

const getMe = () => authApi.getCurrentUser();

const authService = {
  login,
  register,
  logout,
  getMe
};

export default authService;