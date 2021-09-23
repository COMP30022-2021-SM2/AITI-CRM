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
  TextField,
  Button
} from '@material-ui/core';

// ----------------------------------------------------------------------
function ChangeCustomerDialog(props) {
  const { onClose, open } = props;
  const handleClose = () => {
    onClose(true);
  };
  return (
    <Dialog onClose={handleClose} aria-labelledby="change-customer-dialog" open={open}>
      <DialogTitle id="change-customer-dialog">Change Customer Details</DialogTitle>
      <DialogContent>
        <DialogContentText> Enter new details of this customer delow. </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="customer-first-name"
          label="First Name"
          type="text"
          fullWidth
        />
        <TextField margin="dense" id="customer-last-name" label="Last Name" type="text" fullWidth />
        <TextField margin="dense" id="customer-email" label="Email" type="text" fullWidth />
        <TextField
          margin="dense"
          id="customer-phone-number"
          label="Phone Number"
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="customer-company-name"
          label="Company Name"
          type="text"
          fullWidth
        />
        <TextField margin="dense" id="customer-abn" label="ABN" type="ABN" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleClose} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ChangeCustomerDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

function DeleteCustomerDialog(props) {
  const { onClose, open } = props;
  const handleClose = () => {
    onClose(true);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="delete-customer-dialog" open={open}>
      <DialogTitle id="delete-customer-dialog">Delete the Order </DialogTitle>
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

DeleteCustomerDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default function UserMoreMenu() {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const handleInsertOpen = () => {
    setOpen(true);
  };
  const handleInsertClose = () => {
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
        <MenuItem
          button="true"
          onClick={() => {
            handleInsertClose();
            handleDeleteDialogOpen();
          }}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <DeleteCustomerDialog open={openDeleteDialog} onClose={handleDeleteDialogClose} />

        <MenuItem button="true" onClick={handleInsertOpen} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <ChangeCustomerDialog open={open} onClose={handleInsertClose} />
      </Menu>
    </>
  );
}
