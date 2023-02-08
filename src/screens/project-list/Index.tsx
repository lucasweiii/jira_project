import React, { useState, useEffect } from "react";
import SearechPanel from "./SearchPanel";
import List from "./List";
import { cleanObject, useDebounce, useMount } from "../../utils/index";
import qs from "qs";

const ProjectListScreen = () => {
  // 状态保存表单值(搜索时用)
  const [formValue, setFormValue] = useState({
    name: "",
    personId: "",
  });

  const apiURL = process.env.REACT_APP_API_URL;

  //下拉选择框的的状态(人名)显示时用
  const [users, setUsers] = useState([]);

  //发送请求后返回值的list状态(也就是project list的内容)
  const [resList, setResList] = useState([]);
  // 通过防抖,拿到的最后输入框里的值
  const debouncedFormValue = useDebounce(cleanObject(formValue), 1000);

  //当表单的值发生变化时,向接口发送请求
  useEffect(() => {
    // 这种写法不好,下载 qs 插件
    // fetch(`http://localhost:3001/projects?name=${formValue.name}&personId=${formValue.personId}`).then(async res => {
    fetch(
      `${apiURL}/projects${qs.stringify(cleanObject(debouncedFormValue))}`
    ).then(async (res) => {
      if (res.ok) {
        //存为json格式
        setResList(await res.json());
      }
    });
  }, [formValue]);

  // 初始化user 因为只需要页面挂载时执行一次,故使用[]
  useMount(() => {
    fetch(`${apiURL}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  });
  return (
    <>
      <SearechPanel
        formValue={formValue}
        setFormValue={setFormValue}
        users={users}
      />
      <List resList={resList} users={users} />
    </>
  );
};
export default ProjectListScreen;
