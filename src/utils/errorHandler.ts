export const handleApiError = (error: any): string => {
  if (!error.response) {
    return "Unable to connect to server.";
  }

  const status = error.response.status;

  switch (status) {
    case 401:
      return "Session expired. Please login again.";

    case 403:
      return "You are not allowed to perform this action.";

    case 404:
      return "Requested resource not found.";

    case 500:
      return "Something went wrong. Please try again later.";

    default:
      return error.response?.data?.message || "Something went wrong.";
  }
};
