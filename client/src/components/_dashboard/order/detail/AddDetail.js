import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { SelectProduct } from './select';

export default function AddDetail({ order }) {
  const { details } = order;
  console.log(details);
  // const { onClose, open } = props;
  // const handleClose = () => {
  //   onClose(true);
  // };
  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };

  return (
    <Form
      name="dynamic_form_nest_item"
      onFinish={() => {
        onFinish();
        // handleClose();
      }}
      autoComplete="on"
    >
      <Form.List name="products">
        {(orders, { add, remove }) => (
          <>
            {orders.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'first']}
                  fieldKey={[fieldKey, 'first']}
                  rules={[{ required: true, message: 'Missing product name' }]}
                >
                  <SelectProduct />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'last']}
                  fieldKey={[fieldKey, 'last']}
                  rules={[{ required: true, message: 'Missing price' }]}
                >
                  <Input placeholder="price" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'first']}
                  fieldKey={[fieldKey, 'first']}
                  rules={[{ required: true, message: 'Missing product name' }]}
                >
                  <Input placeholder="Product Name" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
