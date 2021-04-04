import {
  ID,
  ItemRendererProps,
  useDrag,
  useDrop,
  useIsClosestDragging,
} from 'react-sortly';
import React, { memo, useCallback, useState } from 'react';
import {
  Theme,
  IconButton,
  Box,
  InputBase,
  makeStyles,
} from '@material-ui/core';
import ReorderIcon from '@material-ui/icons/Reorder';
import CloseIcon from '@material-ui/icons/Close';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import { Flipped } from 'react-flip-toolkit';
import { GenericForm } from '@mtutils/genericform';
import { JSONSchema7 } from 'json-schema';

const useStyles = makeStyles<Theme, { muted: boolean; depth: number }>(
  (theme: Theme) => ({
    root: (props) => ({
      position: 'relative',
      marginBottom: theme.spacing(0.5),
      zIndex: props.muted ? 1 : 0,
    }),
    body: (props) => ({
      display: 'flex',
      background: '#fff',
      cursor: 'move',
      marginLeft: theme.spacing(props.depth * 2),
      boxShadow: props.muted ? '0px 0px 8px #666' : '0px 0px 2px #666',
      border: props.muted ? '1px dashed #1976d2' : '1px solid transparent',
    }),
  }),
);

type ItemItemRendererProps = ItemRendererProps<{
  type?: string;
  initialData?: object;
  schema?: JSONSchema7;
}> & {
  onChangeData: (id: ID, initialData: object, depth: number) => void;
  onDelete: (id: ID) => void;
  onReturn: (id: ID) => void;
};

const ItemRenderer = memo((props: ItemItemRendererProps) => {
  const {
    id,
    depth,
    data: { type, schema, initialData },
    onChangeData,
    onDelete,
    onReturn,
  } = props;
  const [visible, setVisible] = useState({ id: null });
  const [{ isDragging }, drag, preview] = useDrag({
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });
  const [, drop] = useDrop();

  const classes = useStyles({
    muted: useIsClosestDragging() || isDragging,
    depth,
  });

  const handleClickDelete = useCallback(() => {
    onDelete(id);
  }, [id]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onReturn(id);
      }
    },
    [id],
  );

  //const [handleChangeName] = useDebouncedCallback(onChangeName, 500);
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      onChangeData(id, { ...initialData, title: e.target.value }, depth);
    },
    [],
  );

  const handleDataChange = useCallback(
    (e: any) => {
      onChangeData(id, e, depth);
    },
    [id, depth],
  );

  const handleClickVisible = () => {
    visible.id === id ? setVisible({ id: null }) : setVisible({ id });
  };

  const getVisibility = (id) => {
    return visible.id === id ? {} : { display: 'none' };
  };

  return (
    <Flipped flipId={id}>
      <div ref={(ref) => drop(preview(ref))} className={classes.root}>
        <div className={classes.body}>
          <IconButton ref={drag}>
            <ReorderIcon />
          </IconButton>
          <Box display="flex" flex={1} px={1}>
            <InputBase
              fullWidth
              defaultValue={'Default'}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              //autoFocus={isNew}
              name={type}
            />
          </Box>
          <IconButton onClick={handleClickVisible}>
            <AspectRatioIcon />
          </IconButton>
          <IconButton onClick={handleClickDelete}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={classes.body} style={getVisibility(id)}>
          <GenericForm
            type={type}
            schema={schema}
            onChange={handleDataChange}
            initialData={initialData}
          />
        </div>
      </div>
    </Flipped>
  );
});

export { ItemRenderer };
