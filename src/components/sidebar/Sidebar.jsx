import React from "react";
import Projects from "./Projects";
import Team from "./Team";

export const Sidebar = () => {
  return (
    <div class="container relative">
      <div class="sidebar">
        <Projects />
        <Team />
      </div>
    </div>
  );
};
