import React, { Component, createContext, FC, useContext } from 'react';
import './App.css';
import useDraggable, { BAR } from './hooks/useDraggable';
// import ReducerDemo from './components/ReducerDemo';
// import ContextDemo from './components/ContextDemo';
// import HookDemo from './components/HookDemo';
// import RefDemo from './components/RefDemo';
import CallbackMemoDemo from './components/CallbackMemoDemo';

const list = [
  {
    src: 'https://t7.baidu.com/it/u=4162611394,4275913936&fm=193&f=GIF',
    title: '万事屋找我',
  },
  {
    title: '吃吃吃……',
    src: 'https://t7.baidu.com/it/u=2582370511,530426427&fm=193&f=GIF',
  },
  {
    title: '汪汪',
    src: 'https://t7.baidu.com/it/u=2141219545,3103086273&fm=193&f=GIF',
  },
];

function cls(def: string, conditions: [boolean, string]) {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const list = [def];
  if (conditions[0]) {
    list.push(conditions[1]);
  }
  return list.join(' ');
}

const Card: FC<{ title: string; src: string }> = ({ title, src }) => {
  return (
    <div className="card">
      <img src={src} alt="" />
      <span>{title}</span>
    </div>
  );
};
const Draggable: FC<any> = ({ children, eventHandlers, dragging, id }) => {
  return (
    <div
      {...eventHandlers}
      draggable
      className={cls('draggable', [dragging === id, 'dragging'])}
    >
      {children}
    </div>
  );
};

const Bar: FC<any> = ({ id, dragging, dragOver, eventHandlers }) => {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  if (id === dragging + 1) {
    return null;
  }

  return (
    <div
      {...eventHandlers}
      className={cls('draggable--bar', [dragOver === id, 'dragover'])}
    >
      <div
        className="inner"
        style={{
          height: id === dragOver ? '80px' : '0px',
        }}
      />
    </div>
  );
};
const DraggableList: FC<{ list: { title: string; src: string }[] }> = ({
  // eslint-disable-next-line @typescript-eslint/no-shadow
  list,
}) => {
  const { dragList, createDropperProps, createDraggerProps } = useDraggable(
    list
  );
  return (
    <div className="draggableList">
      {dragList.map((item, i) => {
        if (item.type === BAR) {
          return <Bar key={item.id} id={i} {...createDropperProps(i)} />;
        } else {
          return (
            <Draggable {...createDraggerProps(i, item.id)}>
              <Card {...item.data} />
            </Draggable>
          );
        }
      })}
    </div>
  );
};

const bgColor = 'black';
export const BgContext = createContext<string>(bgColor);

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  // constructor(props: any) {
  //   super(props);
  //   this.state = {
  //     bgColor: 'pink',
  //   };
  // }
  render() {
    return (
      <>
        {/* <DraggableList list={list} /> */}
        {/* <ReducerDemo /> */}
        {/* <BgContext.Provider value={this.state.bgColor}>
          <ContextDemo />
        </BgContext.Provider>
        <input
          type="color"
          onChange={e => this.setState({ bgColor: e.target.value })}
        /> */}
        {/* <HookDemo /> */}
        {/* <RefDemo /> */}

        <CallbackMemoDemo />
      </>
    );
  }
}
