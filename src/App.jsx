import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/shared/Header";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Home from "./pages/Home";

function App() {
  const [search, setSearch] = useState("");
  return (
    <div className="App">
      <Router>
        <Header search={search} setSearch={setSearch} />
        <Routes>
          <Route path="/" element={<Home search={search} />} />
          <Route path="/create" element={<Add />} />
          <Route path="/edit/:taskId" element={<Edit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
