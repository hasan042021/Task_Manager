import React from "react";
import { useGetProjectsQuery } from "../../features/projects/projectsApi";
import Project from "./Project";

const Projects = () => {
  const { data, isLoading, isError, error } = useGetProjectsQuery();

  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (!isLoading && isError) {
    content = <div>{error?.data}</div>;
  } else if (!isLoading && !isError && data?.length === 0) {
    content = <div>No member found!</div>;
  } else if (!isLoading && !isError && data?.length > 0) {
    content = data.map((project) => {
      return <Project projectInfo={project} />;
    });
  }
  console.log(data);
  return (
    <div>
      <div>
        <h3 class="text-xl font-bold">Projects</h3>
        {content}
      </div>
    </div>
  );
};

export default Projects;
