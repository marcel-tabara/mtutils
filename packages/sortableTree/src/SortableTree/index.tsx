import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sortly, {
  ContextProvider,
  useDrag,
  buildTree,
  ID,
  ItemData,
  add,
  remove,
  insert,
} from 'react-sortly';

import { Flipper } from 'react-flip-toolkit';
import { Box, Button } from '@material-ui/core';
import update from 'immutability-helper';
import { ItemRenderer } from './ItemRenderer';

type Item = {
  type: string;
  schemaData: object;
};
const ITEMS: ItemData<Item>[] = [];

const MySortableTree = () => {
  const [items, setItems] = React.useState(ITEMS);
  const handleChange = (newItems: ItemData<Item>[]) => {
    setItems(newItems);
  };
  const handleChangeData = (id: ID, schemaData: object) => {
    const index = items.findIndex((item) => item.id === id);
    setItems(
      update(items, {
        [index]: { schemaData: { $set: schemaData } },
      }),
    );
  };
  const handleChangeName = (id: ID, title: string) => {
    const index = items.findIndex((item) => item.id === id);
    setItems(
      update(items, {
        [index]: { schemaData: { title: { $set: title } } },
      }),
    );
  };
  const handleDelete = (id: ID) => {
    const index = items.findIndex((item) => item.id === id);
    setItems(remove(items, index));
  };
  const handleClickAdd = () => {
    setItems(
      add(items, {
        id: Date.now(),
        type: 'string',
        schemaData: {},
      }),
    );
  };
  const handleReturn = (id: ID) => {
    const index = items.findIndex((item) => item.id === id);
    setItems(
      insert(
        items,
        {
          id: Date.now(),
          type: 'string',
          schemaData: {},
        },
        index,
      ),
    );
  };

  console.log('########## items', buildTree(items));

  return (
    <Box width={{ md: 600 }}>
      <Flipper flipKey={items.map(({ id }) => id).join('.')}>
        <Sortly items={items} onChange={handleChange}>
          {(props) => (
            <ItemRenderer
              {...props}
              //onChangeName={handleChangeName}
              onChangeData={handleChangeData}
              onDelete={handleDelete}
              onReturn={handleReturn}
            />
          )}
        </Sortly>
      </Flipper>
      <Box mt={4}>
        <Button variant="outlined" onClick={handleClickAdd}>
          Add New Item
        </Button>
      </Box>
    </Box>
  );
};

const SortableTree = () => (
  <DndProvider backend={HTML5Backend}>
    <ContextProvider>
      <MySortableTree />
    </ContextProvider>
  </DndProvider>
);

export { SortableTree };
