import React, { FormEvent } from "react";
const LoginRegisterScreen = () => {
  //login函数
  const login = (params: { username: string; password: string | number }) => {
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).then(async (res: Response) => {
      if (res.ok) {
        console.log("successed!");
      }
    });
  };

  // 点击获取表单值
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); //阻止表单默认行为

    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value; //此处的 as HTMLInput 是强制告诉计算机,这里是一个input元素,这样才能取得value属性的值,否则将被视为element元素
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};
export default LoginRegisterScreen;
