import React from "react";
import "./App.css";
import UnauthenticatedApp from "unauthenticated-app/Index";
import AuthenticatedApp from "authenticatedApp";
import { useAuth } from "context/Auth-context";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
