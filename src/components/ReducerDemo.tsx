import React, { useReducer } from 'react';

enum Type {
  Increase = 'increase',
  Decrease = 'decrease',
}

export default function ReducerDemo() {
  const initialState = { count: 0 };
  const reducer = (state: { count: number }, action: { type: Type }) => {
    switch (action.type) {
      case Type.Increase:
        return { count: state.count + 1 };
      case Type.Decrease:
        return { count: state.count - 1 };
      default:
        return { count: state.count };
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const increase = () => dispatch({ type: Type.Increase });
  const decrease = () => dispatch({ type: Type.Decrease });

  return (
    <>
      <h2>Count: {state.count}</h2>
      <button type="button" onClick={increase}>
        increase
      </button>
      <button type="button" onClick={decrease}>
        decrease
      </button>
    </>
  );
}
