import React, { useState } from "react";
import RegisterScreen from "./Register";
import LoginScreen from "./Login";
function UnauthenticatedApp() {
  // 根据该状态显示,显示登录/注册
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      {isLogin ? <LoginScreen /> : <RegisterScreen />}
      <button onClick={() => setIsLogin(!isLogin)}>
        切换到{isLogin ? "Register" : "Login"}
      </button>
    </>
  );
}

export default UnauthenticatedApp;
