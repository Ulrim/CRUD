import React from "react";
import ReadUser from "./components/ReadUser";
import CreateUser from "./components/CreateUser";
import UpdateUser from "./components/UpdateUser";
import DeleteUser from "./components/DeleteUser";

const App = () => (
  <div>
    <CreateUser />
    <UpdateUser />
    <DeleteUser />
    <h2>GraphQL + MongoDB CRUD</h2>
    <ReadUser />
  </div>
);

export default App;
