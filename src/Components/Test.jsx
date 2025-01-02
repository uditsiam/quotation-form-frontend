import React, { useState } from 'react';
import { Form, Input, Select, Button, Table, Typography, Row, Col, Divider } from 'antd';
import { AutoComplete } from "antd";
import './QuotationForm.css'
//company name auto complete
const companyOptions = [
    //use API to list the values here
    { value: "Cal-Comp Electronics (Thailand) Public Company Limited" },
    { value: "WICE Logistics Public Company Limited" },
    { value: "Celestica (Thailand) Limited" },
];

//port auto complete
const portsOptions = [
    //use API to list the values here
    { value: "Port of Shanghai, China" },
    { value: "Port of Singapore, Singapore" },
    { value: "Port of Ningbo-Zhoushan, China" },
    { value: "Port of Shenzhen, China" },
    { value: "Port of Guangzhou, China" },
    { value: "Port of Busan, South Korea" },
    { value: "Port of Qingdao, China" },
    { value: "Port of Hong Kong, China" },
    { value: "Port of Tianjin, China" },
    { value: "Port of Jebel Ali, United Arab Emirates" },
    { value: "Port of Rotterdam, Netherlands" },
    { value: "Port of Klang, Malaysia" },
    { value: "Port of Antwerp, Belgium" },
    { value: "Port of Xiamen, China" },
    { value: "Port of Kaohsiung, Taiwan" },
    { value: "Port of Dalian, China" },
    { value: "Port of Los Angeles, United States" },
    { value: "Port of Hamburg, Germany" },
    { value: "Port of Tanjung Pelepas, Malaysia" },
    { value: "Port of Laem Chabang, Thailand" }
];
const Test = () => {
    const [form] = Form.useForm();

    const handleSave = () => {
        form.validateFields()
            .then(values => {
                console.log('Form Data:', values); // Form data as JSON
            })
            .catch(errorInfo => {
                console.error('Validation Failed:', errorInfo);
            });
    };

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={{
                companyName: '',
                contactPerson: '',
                'address-one': '',
                tel: '',
                email: '',
                incoterm: '',
                commodity: '',
                dimensions: {
                    width: '',
                    depth: '',
                    height: '',
                },
                weight: '',
            }}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Title level={4} id="customer-details-title" className="bg-[#2A388F] p-2 rounded text-white">
                        Customer Details
                    </Title>
                    <Form.Item
                        label="Company Name"
                        name="companyName"
                        rules={[{ required: true, message: 'Please enter the company name!' }]}
                    >
                        <AutoComplete
                            options={[
                                { value: 'Company A' },
                                { value: 'Company B' },
                            ]}
                            placeholder="try to type `company name`"
                            filterOption={(inputValue, option) =>
                                option?.value.toUpperCase().includes(inputValue.toUpperCase())
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        label="Attention"
                        name="contactPerson"
                        rules={[{ required: true, message: 'Please enter the contact person!' }]}
                    >
                        <Input placeholder="Enter contact person" />
                    </Form.Item>
                    <Form.Item
                        label="Address one"
                        name="address-one"
                        rules={[{ required: true, message: 'Please enter the address!' }]}
                    >
                        <Input placeholder="Enter address" />
                    </Form.Item>
                    <Form.Item
                        label="Tel"
                        name="tel"
                        rules={[{ required: true, message: 'Please enter the telephone!' }]}
                    >
                        <Input placeholder="Enter telephone number" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email!' },
                            { type: 'email', message: 'Please enter a valid email!' },
                        ]}
                    >
                        <Input placeholder="Enter email address" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Title level={4} id="other-details-title" className="bg-[#2A388F] p-2 rounded text-white">
                        Other Details
                    </Title>
                    <Form.Item
                        label="Incoterm"
                        name="incoterm"
                        rules={[{ required: true, message: 'Please select an incoterm!' }]}
                    >
                        <Select placeholder="Select an incoterm">
                            <Option value="FOB">FOB</Option>
                            <Option value="CIF">CIF</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Commodity"
                        name="commodity"
                        rules={[{ required: true, message: 'Please enter the commodity!' }]}
                    >
                        <Input placeholder="Enter commodity" />
                    </Form.Item>
                    <Form.Item
                        label="Dimensions (W x D x H)"
                        name="dimensions"
                        rules={[{ required: true, message: 'Please enter dimensions!' }]}
                    >
                        <Input.Group compact className="text-left">
                            <Input style={{ width: '30%' }} placeholder="Width" name="width" />
                            <Input style={{ width: '30%' }} placeholder="Depth" name="depth" />
                            <Input style={{ width: '30%' }} placeholder="Height" name="height" />
                        </Input.Group>
                    </Form.Item>
                    <Form.Item
                        label="Weight"
                        name="weight"
                        rules={[{ required: true, message: 'Please enter weight!' }]}
                    >
                        <Input placeholder="Enter weight" />
                    </Form.Item>
                </Col>
            </Row>
            <Button type="primary" onClick={handleSave}>
                Save
            </Button>
        </Form>
    );
};

export default Test;
