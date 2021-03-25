import React, { useContext } from 'react';
import type { FC } from 'react';
import { BgContext } from '../App';

const Demo: FC<{ children: any }> = ({ children }) => {
  const bgColor = useContext(BgContext);
  console.log('Demo:', bgColor);
  return <div>{children}</div>;
};
const Child: FC = () => {
  const bgColor = useContext(BgContext);
  return <div style={{ backgroundColor: bgColor }}>Child Demo</div>;
};

export default function ContextDemo() {
  const bgColor = useContext(BgContext);
  console.log('ContextDemo:', bgColor);
  return (
    <Demo>
      <Child />
    </Demo>
  );
}
