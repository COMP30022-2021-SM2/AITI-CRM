// import { useFormik } from 'formik';
import { useState } from 'react';
import PropTypes from 'prop-types';
// material
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Stack, Typography, Button, TextField } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

// components
import Page from '../components/Page';
import { ProductList } from '../components/_dashboard/products';
//
import PRODUCTS from '../_mocks_/products';

// ----------------------------------------------------------------------

function SimpleDialog(props) {
  const { onClose, open } = props;
  const handleClose = () => {
    onClose(true);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Add New Product</DialogTitle>
      <DialogContent>
        <DialogContentText> nter details of your new product delow. </DialogContentText>
        <TextField autoFocus margin="dense" id="name" label="Product Name" type="text" fullWidth />
        <TextField margin="dense" id="name" label="Product Price" type="text" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default function EcommerceShop() {
  // const formik = useFormik({
  //   initialValues: {
  //     gender: '',
  //     category: '',
  //     colors: '',
  //     priceRange: '',
  //     rating: ''
  //   }
  // });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Page title="Dashboard: Products | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Products
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
            onClick={handleClickOpen}
          >
            New Product
          </Button>
          <SimpleDialog open={open} onClose={handleClose} />
        </Stack>
        <ProductList products={PRODUCTS} />
      </Container>
    </Page>
  );
}
