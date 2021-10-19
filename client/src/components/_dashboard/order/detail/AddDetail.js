import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import 'antd/dist/antd.css';

import { Form, Button, Space, InputNumber, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import NativeSelect from '@material-ui/core/NativeSelect';
import Cookies from 'js-cookie';
import axios from '../../../../commons/axios';

export default function AddDetail({ order }) {
  const { details, _id } = order;
  console.log(order);
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
          window.location.reload(false);
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

  // Get all products
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
                      <NativeSelect>
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
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add product
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}
