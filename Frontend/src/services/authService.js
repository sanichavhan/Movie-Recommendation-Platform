import * as authApi from "../api/authApi";

const register = async (userData) => {
  try {
    const res = await authApi.registerUser(userData);
    return res.data;
  } catch (error) {
    throw error.response?.data || "Registration failed";
  }
};

const login = async (userData) => {
  try {
    const res = await authApi.loginUser(userData);
    return res.data;
  } catch (error) {
    throw error.response?.data || "Login failed";
  }
};
const logout = async () => {
  try {
    const res = await authApi.logoutUser();
    return res.data;
  } catch (error) {
    throw error.response?.data || "Logout failed";
  }
};

const getCurrentUser = async () => {
  const res = await authApi.getCurrentUser();
  return res.data;
};

const authService = {
    login,
    register,
    logout,
    getCurrentUser
}

export default authService