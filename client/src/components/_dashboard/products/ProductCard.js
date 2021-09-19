import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// import axios from '../commons/axios.js';
// material
import {
  Box,
  Card,
  Link,
  Typography,
  Stack,
  FormControlLabel,
  Switch,
  IconButton,
  Button,
  TextField
} from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import ColorizeIcon from '@material-ui/icons/Colorize';
import DeleteIcon from '@material-ui/icons/Delete';
import { styled } from '@material-ui/core/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------
ShopProductCard.propTypes = {
  product: PropTypes.object
};

// Product card function
export default function ShopProductCard({ product }) {
  const { name, cover, price, colors, status, priceSale, available } = product;
  // const {tag, name, available, description} = product;

  // Handle avaliability
  const [availability, setAvailability] = useState(false);
  const handleLabel = () => {
    if (availability === true) {
      setAvailability(false);
    } else {
      setAvailability(true);
    }
  };
  // const handleLabel = () => {
  //   if (available === true) {
  //     available = false;
  //     axios.post('/product/?tag=' + tag, { available: available}).then(response =>{
  //         if (response.data.success) {
  //           message.success('Product is not avaliable any more!');
  //         } else {
  //           message.error(response.data.error)
  //         }
  //     }).catch(error => {
  //         message.error("Update failed!")
  //     })
  //   } else {
  //     available = true;
  //     axios.post('/edit?tag=' + tag, { available: available}).then(response =>{
  //         if (response.data.success) {
  //           message.success('Product is avaliable now!');
  //         } else {
  //           message.error(response.data.error)
  //         }
  //     }).catch(error => {
  //         message.error("Update failed!")
  //     })
  //   }
  // };

  // Handle edit
  const [openEdit, setEditOpen] = useState(false);
  const handleEditOpen = () => {
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };
  // const [newName, setName] = useState('');
  // const [newDescription, setDescription] = useState('');
  // const submitUpdate= () => {
  //   axios.put('/product/?tag=' + tag, { name: newName, description: newDescription }).then(response =>{
  //     if (response.data.success){
  //         message.success("product updated success")
  //     } else {
  //         message.error(response.data.error)
  //     }
  //   })
  // }

  // Handle delete
  const [openDelete, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };
  // const submitDelete= () => {
  //   axios.delete('/product/?tag=' + tag).then(response =>{
  //     if (response.data.success){
  //         message.success("product delete success")
  //     } else {
  //         message.error(response.data.error)
  //     }
  //   })
  // }

  // Dialogs
  function EditDialog(props) {
    const { onClose, open } = props;
    const handleClose = () => {
      onClose(true);
    };
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Name"
            type="text"
            defaultValue={name}
            fullWidth
          />
          {/* onChange={(e) => setName(e.target.value)} */}
          <TextField
            margin="dense"
            id="name"
            label="Description"
            type="text"
            defaultValue="Default Value"
            fullWidth
          />
          {/* onChange={(e) => setDescription(e.target.value)} */}
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

  function DeleteDialog(props) {
    const { onClose, open } = props;
    const handleClose = () => {
      onClose(true);
    };
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">
          Are you sure you want to delete this product?
        </DialogTitle>
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
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={name} src="/static/product.png" />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <FormControlLabel
            control={<Switch checked={available} onChange={handleLabel} />}
            label="Available"
          />
          <IconButton
            aria-label="delete"
            sx={{
              zIndex: 9,
              bottom: 25,
              right: 50,
              position: 'absolute'
            }}
          >
            <ColorizeIcon onClick={handleEditOpen} />
          </IconButton>
          <IconButton
            aria-label="delete"
            sx={{
              zIndex: 9,
              bottom: 25,
              right: 16,
              position: 'absolute'
            }}
          >
            <DeleteIcon onClick={handleDeleteOpen} />
          </IconButton>
          <EditDialog open={openEdit} onClose={handleEditClose} />
          <DeleteDialog open={openDelete} onClose={handleDeleteClose} />
        </Stack>
      </Stack>
    </Card>
  );
}
