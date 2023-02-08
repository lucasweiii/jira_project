import { useAuth } from "context/Auth-context";
import qs from "qs";
import * as auth from "utils/auth-provider";
const apiURL = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: string;
  token: string;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config
) => {
  const config = {
    //这里只是默认为get,但请求方法为POST等其他方式时,在customConfig里加入参数,后面的会覆盖掉之前的值
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application" : "",
    },
    ...customConfig,
  };
  // 在fetch中,get方法请求的话,参数是带在url里的,其余的参数是在body里.所以这里需要一个一个判断来对参数做处理
  if (config.method.toLowerCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  // axios 和 fetch 的表现不一样,axios可以直接在返回状态不为2xx的时候抛出异常
  return window.fetch(`${apiURL}/${endpoint}`, config).then(async (res) => {
    // 401 unauthorize
    if (res.status === 401) {
      await auth.logout();
      //  刷新页面
      window.location.reload();
      return Promise.reject({ message: "please try to login agin!!" });
    }
    // 无论服务器抛出什么异常,fetch api都不会抛出任何异常(断网,网络连接失败原因会抛出错误)
    // 所以为了捕获服务端返回的异常,需要手动添加Promise.reject()
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      Promise.reject(data);
    }
  });
};

// 使用useHttp管理JWT和登录状态,保持登录状态
//该自定义hook的作用是,自动从context中拿到保存德user信息,并且把token自动加到headers当中
export const useHttp = () => {
  const { user } = useAuth();

  return (...[endpoint, config]: [string, Config]) =>
    //@ts-ignore
    http(endpoint, { ...config, token: user?.token });
  // 一下为使用 ts 操作符的优化版
  // return ([endpoint, config]: Parameters<typof http>) => http(endpoint, { ...config, token: user?.token })
};
