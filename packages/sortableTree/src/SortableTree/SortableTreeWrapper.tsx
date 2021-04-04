import React from 'react';

import Sortly, {
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
import { JSONSchema7 } from 'json-schema';

type Item = {
  type?: string;
  initialData?: object;
  schema?: JSONSchema7;
  onChange?: (val) => void;
};

const SortableTreeWrapper = ({ initialData, schema, type, onChange }) => {
  const ITEMS: ItemData<Item>[] = initialData || [];
  const [items, setItems] = React.useState(ITEMS);
  const handleChange = (newItems) => setItems(newItems);
  const handleChangeData = (id: ID, initialData: object, depth: number) => {
    const index = items.findIndex((item) => item.id === id);

    setItems(
      update(items, {
        [index]: { initialData: { $set: initialData } },
      }),
    );
  };

  const getIndex = (id: ID) => items.findIndex((item) => item.id === id);
  const handleDelete = (id: ID) => setItems(remove(items, getIndex(id)));

  const handleClickAdd = () =>
    setItems(
      add(items, {
        id: Date.now(),
      }),
    );

  const handleReturn = (id: ID) =>
    setItems(
      insert(
        items,
        {
          id: Date.now(),
        },
        getIndex(id),
      ),
    );

  return (
    <Box width={{ md: 600 }}>
      <Flipper flipKey={items.map(({ id }) => id).join('.')}>
        <Sortly items={items} onChange={handleChange}>
          {(props) => {
            return (
              <ItemRenderer
                {...props}
                onChangeData={handleChangeData}
                onDelete={handleDelete}
                onReturn={handleReturn}
              />
            );
          }}
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

export { SortableTreeWrapper };
