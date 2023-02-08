import { useAuth } from "context/Auth-context";
import React from "react";

function AuthenticatedApp() {
  const { logout } = useAuth();
  return (
    <>
      <h1>Logined Page</h1>
      <button onClick={() => logout()}>Logout</button>
    </>
  );
}

export default AuthenticatedApp;
