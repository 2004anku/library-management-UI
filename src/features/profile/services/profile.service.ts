import { getProfileApi, updateProfileApi } from "../api/profileApi";

import { UpdateProfilePayload } from "../types/profileType";

export const getProfile = async () => {
  const response = await getProfileApi();

  return response.data;
};

export const updateProfile = async (data: UpdateProfilePayload) => {
  const response = await updateProfileApi(data);

  return response.data;
};
