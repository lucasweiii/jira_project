import { useAuth } from "context/Auth-context";
import React from "react";
import ProjectListScreen from "screens/project-list/Index";

function AuthenticatedApp() {
  const { logout } = useAuth();
  return (
    <>
      <ProjectListScreen />
      <button onClick={() => logout()}>Logout</button>
    </>
  );
}

export default AuthenticatedApp;
