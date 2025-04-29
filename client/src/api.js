import axios from "axios";
import { logout } from "./shared/utils/auth";

const apiClient = axios.create({
  baseURL: "https://chat-jlge.onrender.com/api", // Default to local if no environment variable
  timeout: 1000,
});
// const apiClient = axios.create({
//   baseURL: "https://chatx-rqq5.onrender.com/api", // Default to local if no environment variable
//   timeout: 1000,
// });
apiClient.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem("user");

    if (userDetails) {
      const token = JSON.parse(userDetails).token;
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// Configure Axios client
const apiClient1 = axios.create({
  baseURL: "https://chat-jlge.onrender.com/api", // Ensure this is correct
  timeout: 5000, // Increased timeout to allow more time for requests
});

// Public routes

export const login = async (data) => {
  try {
    // Make the POST request to the login endpoint
    const response = await apiClient1.post("/auth/login", data);
    
    // Handle the response (if needed, log or process it)
    console.log('Login Response:', response.data);

    return response.data.userDetails; // Return the data from the response
  } catch (exception) {
    // Log and handle specific errors
    console.error('Login failed:', exception);
    
    // If exception is a known error type (e.g., network issue or server error)
    if (exception.response) {
      // Server returned a response (e.g., 4xx, 5xx error)
      return {
        error: true,
        message: exception.response.data || 'Server Error',
        status: exception.response.status,
      };
    } else if (exception.request) {
      // No response received from server
      return {
        error: true,
        message: 'No response from the server. Please check your connection.',
      };
    } else {
      // Other errors (e.g., request setup issues)
      return {
        error: true,
        message: exception.message || 'An unexpected error occurred.',
      };
    }
  }
};

export const register = async (data) => {
  try {
    return await apiClient.post("/auth/register", data);
  } catch (exception) {
    if (exception.response?.status === 409) {
      return {
        error: true,
        message: "The email or username is already in use. Please try a different one.",
      };
    }
    return {
      error: true,
      exception,
    };
  }
};

// secure routes
export const sendFriendInvitation = async (data) => {
  try {
    return await apiClient.post("/friend-invitation/invite", data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const acceptFriendInvitation = async (data) => {
  try {
    return await apiClient.post("/friend-invitation/accept", data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const rejectFriendInvitation = async (data) => {
  try {
    return await apiClient.post("/friend-invitation/reject", data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

const checkResponseCode = (exception) => {
  const responseCode = exception?.response?.status;

  if (responseCode) {
    (responseCode === 401 || responseCode === 403) && logout();
  }
};