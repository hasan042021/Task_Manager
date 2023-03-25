import React from "react";
import { Sidebar } from "../components/sidebar/Sidebar";
import TasksList from "../components/Tasks/TasksList";

const Home = ({ search }) => {
  return (
    <div class="container relative">
      <Sidebar />
      <TasksList search={search} />
    </div>
  );
};

export default Home;
