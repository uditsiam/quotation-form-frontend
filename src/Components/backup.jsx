import React, { useState } from 'react';
import { Form, Input, Select, Button, Table, Typography, Row, Col, Divider } from 'antd';
import { AutoComplete } from "antd";
import './QuotationForm.css'

import jsPDF from 'jspdf';

const { Title, Text } = Typography;
const { Option } = Select;


//company name auto complete
const companyOptions = [
    //use API to list the values here
    { value: "Cal-Comp Electronics (Thailand) Public Company Limited" },
    { value: "WICE Logistics Public Company Limited" },
    { value: "Celestica (Thailand) Limited" },
];

const QuotationForm3 = () => {
    const [form] = Form.useForm();

    //currency
    const [currency, setCurrency] = useState('USD');
    const [amount, setAmount] = useState('');

    const handleCurrencyChange = (value) => {
        setCurrency(value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    //pdf
    const handleSavePDF = () => {
        form.validateFields().then((values) => {
            const doc = new jsPDF();
            doc.setFont('Helvetica', 'bold');
            doc.text('Freight Form Details', 10, 10);

            Object.entries(values).forEach(([key, value], index) => {
                doc.text(`${key}: ${value}`, 10, 20 + index * 10);
            });

            doc.save('freight-form.pdf');
        });
    };

    // Sample data for the tables
    const columns = [
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: '20\'', dataIndex: 'twenty', key: 'twenty' },
        { title: '40\'', dataIndex: 'forty', key: 'forty' },
        { title: '40\'HC', dataIndex: 'fortyHC', key: 'fortyHC' },
        { title: 'Remark', dataIndex: 'remark', key: 'remark' },
    ];

    const data = [
        {
            key: '1',
            description: 'AMS',
            twenty: 'USD30/SET',
            forty: 'USD30/SET',
            fortyHC: 'USD30/SET',
            remark: 'Details here',
        },
        // Add more rows as needed
    ];

    return (
        <div className="p-8 bg-gray-50">
            <div className="max-w-7xl mx-auto bg-white p-6 rounded shadow">
                {/* <Title level={3} className="text-center text-blue-900">
                    Sea Freight Export Charge
                </Title> */}
                <Form form={form} layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Title level={4} className="text-white bg-white text-left p-2 pb-0 rounded">
                                WICE Logistics

                            </Title>
                            <img className='pb-2 pl-2' src="https://www.wice.co.th/wp-content/uploads/2017/04/wice-logo-2.png" alt="" width={70} />
                            <p className='text-left pl-2 pb-5'>88/8 Nonsi Rd, Chong Nonsi, Yan Nawa, Bangkok 10120</p>



                        </Col>


                        <Col span={12}>
                            <Title level={4} className="text-white bg-white text-left p-2 pl-0 rounded">
                                SEA EXPORT (FCL) QUOTATION
                            </Title>
                            <p className='text-left'>Quotation No: QT12345</p>

                            <div style={{ display: 'flex', justifyContent: 'space-between' }} className='pb-6'>
                                <p>Date: 26/01/22</p>
                                <p>Date: 31/01/22</p>
                            </div>
                        </Col>
                    </Row>
                    <hr className="h-[3px] bg-[#2A388F] mb-5" />


                    {/* Company and other details - modified */}
                    <Row gutter={16}>
                        <Col span={12}>
                            <Title level={4} id='customer-details-title' className="bg-[#2A388F] p-2 rounded text-white">
                                Customer Details
                            </Title>
                            <Form.Item
                                label="Company Name"
                                name="companyName"
                                rules={[{ required: true, message: 'Please enter the company name!' }]}
                            >
                                <AutoComplete

                                    options={companyOptions}
                                    placeholder="try to type `company name`"
                                    filterOption={(inputValue, option) =>
                                        option &&
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
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
                            {/* <Form.Item
                                label="Address two"
                                name="address-two"
                                rules={[{ required: true, message: 'Please enter the address two!' }]}
                            >
                                <Input placeholder="Enter address" />
                            </Form.Item> */}
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
                                rules={[{ required: true, message: 'Please enter your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
                            >
                                <Input placeholder="Enter email address" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Title level={4} id='other-details-title' className="bg-[#2A388F] p-2 rounded text-white">
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
                                <Input.Group compact className='text-left'>
                                    <Input style={{ width: '30%' }} placeholder="Enter Width" />
                                    <Input style={{ width: '30%' }} placeholder="Enter Depth" />
                                    <Input style={{ width: '30%' }} placeholder="Enter Height" />
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
                    <hr className="h-[3px] bg-[#2A388F] mb-5" />

                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 id='sea-freight-charges-title' className="text-left text-xl font-bold text-[#2A388F] mb-4 bg-[#2A388F]"> Sea Freight Export Charge </h2>
                            <p className='text-left pl-2'>Sea Export to Jakata, Indonesia</p>
                        </Col>

                        <Col span={12}>


                            <Form.Item
                                label="Port of loading"
                                name="companyName"
                                rules={[{ required: true, message: 'Please enter the company name!' }]}
                            >
                                <AutoComplete

                                    options={companyOptions}
                                    placeholder="try to type `company name`"
                                    filterOption={(inputValue, option) =>
                                        option &&
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />
                            </Form.Item>

                            <Form.Item
                                label="Place of loading"
                                name="companyName"
                                rules={[{ required: true, message: 'Please enter the company name!' }]}
                            >
                                <AutoComplete

                                    options={companyOptions}
                                    placeholder="try to type `company name`"
                                    filterOption={(inputValue, option) =>
                                        option &&
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>


                            <Form.Item
                                label="Port of Discharge"
                                name="companyName"
                                rules={[{ required: true, message: 'Please enter the company name!' }]}
                            >
                                <AutoComplete

                                    options={companyOptions}
                                    placeholder="try to type `company name`"
                                    filterOption={(inputValue, option) =>
                                        option &&
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />
                            </Form.Item>

                            <Form.Item
                                label="Port of Delivery"
                                name="companyName"
                                rules={[{ required: true, message: 'Please enter the company name!' }]}
                            >
                                <AutoComplete

                                    options={companyOptions}
                                    placeholder="try to type `company name`"
                                    filterOption={(inputValue, option) =>
                                        option &&
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Freight charges */}
                    <Row gutter={16}>
                        <Col span={4.8}>
                            <p className="text-black bg-white text-left p-2 pb-0 rounded"><b>Frieght Charge(Container)</b></p>
                            <p className='text-left pl-2'>OOCL</p>
                            <p className='text-left pl-2'>KMTC</p>
                            <p className='text-left pl-2'>ONE</p>
                        </Col>

                        {/* 20' column */}
                        <Col span={4.8}>
                            <p className="text-black bg-white text-left p-2 pb-0 rounded">
                                <b>20'</b>
                            </p>
                            {/* 20' OOCL amount */}

                            <Row gutter={8} align="middle">
                                <Col className='mb-1'>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>
                            {/* 20' KMTC amount */}

                            <Row gutter={8} align="middle">
                                <Col className='mb-1'>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>

                            {/* 20' ONE amount */}

                            <Row gutter={8} align="middle">
                                <Col>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>

                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>
                        </Col>

                        {/* 40' column */}
                        <Col span={4.8}>
                            <p className="text-black bg-white text-left p-2 pb-0 rounded">
                                <b>40'</b>
                            </p>
                            {/* 40' OOCL amount */}

                            <Row gutter={8} align="middle">
                                <Col className='mb-1'>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>
                            {/* 40' KMTC amount */}

                            <Row gutter={8} align="middle">
                                <Col className='mb-1'>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>

                            {/* 40' ONE amount */}

                            <Row gutter={8} align="middle">
                                <Col>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>

                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>
                        </Col>

                        {/* 40' hc */}
                        <Col span={4.8}>
                            <p className="text-black bg-white text-left p-2 pb-0 rounded">
                                <b>40'hc</b>
                            </p>
                            {/* 20' OOCL amount */}

                            <Row gutter={8} align="middle">
                                <Col className='mb-1'>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>
                            {/* 20' KMTC amount */}

                            <Row gutter={8} align="middle">
                                <Col className='mb-1'>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>

                            {/* 20' ONE amount */}

                            <Row gutter={8} align="middle">
                                <Col>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>

                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>
                        </Col>

                        {/* remark */}
                        <Col span={4.8}>
                            <p className="text-black bg-white text-left p-2 pb-0 rounded"><b>Remark</b></p>
                            <p className='text-left pl-2'>Cut Off:Fri/Wed, ETD:Wed/Fri, T/T(Days):11</p>
                            <p className='text-left pl-2'>Cut Off:Fri/Wed, ETD:Wed/Fri, T/T(Days):11</p>
                            <p className='text-left pl-2'>Cut Off:Fri/Wed, ETD:Wed/Fri, T/T(Days):11</p>
                        </Col>
                    </Row>

                    {/* Door Delivery charges */}
                    <Row gutter={16}>
                        <Col span={4.8}>
                            <p className="text-black bg-white text-left p-2 pb-0 rounded"><b>Door Delivery Charges</b></p>
                            <p className='text-left pl-2'>Advance Freight</p>
                            <p className='text-left pl-2'>Alameda Corrdor</p>
                            <p className='text-left pl-2'>Arbrtrary</p>
                        </Col>

                        {/* 20' column */}
                        <Col span={4.8}>
                            <p className="text-black bg-white text-left p-2 pb-0 rounded">
                                <b>20'</b>
                            </p>
                            {/* 20' OOCL amount */}

                            <Row gutter={8} align="middle">
                                <Col className='mb-1'>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>
                            {/* 20' KMTC amount */}

                            <Row gutter={8} align="middle">
                                <Col className='mb-1'>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>

                            {/* 20' ONE amount */}

                            <Row gutter={8} align="middle">
                                <Col>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>

                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>
                        </Col>

                        {/* 40' column */}
                        <Col span={4.8}>
                            <p className="text-black bg-white text-left p-2 pb-0 rounded">
                                <b>40'</b>
                            </p>
                            {/* 40' OOCL amount */}

                            <Row gutter={8} align="middle">
                                <Col className='mb-1'>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>
                            {/* 40' KMTC amount */}

                            <Row gutter={8} align="middle">
                                <Col className='mb-1'>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>

                            {/* 40' ONE amount */}

                            <Row gutter={8} align="middle">
                                <Col>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>

                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>
                        </Col>

                        {/* 40' hc */}
                        <Col span={4.8}>
                            <p className="text-black bg-white text-left p-2 pb-0 rounded">
                                <b>40'hc</b>
                            </p>
                            {/* 20' OOCL amount */}

                            <Row gutter={8} align="middle">
                                <Col className='mb-1'>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>
                            {/* 20' KMTC amount */}

                            <Row gutter={8} align="middle">
                                <Col className='mb-1'>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>

                            {/* 20' ONE amount */}

                            <Row gutter={8} align="middle">
                                <Col>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>

                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>
                        </Col>

                        {/* remark */}
                        <Col span={4.8}>
                            <p className="text-black bg-white text-left p-2 pb-0 rounded"><b>Remark</b></p>
                            <p className='text-left pl-2'>Cut Off:Fri/Wed, ETD:Wed/Fri, T/T(Days):11</p>
                            <p className='text-left pl-2'>Cut Off:Fri/Wed, ETD:Wed/Fri, T/T(Days):11</p>
                            <p className='text-left pl-2'>Cut Off:Fri/Wed, ETD:Wed/Fri, T/T(Days):11</p>
                        </Col>

                    </Row>

                    {/* Local Charges */}
                    <Row gutter={16}>
                        <Col span={24}>
                        <h2 id='local-charges-title' className="text-left text-xl font-bold text-[#2A388F] mb-4 mt-4 bg-[#1A2067]">Local Charge</h2>
                        </Col>
                        <Col span={4.8}>
                            <p className="text-black bg-white text-left p-2 pb-0 rounded"><b style={{color: 'white'}}>-</b></p>
                            <p className='text-left pl-2'>*AMS</p>
                            <p className='text-left pl-2'>*B/L</p>
                            <p className='text-left pl-2'>*Surrendered B/L</p>
                            <p className='text-left pl-2'>*Customs clearance</p>
                            <p className='text-left pl-2'>*Transport</p>
                            <p className='text-left pl-2'>*Transport</p>
                        </Col>

                        {/* 20' column */}
                        <Col span={4.8}>
                            <p className="text-black bg-white text-left p-2 pb-0 rounded">
                                <b>20'</b>
                            </p>
                            {/* 20' OOCL amount */}

                            <Row gutter={8} align="middle">
                                <Col className='mb-1'>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>
                            {/* 20' KMTC amount */}

                            <Row gutter={8} align="middle">
                                <Col className='mb-1'>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>

                            {/* 20' ONE amount */}

                            <Row gutter={8} align="middle">
                                <Col>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>

                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>

                            <Row gutter={8} align="middle">
                                <Col>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>

                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>

                            <Row gutter={8} align="middle">
                                <Col>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>

                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>

                            <Row gutter={8} align="middle">
                                <Col>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>

                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>
                        </Col>

                        {/* 40' column */}
                        <Col span={4.8}>
                            <p className="text-black bg-white text-left p-2 pb-0 rounded">
                                <b>40'</b>
                            </p>
                            {/* 40' OOCL amount */}

                            <Row gutter={8} align="middle">
                                <Col className='mb-1'>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>
                            {/* 40' KMTC amount */}

                            <Row gutter={8} align="middle">
                                <Col className='mb-1'>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>

                            {/* 40' ONE amount */}

                            <Row gutter={8} align="middle">
                                <Col>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>

                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>

                            <Row gutter={8} align="middle">
                                <Col>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>

                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>

                            <Row gutter={8} align="middle">
                                <Col>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>

                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>

                            <Row gutter={8} align="middle">
                                <Col>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>

                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>
                        </Col>

                        {/* 40' hc */}
                        <Col span={4.8}>
                            <p className="text-black bg-white text-left p-2 pb-0 rounded">
                                <b>40'hc</b>
                            </p>
                            {/* 20' OOCL amount */}

                            <Row gutter={8} align="middle">
                                <Col className='mb-1'>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>
                            {/* 20' KMTC amount */}

                            <Row gutter={8} align="middle">
                                <Col className='mb-1'>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>

                            {/* 20' ONE amount */}

                            <Row gutter={8} align="middle">
                                <Col>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>

                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>

                            <Row gutter={8} align="middle">
                                <Col>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>

                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>

                            <Row gutter={8} align="middle">
                                <Col>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>

                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>

                            <Row gutter={8} align="middle">
                                <Col>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>

                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>
                        </Col>


                    </Row>

                    {/* Custom & Transport Charges */}
                    <Row gutter={16}>
                        <Col span={24}>
                        <h2 id='local-charges-title' className="text-left text-xl font-bold text-[#2A388F] mb-4 mt-4 bg-[#1A2067]">Custom & Transport</h2>
                        </Col>
                        <Col span={4.8}>
                            <p className="text-black bg-white text-left p-2 pb-0 rounded"><b style={{color: 'white'}}>-</b></p>
                            <p className='text-left pl-2'>*CUSTOMS CLERANCE </p>
                            <p className='text-left pl-2'>*TRANSPORT CHARGE </p>
                            <p className='text-left pl-2'>*OTHER CHARGE</p>
                         
                        </Col>

                        {/* 20' column */}
                        <Col span={4.8}>
                            <p className="text-black bg-white text-left p-2 pb-0 rounded">
                                <b>20'</b>
                            </p>
                            {/* 20' OOCL amount */}

                            <Row gutter={8} align="middle">
                                <Col className='mb-1'>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>
                            {/* 20' KMTC amount */}

                            <Row gutter={8} align="middle">
                                <Col className='mb-1'>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>

                            {/* 20' ONE amount */}

                            <Row gutter={8} align="middle">
                                <Col>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>

                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>

                            
                        </Col>

                        {/* 40' column */}
                        <Col span={4.8}>
                            <p className="text-black bg-white text-left p-2 pb-0 rounded">
                                <b>40'</b>
                            </p>
                            {/* 40' OOCL amount */}

                            <Row gutter={8} align="middle">
                                <Col className='mb-1'>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>
                            {/* 40' KMTC amount */}

                            <Row gutter={8} align="middle">
                                <Col className='mb-1'>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>

                            {/* 40' ONE amount */}

                            <Row gutter={8} align="middle">
                                <Col>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>

                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>

                           
                        </Col>

                        {/* 40' hc */}
                        <Col span={4.8}>
                            <p className="text-black bg-white text-left p-2 pb-0 rounded">
                                <b>40'hc</b>
                            </p>
                            {/* 20' OOCL amount */}

                            <Row gutter={8} align="middle">
                                <Col className='mb-1'>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>
                            {/* 20' KMTC amount */}

                            <Row gutter={8} align="middle">
                                <Col className='mb-1'>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>

                            {/* 20' ONE amount */}

                            <Row gutter={8} align="middle">
                                <Col>
                                    <Input
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Enter amount"
                                        style={{ width: 100 }}
                                    />
                                </Col>

                                <Col>
                                    <Select
                                        defaultValue={currency}
                                        onChange={handleCurrencyChange}
                                        style={{ width: 70 }}
                                    >
                                        <Option value="NOK">NOK</Option>
                                        <Option value="NZD">NZD</Option>
                                        <Option value="JPY">JPY</Option>
                                        <Option value="SGD">SGD</Option>
                                        <Option value="THB">THB</Option>
                                        <Option value="FJD">FJD</Option>
                                        <Option value="USD">USD</Option>
                                        <Option value="RMB">RMB</Option>
                                        <Option value="EUR">EUR</Option>
                                        <Option value="HKD">HKD</Option>
                                        <Option value="AUD">AUD</Option>
                                        <Option value="MYR">MYR</Option>
                                        <Option value="GBP">GBP</Option>
                                        <Option value="CHF">CHF</Option>
                                        <Option value="CNY">CNY</Option>
                                    </Select>
                                </Col>
                            </Row>

                           

                           

                            
                        </Col>


                    </Row>
                </Form>
            </div>
        </div>
    );
};

export default QuotationForm3;
