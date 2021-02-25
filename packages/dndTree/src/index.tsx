import { Container } from './DndTree/Container';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import React from 'react';

const DndTree = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Container />
    </DndProvider>
  );
};

export { DndTree };
