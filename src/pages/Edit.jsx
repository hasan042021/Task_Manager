import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProjectsQuery } from "../features/projects/projectsApi";
import {
  useEditTaskMutation,
  useGetSingleTaskQuery,
} from "../features/tasks/tasksApi";
import { useGetTeamMembersQuery } from "../features/teams/teamsApi";

const Edit = () => {
  const { data: members } = useGetTeamMembersQuery();
  const { data: projects } = useGetProjectsQuery();
  const [editTask, { isLoading }] = useEditTaskMutation();

  const { taskId } = useParams();

  const { data: task } = useGetSingleTaskQuery(taskId);
  useEffect(() => {
    const {
      taskName: initialTaskname,
      teamMember: initialMember,
      project: initialProject,
      deadline: initialDeadline,
    } = task || {};
    setTaskName(initialTaskname);
    setAssignTo(initialMember?.name);
    setDeadline(initialDeadline);
    setMember(initialMember);
    setProject(initialProject);
    setProjectName(initialProject?.projectName);
  }, [task]);

  const [taskName, setTaskName] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [projectName, setProjectName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [member, setMember] = useState("");
  const [project, setProject] = useState("");

  const handleMemberChange = (e) => {
    setAssignTo(e.target.value);
    if (!e.target) {
      console.error("Error: target not found in event object");
      return;
    }
    const dataset = e.target.options[e.target.selectedIndex].dataset;
    const member = JSON.parse(dataset.member);
    setMember(member);
  };

  const handleProjectChange = (e) => {
    setProjectName(e.target.value);
    if (!e.target) {
      console.error("Error: target not found in event object");
      return;
    }
    const dataset = e.target.options[e.target.selectedIndex].dataset;
    const project = JSON.parse(dataset.project);
    console.log(project);
    setProject(project);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    console.log(taskName, assignTo, projectName, deadline);
    console.log(member, project);
    const task = {
      taskName,
      teamMember: member,
      project,
      deadline,
    };
    editTask({ id: taskId, data: task });
  };

  return (
    <div class="container relative">
      <main class="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 class="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
          Edit Task for Your Team
        </h1>

        <div class="justify-center mb-10 space-y-2 md:flex md:space-y-0">
          <form onSubmit={handleAddTask} class="space-y-6">
            <div class="fieldContainer">
              <label for="lws-taskName">Task Name</label>
              <input
                type="text"
                name="taskName"
                id="lws-taskName"
                required
                placeholder="Implement RTK Query"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>

            <div class="fieldContainer">
              <label>Assign To</label>
              <select
                value={assignTo}
                onChange={handleMemberChange}
                name="teamMember"
                id="lws-teamMember"
                required
              >
                <option value="" hidden selected>
                  Select Job
                </option>
                {members?.map((member) => {
                  const dataAttr = JSON.stringify(member);
                  return (
                    <option
                      key={member.id}
                      value={member.name}
                      data-member={dataAttr}
                    >
                      {member.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div class="fieldContainer">
              <label for="lws-projectName">Project Name</label>
              <select
                id="lws-projectName"
                name="projectName"
                required
                value={projectName}
                onChange={handleProjectChange}
              >
                <option value="" hidden selected>
                  Select Project
                </option>
                {projects?.map((project) => {
                  const dataAttr = JSON.stringify(project);
                  return (
                    <option
                      key={project.id}
                      value={project.projectName}
                      data-project={dataAttr}
                    >
                      {project.projectName}
                    </option>
                  );
                })}
              </select>
            </div>

            <div class="fieldContainer">
              <label for="lws-deadline">Deadline</label>
              <input
                type="date"
                name="deadline"
                id="lws-deadline"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>

            <div class="text-right">
              <button type="submit" class="lws-submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Edit;
