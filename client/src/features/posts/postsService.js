import axios from "axios";
const BASE_URL = `${process.env.REACT_APP_API_URL}`;

// Create a post
export const createPost = async (postData, userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${BASE_URL}/users/${userId}/posts`,
    postData,
    config
  );

  return response.data;
};

// Get post by post ID
export const getPost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${BASE_URL}/posts/${postId}`, config)

  return response.data;
};

// Delete post by post ID
export const deletePost = async(postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${BASE_URL}/posts/${postId}`, config)

  return response.data;
};

// Like a post by post ID
export const likePost = async(postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${BASE_URL}/posts/${postId}/like`, {}, config)

  return response.data;
};

// Unlike a post by post ID
export const unlikePost = async(postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${BASE_URL}/posts/${postId}/like`, config)

  return response.data;
};

// Search posts by query
export const searchPosts = async(query) => {
  const response = await axios.get(`${BASE_URL}/search`, {params: {query}})

  return response.data;
};

const postsService = {
  createPost,
  getPost,
  deletePost,
  likePost,
  unlikePost,
  searchPosts
};

export default postsService;

