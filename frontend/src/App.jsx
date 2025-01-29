import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";

const App = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/tasks" element={<Tasks />} />
  </Routes>
);

export default App;
