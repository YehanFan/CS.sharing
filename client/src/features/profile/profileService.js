import axios from "axios";
const BASE_URL = `${process.env.REACT_APP_API_URL}`;

// Function to get profile information for a user
export const getProfile = async (username, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${BASE_URL}/users/${username}`, config);

  return response.data;
};

// Function to get followers for a user
export const getFollowers = async (userId) => {
  const response = await axios.get(`${BASE_URL}/users/${userId}/followers`);

  return response.data;
};

// Function to update user information
export const updateInfo = async (username, info, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(
    `${BASE_URL}/users/${username}`,
    { ...info },
    config
  );

  return response.data;
};

// Function to follow a user
export const followUser = async (followerId, followingId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${BASE_URL}/users/${followingId}/followers`,
    { followerId },
    config
  );

  return response.data;
};

// Function to unfollow a user
export const unfollowUser = async (followerId, followingId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${BASE_URL}/users/${followingId}/followers/${followerId}`,
    config
  );

  return response.data;
};

const profileService = {
  getProfile,
  getFollowers,
  followUser,
  unfollowUser,
};

export default profileService;