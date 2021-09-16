import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Container,
  Stack,
  Typography,
  Button,
  TextField
} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';

// ----------------------------------------------------------------------

function SimpleDialog(props) {
  const { onClose, open } = props;
  const handleClose = () => {
    onClose(true);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Edit your order </DialogTitle>
      <DialogContent>
        <DialogContentText> Please modify the details of your order below...</DialogContentText>
        <TextField autoFocus margin="dense" id="name" label="Customer Name" type="text" fullWidth />
        <TextField margin="dense" id="name" label="Product Company" type="text" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

function DeleteDialog(props) {
  const { onClose, open } = props;
  const handleClose = () => {
    onClose(true);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Delete the Order </DialogTitle>
      <DialogContent>
        <DialogContentText> Are you sure you want to delete this order?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button onClick={handleClose} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default function OrderMoreMenu() {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openDeleteDialog, setDeleteDialogOpen] = useState(false);

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <ListItem
          button="true"
          onClick={() => {
            handleClose();
            handleDeleteDialogOpen();
          }}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>

          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </ListItem>
        <DeleteDialog open={openDeleteDialog} onClose={handleDeleteDialogClose} />

        <ListItem button="true" onClick={handleClickOpen} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </ListItem>
        <SimpleDialog open={open} onClose={handleClose} />
      </Menu>
    </>
  );
}
