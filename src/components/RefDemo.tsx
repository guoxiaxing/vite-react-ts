import React, { LegacyRef, useEffect, useRef } from 'react';

const Input = React.forwardRef(
  (props, ref: LegacyRef<HTMLInputElement> | undefined) => {
    return <input ref={ref} type="text" />;
  }
);

export default function RefDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current!.focus();
    console.log(inputRef.current);
    inputRef.current!.value = 'Hello World';
  }, []);
  return (
    <>
      RefDemo: <Input ref={inputRef} />
    </>
  );
}

// useCalback --- 事件回调

// useMemo --- 复杂计算
