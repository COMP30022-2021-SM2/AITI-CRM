import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { Icon } from '@iconify/react';
// import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { sentenceCase } from 'change-case';
import { filter } from 'lodash';
import {
  Card,
  Table,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Grid,
  Button,
  Container,
  Stack,
  Typography,
  Modal
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
// components
import { bgcolor } from '@material-ui/system';
import TextField from '@material-ui/core/TextField';
import Moment from 'react-moment';
import Cookies from 'js-cookie';
import axios from '../commons/axios';
import Page from '../components/Page';
import { OrderListToolBar, OrderListHead, OrderMoreMenu } from '../components/_dashboard/order';

// components
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';

//
import USERLIST from '../_mocks_/user';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  // { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

// sorting table related functions
const TABLE_HEAD = [
  { id: 'name', label: 'Customer Name', alignRight: false },

  // { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Total Deal Amount', alignRight: false },
  { id: 'status', label: 'Order Status', alignRight: false },
  { id: 'details', label: 'Last Updated', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.customerId.givenName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

function SimpleDialog(props) {
  const { onClose, open } = props;
  const handleClose = () => {
    onClose(true);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Adding a new order...</DialogTitle>
      <DialogContent>
        <DialogContentText>Please enter the details of your new order below. </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Customer Email Address"
          type="text"
          fullWidth
        />
        <TextField margin="dense" id="name" label="Product Name" type="text" fullWidth />
        <TextField margin="dense" id="name" label="Product Price" type="text" fullWidth />
        <TextField margin="dense" id="name" label="Product quantity" type="text" fullWidth />
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

export default function Order() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  // Get all orders
  useEffect(() => {
    if (Cookies.get('token')) {
      axios
        .get('/order', {
          headers: { Authorization: `Bearer ${Cookies.get('token')}` }
        })
        .then((response) => {
          if (response.status === 200) {
            console.log('recieved the orders from backend!');
            setOrders(response.data);
          }
        })
        .catch(() => {
          console.log('get orders failed');
        });
    } else {
      navigate('/404', { replace: true });
    }
    // console.log(orders.length);
    // console.log(orders);
  }, [navigate]);

  // // input textbox related function
  // const [value, setValue] = React.useState('');

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = orders.map((n) => n._id);
      setSelected(newSelecteds);
      console.log(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    console.log(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

  const filteredUsers = applySortFilter(orders, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Dashboard: Order">
      <Container>
        <Stack direction="row" algnItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h3">Order</Typography>
          {/* <Button
            variant="contained"
            onClick={handleClickOpen}
            startIcon={<Icon icon={plusFill} />}
          >
            New Order
          </Button> */}
        </Stack>
        <SimpleDialog open={open} onClose={handleClose} />
        <div> </div>

        {/* <Stack mb={5} direction="row" alignItems="right" justifyContent="space-between">
          <OrderPostsSearch posts={POSTS} />
          <OrderPostsSort options={SORT_OPTIONS} />
        </Stack> */}
        {orders.length > 0 ? (
          <Card>
            <OrderListToolBar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
              orderids={selected}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <OrderListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={orders.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        const { updateTime, customerId, total, status, details } = row;
                        const isItemSelected = selected.indexOf(row._id) !== -1;

                        return (
                          <TableRow
                            hover
                            key={customerId.givenName}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, row._id)}
                              />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="normal">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography variant="subtitle2" noWrap>
                                  {customerId.givenName}
                                </Typography>
                              </Stack>
                            </TableCell>
                            {/* <TableCell align="left">{company}</TableCell> */}
                            {/* <TableCell align="left">{role}</TableCell> */}
                            <TableCell align="left">{total}</TableCell>
                            <TableCell align="left">
                              <Label
                                variant="ghost"
                                color={
                                  (status === 'ongoing' && 'error') ||
                                  (status === 'cancelled' && 'error') ||
                                  'success'
                                }
                              >
                                {sentenceCase(status)}
                              </Label>
                            </TableCell>
                            <TableCell align="left">
                              <Moment format="dddd DD.MM.YYYY HH:mm">{updateTime}</Moment>{' '}
                            </TableCell>

                            <TableCell align="right">
                              <OrderMoreMenu order={row} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        ) : (
          <div style={{ textAlign: 'center' }}>
            It's loading... or currently you've got no orders
          </div>
        )}
      </Container>
    </Page>
  );
}
