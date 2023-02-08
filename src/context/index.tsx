import { ReactNode } from "react";
import { AuthProvider } from "./Auth-context";

const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
export default AppProviders;
