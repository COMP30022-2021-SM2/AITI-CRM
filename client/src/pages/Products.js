// import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import axios from '../commons/axios.js';
// material
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Stack,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Switch
} from '@material-ui/core';
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
export default function EcommerceShop(props) {
  // const formik = useFormik({
  //   initialValues: {
  //     gender: '',
  //     category: '',
  //     colors: '',
  //     priceRange: '',
  //     rating: ''
  //   }
  // });

  // // Get all products when render this page
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   axios.get('/product').then(response => {
  //     setProducts(response.data.products)
  //   })
  // },[]);

  const [open, setOpen] = useState(false);
  const handleInsertOpen = () => {
    setOpen(true);
  };
  const handleInsertClose = () => {
    setOpen(false);
  };
  // const [newName, setName] = useState('');
  // const [newDescription, setDescription] = useState('');
  // const submitUpdate= () => {
  //   axios.post('/product', { name: newName, description: newDescription }).then(response =>{
  //     if (response.data.success){
  //         message.success("product updated success")
  //     } else {
  //         message.error(response.data.error)
  //     }
  //   })
  // }

  function InsertDialog(props) {
    const { onClose, open } = props;
    const handleClose = () => {
      onClose(true);
    };
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Add New Product</DialogTitle>
        <DialogContent>
          <img src="/static/product.png" alt="product cover" height={350} width={400} />
          <DialogContentText> Enter details of your new product delow. </DialogContentText>
          <TextField autoFocus margin="dense" id="name" label="Name" type="text" fullWidth />
          <TextField margin="dense" id="name" label="Description" type="text" fullWidth />
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

  return (
    <Page title="Dashboard: Products">
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
            onClick={handleInsertOpen}
          >
            New Product
          </Button>
          <InsertDialog open={open} onClose={handleInsertClose} />
        </Stack>
        <ProductList products={PRODUCTS} />
      </Container>
    </Page>
  );
}
