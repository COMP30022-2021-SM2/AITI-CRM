import { useRef, useState } from 'react';
// import axios from '../commons/axios.js';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// material
import { alpha } from '@material-ui/core/styles';
import { Button, Box, Divider, Typography, Avatar, IconButton, TextField } from '@material-ui/core';
// components
import { Navigate } from 'react-router';
import MenuPopover from '../../components/MenuPopover';
//
import account from '../../_mocks_/account';

// ----------------------------------------------------------------------
export default function AccountPopover({ user }) {
  // const { givenName, familyName, emailAddress, password } = user;
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Handle profile update
  const [openDialog, setDialogOpen] = useState(false);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  // const [newGivenName, setName] = useState('');
  // const [newFamilyName, setFamilyName] = useState('');
  // const [newPassword, setPassword] = useState('');
  // const [newConfirmPassword, setComfirmPassword] = useState('');
  // const submitUpdate= () => {
  //   if (newPassword != '' && newConfirmPassword != '') {
  //     axios.put('/profile', { givenName: newGivenName, familyName: newFamilyName, password: newPassword, confirmPassword: newConfirmPassword }).then(response =>{
  //       if (response.data.success){
  //           message.success("profile updated success")
  //       } else {
  //           message.error(response.data.error)
  //       }
  //     })
  //   } else {
  //     axios.put('/profile', { givenName: newGivenName, familyName: newFamilyName }).then(response =>{
  //       if (response.data.success){
  //           message.success("profile updated success")
  //       } else {
  //           message.error(response.data.error)
  //       }
  //     })
  //   }
  // }

  function SimpleDialog(props) {
    const { open, onClose } = props;
    const handleClose = () => {
      onClose(true);
    };
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Update personal information</DialogTitle>
        <DialogContent>
          <DialogContentText> Enter a new name and email below.</DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="First name"
            type="text"
            defaultValue="{givenName}"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="Last name"
            type="text"
            defaultValue="{familyName}"
            fullWidth
          />
          <TextField margin="dense" id="name" label="New password" type="text" fullWidth />
          <TextField margin="dense" id="name" label="Confirm new password" type="text" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleClose();
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          marginTop: 2,
          padding: 0,
          width: 60,
          height: 60,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" sx={{ width: 60, height: 60 }} />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={() => {
              handleClose();
              handleDialogOpen();
            }}
          >
            Edit Profile
          </Button>
        </Box>
        <Box sx={{ p: 2, pt: 0.25 }}>
          <Button fullWidth color="inherit" variant="outlined" href="/">
            Logout
          </Button>
        </Box>
      </MenuPopover>
      <SimpleDialog open={openDialog} onClose={handleDialogClose} />
    </>
  );
}
