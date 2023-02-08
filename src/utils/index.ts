// 当在projectList组件里搜索时,用户不搜索name,只使用下拉列表选择发送请求时,name的值为空,发送请求时会有歧义,
// 故服务器会无法判断让name的值为空,返回满足第二个参数的条件项,还是只返回name为空的条件项
//为避免此操作,需要在传参时判断,value是否为空,如果为空,传参时删除该key
// 在发送请求传参时,要是一个参数没有,会导致一些错误,所以这个函数在于找出没有值的字段,并删除该字段
//在一个函数里,改变传入的对象本身时不好的
import { useEffect, useState } from "react";
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const cleanObject = (object: object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    //@ts-ignore
    const value = result[key];

    // 如果该值不存在的话,删除该字段 但要考虑0,0也会返回false 但是是一个有价值的数据
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};
//自定义钩子 相当于生命周期的 componetDidMount 组件刚加载时渲染
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

//debounce 防抖 搜索项目名称时,只执行最后一次的发送请求

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // 每次在value变化以后,设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    //每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};
