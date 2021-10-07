import { Icon } from '@iconify/react';

import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import 'antd/dist/antd.css';

import editFill from '@iconify/icons-eva/edit-fill';
// import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';

import { Form, Space, InputNumber, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import NativeSelect from '@material-ui/core/NativeSelect';

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
import { ProductSort } from '../products';
// import { AddDetail } from './detail';

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
        <DialogContent>
          <AddDetail order={order} />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Go Back
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

  function AddDetail(props) {
    const navigate = useNavigate();
    const { Option } = Select;
    const [products, setProducts] = useState([]);

    const [form] = Form.useForm();

    const onFinish = (values) => {
      console.log('Received values of form:', values.product);
      axios
        .put(
          `/order/update/${_id}`,
          { cart: JSON.stringify(values.product) },
          // { name: values.name, price: values.price, quantity: values.quantity },
          { headers: { Authorization: `Bearer ${Cookies.get('token')}` } }
        )
        .then((response) => {
          if (response.status === 200) {
            console.log('order info is updated');
          } else {
            console.log('order info update fail');
          }
        })
        .catch(() => {
          console.log('update fail');
        });
    };

    const handleChange = () => {
      form.setFieldsValue({ products: [] });
    };

    // Get all orders
    useEffect(() => {
      if (Cookies.get('token')) {
        axios
          .get('/product/available', {
            headers: { Authorization: `Bearer ${Cookies.get('token')}` }
          })
          .then((response) => {
            if (response.status === 200) {
              setProducts(response.data);
            }
          })
          .catch(() => {
            console.log('get products failed');
          });
      } else {
        navigate('/404', { replace: true });
      }
      console.log(products);
    }, []);

    return (
      <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
        <Form.List name="product">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space key={field.key} align="baseline">
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, curValues) =>
                      prevValues.price !== curValues.price ||
                      prevValues.product !== curValues.product ||
                      prevValues.quantity !== curValues.quantity
                    }
                  >
                    {() => (
                      <Form.Item
                        {...field}
                        label="product"
                        name={[field.name, 'name']}
                        fieldKey={[field.fieldKey, 'name']}
                        rules={[{ required: true, message: 'Missing product' }]}
                      >
                        <NativeSelect label="product" defaultValue="">
                          <option> </option>
                          {products.map((item) => (
                            <option value={item.name}>{item.name}</option>
                          ))}
                        </NativeSelect>
                      </Form.Item>
                    )}
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="Price"
                    name={[field.name, 'price']}
                    fieldKey={[field.fieldKey, 'price']}
                    rules={[{ required: true, message: 'Missing price' }]}
                  >
                    <InputNumber />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="quantity"
                    name={[field.name, 'quantity']}
                    fieldKey={[field.fieldKey, 'quantity']}
                    rules={[{ required: true, message: 'Missing quantity' }]}
                  >
                    <InputNumber />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}

              <Form.Item>
                <div style={{ textAlign: 'center' }}>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add product
                  </Button>
                </div>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form.Item>
      </Form>
    );
  }

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
