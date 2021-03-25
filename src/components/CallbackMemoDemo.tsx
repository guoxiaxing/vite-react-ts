import React, { useCallback, useEffect, useMemo, useState } from 'react';

export default function CallbackMemoDemo() {
  const [count, setCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);
  console.log('update');
  const handleClick = useCallback(() => {
    // console.log(count);
    console.log(123);
  }, []);
  // 如果每次渲染都重新定义的话，那么点击的时候就是当前的count值，如果没有每次渲染都重新定义，那么点击按钮的时候count就是0
  //   const handleClick = () => {
  //     console.log(count);
  //     console.log(123);
  //   };
  useEffect(() => {
    const id1 = setInterval(() => setCount(c => c + 1), 1000);
    const id2 = setInterval(() => setOtherCount(c => c + 1), 100);
    return () => {
      clearInterval(id1);
      clearInterval(id2);
    };
  }, []);

  // 只依赖count不依赖其它的状态变化，所以这里可以使用useMemo
  const result = useMemo(() => count * 100, [count]);
  return (
    <>
      CallbackMemoDemo
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div onClick={handleClick}>
        click {count} {otherCount} {result}
      </div>
    </>
  );
}

// useCallback是用来存储一些函数体，当你的依赖不发生变化的时候，存储的函数体也不会重新定义

// useMemo 根据依赖计算，如果依赖发生变化的话，函数体内的计算需要重新执行，然后返回结果

// 每个hook都有一个memorizeState用来存储hook的当前值（queue）
