import { useState } from 'react';

export type DRAGGABLE = 'DRAGGABLE';
export type BAR = 'BAR';

export const DRAGGABLE = 'DRAGGABLE';
export const BAR = 'BAR';

function draggable({
  item,
  id,
}: {
  item: { src?: string; title?: string };
  id: number;
}) {
  return {
    type: DRAGGABLE,
    id,
    data: item,
  };
}
function insertBars(
  list: { src?: string; title?: string }[]
): {
  data: { src: string; title: string };
  id: number;
  type: string;
}[] {
  let id = 0;
  const newBar = () => ({ id: id++, type: BAR });
  // @ts-expect-error
  return [newBar()].concat(
    ...list.map(item => [draggable({ item, id: id++ }), newBar()])
  );
}

function clacChanging(
  list: {
    data: { src: string; title: string };
    id: number;
    type: string;
  }[],
  drag: number,
  drop: number
) {
  // eslint-disable-next-line no-param-reassign
  list = list.slice();
  console.log(JSON.stringify(list), drag, drop);

  const dragItem = list[drag];

  // dir > 0从上往下 <0 从下往上
  const dir = drag > drop ? -2 : 2;
  // drop的地方是bar
  const end = dir > 0 ? drop - 1 : drop + 1;

  // eslint-disable-next-line no-param-reassign
  for (let i = drag; i !== end; i += dir) {
    // eslint-disable-next-line no-param-reassign
    list[i] = list[i + dir]!;
  }
  // eslint-disable-next-line no-param-reassign
  list[end] = dragItem!;
  return list;
}

export default function useDraggable(list: { src?: string; title?: string }[]) {
  const [dragList, setDragList] = useState(() => {
    return insertBars(list);
  });
  // Bar 组件对应的位置 放置的位置
  const [dragOver, setDragOver] = useState<null | number>(null);
  // Card 组件对应的位置
  const [dragging, setDragging] = useState<null | number>(null);
  return {
    dragList,
    createDropperProps: (id: number) => {
      return {
        dragging,
        dragOver,
        eventHandlers: {
          onDragOver: (e: DragEvent) => {
            e.preventDefault();
            setDragOver(id);
          },
          onDragLeave: (e: DragEvent) => {
            e.preventDefault();
            setDragOver(null);
          },
          onDrop: (e: DragEvent) => {
            e.preventDefault();
            setDragOver(null);
            // eslint-disable-next-line @typescript-eslint/no-shadow
            setDragList(list => {
              return clacChanging(list, dragging!, id);
            });
          },
        },
      };
    },
    createDraggerProps: (id: number, key: number) => {
      return {
        id,
        key,
        dragging,
        eventHandlers: {
          onDragStart: () => {
            setDragging(id);
          },
          onDragEnd: () => {
            setDragging(null);
          },
        },
      };
    },
  };
}
