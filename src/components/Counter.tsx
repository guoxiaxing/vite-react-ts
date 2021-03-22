import React, { useState, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  const add = () => setCount(count + 1);
  useEffect(() => {
    document.title = `You click ${count} time !!`;
  });
  return (
    <>
      <h2>Count: {count}</h2>
      <button type="button" onClick={add}>
        add
      </button>
    </>
  );
}
