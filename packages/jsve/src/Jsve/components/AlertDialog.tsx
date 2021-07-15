import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import isEmpty from 'lodash/isEmpty';

export default function AlertDialog({ open, setJsve, jsve, children }) {
  const { currentNode, currentUINode } = jsve;
  const onClose = () =>
    setJsve({ ...jsve, currentNode: {}, currentUINode: {} });
  const getType = () =>
    !isEmpty(currentNode) ? { type: 'schema' } : { type: 'uischema' };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <div className="container">
          <span className="left">{getType().type} for element ..</span>

          <span className="right">
            <IconButton aria-label="close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </span>
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <span>{children}</span>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
