import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
import Cookies from 'js-cookie';
import axios from '../../../commons/axios';

// ----------------------------------------------------------------------

export default function UserMoreMenu(customerId) {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState([]);
  const [givenName, setGivenName] = useState();
  const [familyName, setFamilyName] = useState();
  const [emailAddress, setEmailAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [companyName, setCompanyName] = useState();
  const [abn, setAbn] = useState();
  const [newGivenName, setNewGivenName] = useState('');
  const [newFamilyName, setNewFamilyName] = useState('');
  const [newEmailAddress, setNewEmailAddress] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newAbn, setNewAbn] = useState('');
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

  const [openDetailsDialog, setDetailsDialogOpen] = useState(false);

  useEffect(() => {
    if (Cookies.get('token')) {
      axios
        .get(`/customer/${customerId.customer}`, {
          headers: { Authorization: `Bearer ${Cookies.get('token')}` }
        })
        .then((response) => {
          if (response.status === 200) {
            setCustomer(response.data);
            setGivenName(response.data[0].givenName);
            setFamilyName(response.data[0].familyName);
            setEmailAddress(response.data[0].emailAddress);
            setPhoneNumber(response.data[0].phoneNumber);
            setCompanyName(response.data[0].companyName);
            setAbn(response.data[0].abn);
          }
        })
        .catch(() => {
          console.log('get customers failed');
        });
      setNewGivenName(givenName);
      setNewFamilyName(familyName);
      setNewEmailAddress(emailAddress);
      setNewPhoneNumber(phoneNumber);
      setNewCompanyName(companyName);
      setNewAbn(abn);
    } else {
      navigate('/404', { replace: true });
    }
  }, []);

  const handleDetailsDialogOpen = () => {
    setDetailsDialogOpen(true);
  };

  const handleDetailsDialogClose = () => {
    setDetailsDialogOpen(false);
  };

  // Handle delete of the customer
  const submitDelete = () => {
    axios
      .delete(`/customer/${customerId.customer}`, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` }
      })
      .then((response) => {
        if (response.status === 200) {
          window.location.reload(false);
          console.log('customer delete success');
        } else {
          console.log('customer delete fail');
        }
      })
      .catch(() => {
        console.log('customer delete fail2');
      });
  };

  function DeleteCustomerDialog(props) {
    const { onClose, open } = props;
    const handleClose = () => {
      onClose(true);
    };

    return (
      <Dialog onClose={handleClose} aria-labelledby="delete-customer-dialog" open={open}>
        <DialogTitle id="delete-customer-dialog">Delete the Customer </DialogTitle>
        <DialogContent>
          <DialogContentText> Are you sure you want to delete this customer?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button
            onClick={() => {
              submitDelete();
              handleClose();
            }}
            color="primary"
          >
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

  // Update customer profile
  const submitUpdate = () => {
    axios
      .put(
        `/customer/${customerId.customer}`,
        {
          givenName: newGivenName,
          familyName: newFamilyName,
          emailAddress: newEmailAddress,
          phoneNumber: newPhoneNumber,
          companyName: newCompanyName,
          abn: newAbn
        },
        {
          headers: { Authorization: `Bearer ${Cookies.get('token')}` }
        }
      )
      .then((response) => {
        if (response.status === 200) {
          window.location.reload(false);
          console.log('customer update success');
        }
      })
      .catch(() => {
        alert('customer update failed!');
      });
  };

  // see customer details popup
  function CustomerDetailsDialog(props) {
    const { onClose, open } = props;
    const handleClose = () => {
      onClose(true);
    };

    return (
      <Dialog onClose={handleClose} aria-labelledby="customer-details-dialog" open={open}>
        <DialogTitle id="customer-details-dialog">
          {customer[0].givenName} {customer[0].familyName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Company: {customer[0].companyName}</DialogContentText>
          <DialogContentText>
            Email: <a href={`mailto:${customer[0].emailAddress}`}>{customer[0].emailAddress}</a>
          </DialogContentText>
          <DialogContentText>Phone: {customer[0].phoneNumber}</DialogContentText>
          <DialogContentText>ABN: {customer[0].abn}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  CustomerDetailsDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
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
        <MenuItem button="true" onClick={handleDetailsDialogOpen} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon="mdi:card-account-details" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Details" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <CustomerDetailsDialog
          open={openDetailsDialog}
          onClose={handleDetailsDialogClose}
          customer={customer}
        />

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
        <Dialog onClose={handleInsertClose} aria-labelledby="change-customer-dialog" open={open}>
          <DialogTitle id="change-customer-dialog">Change Customer Details</DialogTitle>
          <DialogContent>
            <DialogContentText> Enter new details of this customer delow. </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="customer-first-name"
              label="Given Name"
              type="text"
              defaultValue={givenName}
              onChange={(e) => setNewGivenName(e.target.value)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="customer-last-name"
              label="Family Name"
              type="text"
              defaultValue={familyName}
              onChange={(e) => setNewFamilyName(e.target.value)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="customer-email"
              label="Email"
              type="text"
              defaultValue={emailAddress}
              onChange={(e) => setNewEmailAddress(e.target.value)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="customer-phone-number"
              label="Phone Number"
              type="text"
              defaultValue={phoneNumber}
              onChange={(e) => setNewPhoneNumber(e.target.value)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="customer-company-name"
              label="Company Name"
              defaultValue={companyName}
              onChange={(e) => setNewCompanyName(e.target.value)}
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              id="customer-abn"
              label="ABN"
              type="text"
              defaultValue={abn}
              onChange={(e) => setNewAbn(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleInsertClose} color="primary">
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                submitUpdate();
                handleInsertClose();
              }}
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Menu>
    </>
  );
}
