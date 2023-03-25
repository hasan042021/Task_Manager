import React from "react";
import { useGetTeamMembersQuery } from "../../features/teams/teamsApi";
import Member from "./Member";

const Team = () => {
  const { data, isLoading, isError, error } = useGetTeamMembersQuery();
  console.log(data);

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (!isLoading && isError) {
    content = <div>{error?.data}</div>;
  } else if (!isLoading && !isError && data?.length === 0) {
    content = <div>No member found!</div>;
  } else if (!isLoading && !isError && data?.length > 0) {
    content = data.map((member) => {
      return <Member member={member} />;
    });
  }
  return (
    <div class="mt-8">
      <h3 class="text-xl font-bold">Team Members</h3>
      {content}
    </div>
  );
};

export default Team;
