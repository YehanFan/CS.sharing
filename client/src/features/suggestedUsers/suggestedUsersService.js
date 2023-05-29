import axios from "axios";
const BASE_URL = `${process.env.REACT_APP_API_URL}`;

// Service function to get suggested users
export const getSuggestedUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${BASE_URL}/users/suggested`, config);

  return response.data;
};

const suggestedUsersService = {
  getSuggestedUsers
}

export default suggestedUsersService;