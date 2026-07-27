import { getProfileApi } from "../api/profileApi";

export const getProfile = async () => {
  const response = await getProfileApi();

  return response.data.data;
};
