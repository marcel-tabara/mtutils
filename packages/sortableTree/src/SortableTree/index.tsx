import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ContextProvider } from 'react-sortly';
import { SortableTreeWrapper } from './SortableTreeWrapper';
import { SortableTreeProps } from './types';

const SortableTree = ({
  data,
  onChange = (val) => val,
  schema,
  type,
}: SortableTreeProps) => (
  <DndProvider backend={HTML5Backend}>
    <ContextProvider>
      <SortableTreeWrapper
        data={data}
        onChange={onChange}
        schema={schema}
        type={type}
      />
    </ContextProvider>
  </DndProvider>
);

export { SortableTree };
