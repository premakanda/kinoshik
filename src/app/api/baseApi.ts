import { handleErrors } from "@/common/utils/handleErrors";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = import.meta.env.VITE_BASE_URL;
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

export const baseApi = createApi({
  reducerPath: "movieApi",
  tagTypes: ["Movie"],
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers) => {
        if (accessToken) {
          headers.set("Authorization", `Bearer ${accessToken}`);
        }
        headers.set("accept", "application/json");
        return headers;
      },
    })(args, api, extraOptions);
    if (result.error) {
      handleErrors(result.error);
    }
    return result;
  },
  endpoints: () => ({}),
});
