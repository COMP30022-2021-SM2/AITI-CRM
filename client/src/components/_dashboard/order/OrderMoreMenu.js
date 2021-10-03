import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { ArrayInput, SimpleFormIterator, DateInput, TextInput } from 'react-admin';

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
  Tooltip,
  Container,
  Stack,
  Typography,
  Button,
  TextField
} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Cookies from 'js-cookie';
import axios from '../../../commons/axios';
import { AddDetail } from './detail';

// ----------------------------------------------------------------------

export default function OrderMoreMenu({ order }) {
  console.log(order);
  const { _id, customerId, details, total, status } = order;
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenStatus, setIsOpenStatus] = useState(false);

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

  const [openDetailsDialog, setDetailsDialogOpen] = useState(false);

  const handleDetailsDialogOpen = () => {
    setDetailsDialogOpen(true);
  };

  const handleDetailsDialogClose = () => {
    setDetailsDialogOpen(false);
  };

  const markComplete = () => {
    axios
      .put(
        `/order/status/${_id}`,
        { status: 'completed' },
        { headers: { Authorization: `Bearer ${Cookies.get('token')}` } }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log('order is marked completed');
        } else {
          console.log('mark complete fail');
        }
      })
      .catch(() => {
        console.log('update fail');
      });
  };

  const markonGoing = () => {
    axios
      .put(
        `/order/status/${_id}`,
        { status: 'ongoing' },
        { headers: { Authorization: `Bearer ${Cookies.get('token')}` } }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log('order is marked ongoing');
        } else {
          console.log('mark ongoing fail');
        }
      })
      .catch(() => {
        console.log('update fail');
      });
  };

  const markCancelled = () => {
    axios
      .put(
        `/order/status/${_id}`,
        { status: 'cancelled' },
        { headers: { Authorization: `Bearer ${Cookies.get('token')}` } }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log('order is marked cancelled');
        } else {
          console.log('mark cancelled fail');
        }
      })
      .catch(() => {
        console.log('update fail');
      });
  };

  // Handle edit update
  // const submitUpdate = () => {
  //   axios
  //     .put(
  //       `/product/${tag}`,
  //       { name: newName, description: newDescription },
  //       { headers: { Authorization: `Bearer ${Cookies.get('token')}` } }
  //     )
  //     .then((response) => {
  //       if (response.status === 200) {
  //         console.log('product info is updated');
  //       } else {
  //         console.log('info update fail');
  //       }
  //     })
  //     .catch(() => {
  //       console.log('update fail');
  //     });
  // };

  // Handle delete
  const submitDelete = () => {
    axios
      .delete(`/order/${_id}`, { headers: { Authorization: `Bearer ${Cookies.get('token')}` } })
      .then((response) => {
        if (response.status === 200) {
          console.log('order delete success');
        } else {
          console.log('order delete fail');
        }
      })
      .catch(() => {
        console.log('order delete fail2');
      });
  };

  function EditDialog(props) {
    const { onClose, open } = props;
    const handleClose = () => {
      onClose(true);
    };

    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="edit-dialog-title">Edit your order </DialogTitle>
        <DialogContent>
          <DialogContentText> Hi, {customerId.givenName}</DialogContentText>
          <DialogContentText> Please modify the details of your order below...</DialogContentText>
        </DialogContent>
        <AddDetail order={order} />

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {/* <Button onClick={handleClose} color="primary">
            Submit
          </Button> */}
        </DialogActions>
      </Dialog>
    );
  }

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

  // DeleteDialog.propTypes = {
  //   onClose: PropTypes.func.isRequired,
  //   open: PropTypes.bool.isRequired
  // };

  function OrderDetailsDialog(props) {
    const { onClose, open } = props;
    const handleClose = () => {
      onClose(true);
    };

    const List = ({ list }) => (
      <ul>
        {list.map((item) => (
          <ListItem key={item.name} item={item} />
        ))}
      </ul>
    );

    const ListItem = ({ item }) => (
      <li>
        <div style={{ marginLeft: '5%' }}>Product Name: {item.name}</div>
        <div style={{ marginLeft: '7%' }}>Price: {item.price}</div>
        <div style={{ marginLeft: '7%' }}>Quantity: {item.quantity}</div>
        <p> </p>
      </li>
    );

    return (
      <Dialog fullWidth="sm" maxWidth="md" onClose={handleClose} open={open}>
        <DialogTitle>{customerId.givenName} </DialogTitle>
        <DialogTitle> Product Details </DialogTitle>

        <List list={details} />

        <DialogTitle>current status : {status} </DialogTitle>
        <DialogTitle>total deal amount : {total} </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  // OrderDetailsDialog.propTypes = {
  //   onClose: PropTypes.func.isRequired,
  //   open: PropTypes.bool.isRequired
  // };

  return (
    <>
      <Tooltip title="change order status">
        <IconButton ref={ref} onClick={() => setIsOpenStatus(true)}>
          <Icon icon="teenyicons:tick-circle-outline" width={20} height={20} />
        </IconButton>
      </Tooltip>

      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpenStatus}
        anchorEl={ref.current}
        onClose={() => setIsOpenStatus(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <ListItem
          button="true"
          onClick={() => {
            setIsOpenStatus(false);
            markComplete();
          }}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemText primary="Complete" primaryTypographyProps={{ variant: 'body2' }} />
        </ListItem>
        <ListItem
          button="true"
          onClick={() => {
            setIsOpenStatus(false);
            markonGoing();
          }}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemText primary="Ongoing" primaryTypographyProps={{ variant: 'body2' }} />
        </ListItem>
        <ListItem
          button="true"
          onClick={() => {
            setIsOpenStatus(false);
            markCancelled();
          }}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemText primary="Cancelled" primaryTypographyProps={{ variant: 'body2' }} />
        </ListItem>
      </Menu>

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
        <ListItem button="true" onClick={handleDetailsDialogOpen} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon="bx:bx-detail" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Detail" primaryTypographyProps={{ variant: 'body2' }} />
        </ListItem>
        <OrderDetailsDialog open={openDetailsDialog} onClose={handleDetailsDialogClose} />
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
        <EditDialog open={open} onClose={handleClose} />
      </Menu>
    </>
  );
}
