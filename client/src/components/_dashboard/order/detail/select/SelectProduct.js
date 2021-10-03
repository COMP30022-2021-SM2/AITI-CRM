import React from 'react';
import 'antd/dist/antd.css';
import { Select } from 'antd';

export default function SelectProduct() {
  const { Option } = Select;

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    <>
      <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>

        <Option value="Yiminghe">yiminghe</Option>
      </Select>
    </>
  );
}
