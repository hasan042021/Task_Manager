import { apiSlice } from "../api/apiSlice";
import { projectsChanged } from "./projectSlice";

const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => "/projects",
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const result = await queryFulfilled;
        const projects = result.data.map((p) => p.projectName);
        dispatch(projectsChanged(projects));
      },
    }),
  }),
});

export const { useGetProjectsQuery } = projectsApi;
