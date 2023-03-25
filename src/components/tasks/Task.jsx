import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteTaskMutation,
  useEditTaskMutation,
} from "../../features/tasks/tasksApi";
import Avatar from "../ui/Avatar";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

const Task = ({ task }) => {
  const { taskName, teamMember, project, deadline, status, id } = task;
  const [updatedStatus, setUpdatedStatus] = useState(status);
  const [shouldEdit, setShouldEdit] = useState(false);
  const [editTask, { isError, isLoading }] = useEditTaskMutation();
  const [deleteTask, { data: responseData }] = useDeleteTaskMutation();

  const dateStr = deadline || "";
  const formattedDate = moment(dateStr).format("DD MMMM");
  const dataArr = formattedDate.split(" ");
  useEffect(() => {
    if (shouldEdit) {
      editTask({ id, data: { status: updatedStatus } });
      setShouldEdit(false);
    }
  }, [updatedStatus]);

  const handleStatusChange = (e) => {
    setUpdatedStatus(e.target.value);
    setShouldEdit(true);
  };
  const handleDelete = (e) => {
    deleteTask(id);
  };
  // {
  //   "taskName": "Implement JSON server",
  //   "teamMember": {
  //     "name": "Saad Hasan",
  //     "avatar": "/images/avatars/sadh.png",
  //     "id": 2
  //   },
  //   "project": {
  //     "id": 2,
  //     "projectName": "Flight Booking",
  //     "colorClass": "color-flight"
  //   },
  //   "deadline": "2023-03-31",
  //   "id": 6
  // },
  return (
    <div class="lws-task">
      <div class="flex items-center gap-2 text-slate">
        <h2 class="lws-date">{dataArr[0]}</h2>
        <h4 class="lws-month">{dataArr[1]}</h4>
      </div>

      <div class="lws-taskContainer">
        <h1 class="lws-task-title">{taskName}</h1>
        <span class={`lws-task-badge ${project.colorClass}`}>
          {project.projectName}
        </span>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <Avatar imgUrl={teamMember.avatar} />
          <p class="lws-task-assignedOn">{teamMember.name}</p>
        </div>
        {updatedStatus === "complete" ? (
          <DeleteButton handleDelete={handleDelete} />
        ) : (
          <Link to={`/edit/${id}`}>
            <EditButton />
          </Link>
        )}
        <select
          onChange={handleStatusChange}
          value={updatedStatus}
          class="lws-status"
        >
          <option value="pending">Pending</option>
          <option value="inProgress">In Progress</option>
          <option value="complete">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default Task;
