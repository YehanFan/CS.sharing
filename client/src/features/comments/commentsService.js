import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_API_URL}`;

// Function to add a comment on a post
export const commentOnPost = async (postId, comment, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${BASE_URL}/posts/${postId}/comments`,
    comment,
    config
  );

  return response.data;
};

// Function to get comments for a post
export const getComments = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${BASE_URL}/posts/${postId}/comments`, config);

  return response.data;
};

// Function to like a comment
export const likeComment = async (commentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${BASE_URL}/comments/${commentId}/like`,
    {},
    config
  );

  return response.data;
};

// Function to unlike a comment
export const unlikeComment = async (commentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${BASE_URL}/comments/${commentId}/like`,
    config
  );

  return response.data;
};

// Function to delete a comment
export const deleteComment = async (postId, commentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${BASE_URL}/posts/${postId}/comments/${commentId}`,
    config
  );

  return response.data;
};

const commentsService = {
  commentOnPost,
  getComments,
  likeComment,
  unlikeComment,
};

export default commentsService;

