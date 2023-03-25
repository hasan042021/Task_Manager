import { apiSlice } from "../api/apiSlice";

const teamsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeamMembers: builder.query({
      query: () => `/team`,
    }),
  }),
});

export const { useGetTeamMembersQuery } = teamsApi;
