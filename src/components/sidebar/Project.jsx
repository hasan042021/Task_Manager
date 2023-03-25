import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { projectsChanged } from "../../features/projects/projectSlice";

const Project = ({ projectInfo }) => {
  const { projectName, colorClass } = projectInfo;
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  const handleProject = () => {
    setChecked(!checked);
    dispatch(projectsChanged(projectName));
  };
  return (
    <div class="mt-3 space-y-4">
      <div class="checkbox-container">
        <input
          type="checkbox"
          oncl
          class={colorClass}
          onClick={handleProject}
          checked={checked}
        />
        <p class="label">{projectName}</p>
      </div>
    </div>
  );
};

export default Project;
