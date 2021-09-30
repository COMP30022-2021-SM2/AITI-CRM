import { useRef, useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import { alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Box,
  Divider,
  Typography,
  Avatar,
  IconButton,
  TextField,
  InputAdornment
} from '@material-ui/core';
// components
import { Navigate } from 'react-router';
import Cookies from 'js-cookie';
import axios from '../../commons/axios';
import MenuPopover from '../../components/MenuPopover';
//
import account from '../../_mocks_/account';
// import { negate } from 'lodash';

// ----------------------------------------------------------------------
export default function AccountPopover() {
  // const { givenName, familyName, emailAddress, password } = user;
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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

  const [givenName, setGivenName] = useState();
  const [familyName, setFamilyName] = useState();
  const [email, setEmail] = useState();

  const [newGivenName, setNewGivenName] = useState('');
  const [newFamilyName, setNewFamilyName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setConfirmPassword] = useState('');

  // Get user information
  useEffect(() => {
    if (Cookies.get('token')) {
      // console.log('success');
      // console.log(Cookies.get('token'));
      // console.log(Cookies.get('userId'));
      axios
        .get('/profile', {
          headers: { Authorization: `Bearer ${Cookies.get('token')}` }
        })
        .then((response) => {
          if (response.status === 200) {
            // console.log('get user success');
            // console.log(response);
            setGivenName(response.data.user.givenName);
            setFamilyName(response.data.user.familyName);
            setEmail(response.data.user.emailAddress);
          }
        })
        .catch((error) => {
          console.log('cant get user info');
        });
      setNewGivenName();
      setNewFamilyName();
      setNewPassword();
      setConfirmPassword();
    } else {
      navigate('/404', { replace: true });
    }
  }, []);

  // Update profile
  const submitUpdate = () => {
    if (newPassword !== '' && newConfirmPassword !== '') {
      axios
        .put('/profile', {
          givenName: newGivenName,
          familyName: newFamilyName,
          password: newPassword,
          confirmPassword: newConfirmPassword
        })
        .then((response) => {
          if (response.data.success) {
            console.log('profile update success');
          } else {
            console.log('profile update fail');
          }
        })
        .catch((error) => {
          alert('Profile update failed!');
        });
    } else {
      console.log(newGivenName);
      console.log(newFamilyName);
      axios
        .put('/profile', {
          givenName: newGivenName,
          familyName: newFamilyName
        })
        .then((response) => {
          if (response.data.success) {
            console.log('profile update success');
          } else {
            console.log('profile update fail');
          }
        })
        .catch((error) => {
          alert('Profile update failed!');
        });
    }
  };

  // Logout
  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/', { replace: true });
  };

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
            {/* {account.displayName} */}
            {givenName}
            {familyName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {/* {account.email} */}
            {email}
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
          <Button fullWidth color="inherit" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </MenuPopover>
      {/* <SimpleDialog open={openDialog} onClose={handleDialogClose} /> */}
      <Dialog onClose={handleDialogClose} aria-labelledby="simple-dialog-title" open={openDialog}>
        <DialogTitle id="simple-dialog-title">Update personal information</DialogTitle>
        <DialogContent>
          <DialogContentText> Enter a new name below.</DialogContentText>
          <TextField
            margin="dense"
            label="First name"
            type="text"
            defaultValue={givenName}
            value={givenName}
            onChange={(e) => setNewGivenName(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Last name"
            type="text"
            defaultValue={familyName}
            value={familyName}
            onChange={(e) => setNewFamilyName(e.target.value)}
            fullWidth
          />
          <DialogContentText>
            Skip following if you don't want to change your password.
          </DialogContentText>
          <TextField
            margin="dense"
            label="New password"
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            margin="dense"
            label="Confirm new password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              submitUpdate();
              handleDialogClose();
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
