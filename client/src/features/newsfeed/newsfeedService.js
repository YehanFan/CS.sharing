import axios from "axios";
const BASE_URL = `${process.env.REACT_APP_API_URL}`;

// Get newsfeed data
export const getNewsfeed = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  };

  const response = await axios.get(
    `${BASE_URL}/newsfeed`,
    config 
  );

  return response.data;
};

const newsfeedService = {
  getNewsfeed,
};

export default newsfeedService;

