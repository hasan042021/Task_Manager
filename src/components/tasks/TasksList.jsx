import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetTasksQuery } from "../../features/tasks/tasksApi";
import Task from "./Task";

const TasksList = ({ search }) => {
  const { data: tasks, isLoading, isError, error } = useGetTasksQuery();
  const { projects: selectedProjects, filter } = useSelector(
    (state) => state.projects
  );

  const filterByProjects = (task) =>
    selectedProjects.includes(task.project.projectName);

  const searchBy = (task) =>
    task?.taskName.toLowerCase().includes(search?.toLowerCase());

  console.log(filter);
  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (!isLoading && isError) {
    content = <div>{error?.data}</div>;
  } else if (!isLoading && !isError && tasks?.length === 0) {
    content = <div>No member found!</div>;
  } else if (!isLoading && !isError && tasks?.length > 0) {
    content = tasks
      ?.filter(filterByProjects)
      .filter(searchBy)
      .map((task) => {
        return <Task task={task} />;
      });
  }
  const id = 1;
  return (
    <div class="lg:pl-[16rem] 2xl:pl-[23rem]">
      <main class="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <div class="justify-between mb-10 space-y-2 md:flex md:space-y-0">
          <Link to={`/create`} class="lws-addnew group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 group-hover:text-indigo-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>

            <span class="group-hover:text-indigo-500">Add New</span>
          </Link>
        </div>

        <div class="lws-task-list">{content}</div>
      </main>
    </div>
  );
};

export default TasksList;
