import axios from 'axios';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  registerStart,
  registerSuccess,
  registerFailure,
} from './userSlice';

// Thunk for logging in
export const login = (userData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', userData, { withCredentials: true });
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure(error.response?.data || 'An error occurred'));
  }
};

// Thunk for registering a user
export const register = (userData) => async (dispatch) => {
  dispatch(registerStart());
  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', userData, { withCredentials: true });
    dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(registerFailure(error.response?.data || 'An error occurred'));
  }
};

// Thunk for logging out
export const logout = () => async (dispatch) => {
  try {
    await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
    dispatch(logoutSuccess());
  } catch (error) {
    console.error('Logout error:', error.response?.data || 'An error occurred');
  }
};
