import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
};

const projectsSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    projectsChanged: (state, action) => {
      if (typeof action.payload === "object") {
        state.projects = action.payload;
      } else if (state.projects.includes(action.payload)) {
        state.projects = state.projects.filter(
          (project) => project !== action.payload
        );
      } else {
        state.projects.push(action.payload);
      }
    },
  },
});

export const { projectsChanged } = projectsSlice.actions;
export default projectsSlice.reducer;
