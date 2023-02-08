import { useAuth } from "context/Auth-context";
import React, { FormEvent } from "react";
import { register } from "utils/auth-provider";
const RegisterScreen = () => {
  //从环境变量中获取baseUrl
  const apiURL = process.env.REACT_APP_API_URL;
  const { user, register } = useAuth();

  // 点击获取表单值   //HTMLFormElement extends Element
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); //阻止表单默认行为
    // 获取表单的值
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value; //此处的 as HTMLInput 是强制告诉计算机,这里是一个input元素,这样才能取得value属性的值,否则将被视为element元素
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    //调用登录方法.发送请求
    register({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      用户名:{user?.name}
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};
export default RegisterScreen;
