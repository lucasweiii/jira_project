// 在真实环境中,如果使用firebase这类第三方auth服务的话,本文件不需要开发者开发

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

//获取环境变量里存的url
const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_provider_token__";

// 获取token
export const getToken = () => window.localStorage.getItem(localStorageKey);

//操作请求返回 设置token 并返回出res的数据
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

//login 函数
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res: Response) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    } else {
      return Promise.reject(data);
    }
  });
};

// export const login = (data: { username: string; password: string }) => {
//   return fetch(`${apiUrl}/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/jason",
//     },
//     body: JSON.stringify(data),
//   }).then(async (res: Response) => {
//     if (res.ok) {
//       return handleUserResponse(await res.json());
//     } else {
//       return Promise.reject(data);
//     }
//   });
// };

//register 函数
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res: Response) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    } else {
      return Promise.reject(data);
    }
  });
};

//登出 函数
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
