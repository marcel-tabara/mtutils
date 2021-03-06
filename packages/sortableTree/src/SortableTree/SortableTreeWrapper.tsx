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
  data?: object;
  schema?: JSONSchema7;
  onChange?: (val) => void;
};

const SortableTreeWrapper = ({ data, schema, type, onChange }) => {
  const ITEMS: ItemData<Item>[] = data || [];
  const [items, setItems] = React.useState(ITEMS);
  const handleChange = (newItems) => {
    onChange(newItems);
    setItems(newItems);
  };
  const handleChangeData = (id: ID, data: object) => {
    const index = items.findIndex((item) => item.id === id);

    setItems(
      update(items, {
        [index]: { data: { $set: data } },
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

  console.log('########## items-sortable-tree', items);

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
