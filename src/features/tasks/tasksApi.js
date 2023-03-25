import { apiSlice } from "../api/apiSlice";

const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => `/tasks`,
    }),
    getSingleTask: builder.query({
      query: (id) => `/tasks/${id}`,
    }),
    addTask: builder.mutation({
      query: (data) => ({
        url: `/tasks`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const result = await queryFulfilled;
        dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
            draft.push(result.data);
          })
        );
      },
    }),
    editTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          console.log(response.data);
          dispatch(
            apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
              console.log(draft);
              let taskToUpdate = draft.find((task) => task.id == id);
              taskToUpdate.taskName = response.data.taskName;
              taskToUpdate.teamMember = response.data.teamMember;
              taskToUpdate.project = response.data.project;
              taskToUpdate.deadline = response.data.deadline;
              taskToUpdate.status = response.data.status;
            })
          );
          dispatch(
            apiSlice.util.updateQueryData(
              "getSingleTask",
              id.toString(),
              (draft) => {
                console.log(JSON.stringify(draft));
                draft.taskName = response.data.taskName;
                draft.teamMember = response.data.teamMember;
                draft.project = response.data.project;
                draft.deadline = response.data.deadline;
                draft.status = response.data.status;
              }
            )
          );
        } catch (error) {}
      },
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic cache update start
        const deleteResult = dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) =>
            draft.filter((t) => t.id != arg)
          )
        );
        // optimistic cache udpate end
        try {
          await queryFulfilled;
          console.log(arg);
        } catch (error) {
          deleteResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
  useGetSingleTaskQuery,
} = tasksApi;
