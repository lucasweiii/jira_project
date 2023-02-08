import React, { useState, createContext, useContext, ReactNode } from "react";
import * as auth from "utils/auth-provider";
import { http } from "utils/http";

// import { login } from "utils/auth-provider";

interface AuthForm {
  username: string;
  password: string;
}

// 初始化user
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

//创建一个context
const AuthContext = createContext<
  | {
      user: auth.User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
// 使用在devTool上的,跟项目本身无关
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<auth.User | null>(null);

  //point free
  const login = (form: AuthForm) =>
    auth.login(form).then((user) => setUser(user));

  const register = (form: AuthForm) =>
    auth.register(form).then((user) => setUser(user));

  const logout = () => auth.logout().then(() => setUser(null));

  // useMount(()=>{
  //   bootstrapUser().then(setUser)
  // })

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

//自定义hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used in AuthProvider!!!!!");
  }
  return context;
};
