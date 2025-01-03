import React, { useState } from 'react';
import { Form, Input, Select, Button, Table, Typography, Row, Col, Divider } from 'antd';
import { AutoComplete } from "antd";
import './QuotationForm.css'

import jsPDF from 'jspdf';

const { Title, Text } = Typography;
const { Option } = Select;

//new table design custom CSS


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

    //new table design
    const [dataSource, setDataSource] = useState([
        { key: "1", company: "OOCL", twentyFt: "", twentyFtCurrency: "USD", fortyFt: "", fortyFtCurrency: "USD", fortyFtHC: "", fortyFtHCCurrency: "USD", remark: "" },
        { key: "2", company: "KMTC", twentyFt: "", twentyFtCurrency: "USD", fortyFt: "", fortyFtCurrency: "USD", fortyFtHC: "", fortyFtHCCurrency: "USD", remark: "" },
        { key: "3", company: "ONE", twentyFt: "", twentyFtCurrency: "USD", fortyFt: "", fortyFtCurrency: "USD", fortyFtHC: "", fortyFtHCCurrency: "USD", remark: "" },
    ]);

    const currencies = ["NOK", "NZD", "JPY", "SGD", "THB", "FJD", "USD", "RMB", "EUR", "HKD", "AUD", "MYR", "GBP", "CHF", "CNY"];

    const freightChargesColumns = [
        {
            title: "Freight Charge (Container)",
            dataIndex: "company",
            key: "company",
        },
        {
            title: "20'",
            dataIndex: "twentyFt",
            key: "twentyFt",
            render: (_, record) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Input
                        value={record.twentyFt}
                        onChange={(e) => handleInputChange(record.key, "twentyFt", e.target.value)}
                        placeholder="Enter amount"
                    />
                    <Select
                        value={record.twentyFtCurrency}
                        onChange={(value) => handleInputChange(record.key, "twentyFtCurrency", value)}
                        style={{ width: 80 }}
                    >
                        {currencies.map((currency) => (
                            <Option key={currency} value={currency}>
                                {currency}
                            </Option>
                        ))}
                    </Select>
                </div>
            ),
        },
        {
            title: "40'",
            dataIndex: "fortyFt",
            key: "fortyFt",
            render: (_, record) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Input
                        value={record.fortyFt}
                        onChange={(e) => handleInputChange(record.key, "fortyFt", e.target.value)}
                        placeholder="Enter amount"
                    />
                    <Select
                        value={record.fortyFtCurrency}
                        onChange={(value) => handleInputChange(record.key, "fortyFtCurrency", value)}
                        style={{ width: 80 }}
                    >
                        {currencies.map((currency) => (
                            <Option key={currency} value={currency}>
                                {currency}
                            </Option>
                        ))}
                    </Select>
                </div>
            ),
        },
        {
            title: "40'hc",
            dataIndex: "fortyFtHC",
            key: "fortyFtHC",
            render: (_, record) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Input
                        value={record.fortyFtHC}
                        onChange={(e) => handleInputChange(record.key, "fortyFtHC", e.target.value)}
                        placeholder="Enter amount"
                    />
                    <Select
                        value={record.fortyFtHCCurrency}
                        onChange={(value) => handleInputChange(record.key, "fortyFtHCCurrency", value)}
                        style={{ width: 80 }}
                    >
                        {currencies.map((currency) => (
                            <Option key={currency} value={currency}>
                                {currency}
                            </Option>
                        ))}
                    </Select>
                </div>
            ),
        },
        {
            title: "Remark",
            dataIndex: "remark",
            key: "remark",
            render: (_, record) => (
                <Input
                    value={record.remark}
                    onChange={(e) => handleInputChange(record.key, "remark", e.target.value)}
                    placeholder="Enter remark"
                />
            ),
        },
    ];
    //new table design end

    //new local charges
    const [localChargesdataSource, setLocalChargesDataSource] = useState([
        { key: "1", company: "*AMS", twentyFt: "", twentyFtCurrency: "USD", fortyFt: "", fortyFtCurrency: "USD", fortyFtHC: "", fortyFtHCCurrency: "USD", remark: "" },
        { key: "2", company: "*B/L", twentyFt: "", twentyFtCurrency: "USD", fortyFt: "", fortyFtCurrency: "USD", fortyFtHC: "", fortyFtHCCurrency: "USD", remark: "" },
        { key: "3", company: "*Surrendered B/L", twentyFt: "", twentyFtCurrency: "USD", fortyFt: "", fortyFtCurrency: "USD", fortyFtHC: "", fortyFtHCCurrency: "USD", remark: "" },
        { key: "3", company: "*Customs clearance", twentyFt: "", twentyFtCurrency: "USD", fortyFt: "", fortyFtCurrency: "USD", fortyFtHC: "", fortyFtHCCurrency: "USD", remark: "" },
        { key: "3", company: "*Transport", twentyFt: "", twentyFtCurrency: "USD", fortyFt: "", fortyFtCurrency: "USD", fortyFtHC: "", fortyFtHCCurrency: "USD", remark: "" },
        { key: "3", company: "*Transport2", twentyFt: "", twentyFtCurrency: "USD", fortyFt: "", fortyFtCurrency: "USD", fortyFtHC: "", fortyFtHCCurrency: "USD", remark: "" },
    ]);

    const localChargesCurrencies = ["NOK", "NZD", "JPY", "SGD", "THB", "FJD", "USD", "RMB", "EUR", "HKD", "AUD", "MYR", "GBP", "CHF", "CNY"];

    const localChargesColumns = [
        {
            title: "Local Charges",
            dataIndex: "company",
            key: "company",
        },
        {
            title: "20'",
            dataIndex: "twentyFt",
            key: "twentyFt",
            render: (_, record) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Input
                        value={record.twentyFt}
                        onChange={(e) => handleInputChange(record.key, "twentyFt", e.target.value)}
                        placeholder="Enter amount"
                    />
                    <Select
                        value={record.twentyFtCurrency}
                        onChange={(value) => handleInputChange(record.key, "twentyFtCurrency", value)}
                        style={{ width: 80 }}
                    >
                        {localChargesCurrencies.map((currency) => (
                            <Option key={currency} value={currency}>
                                {currency}
                            </Option>
                        ))}
                    </Select>
                </div>
            ),
        },
        {
            title: "40'",
            dataIndex: "fortyFt",
            key: "fortyFt",
            render: (_, record) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Input
                        value={record.fortyFt}
                        onChange={(e) => handleInputChange(record.key, "fortyFt", e.target.value)}
                        placeholder="Enter amount"
                    />
                    <Select
                        value={record.fortyFtCurrency}
                        onChange={(value) => handleInputChange(record.key, "fortyFtCurrency", value)}
                        style={{ width: 80 }}
                    >
                        {currencies.map((currency) => (
                            <Option key={currency} value={currency}>
                                {currency}
                            </Option>
                        ))}
                    </Select>
                </div>
            ),
        },
        {
            title: "40'hc",
            dataIndex: "fortyFtHC",
            key: "fortyFtHC",
            render: (_, record) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Input
                        value={record.fortyFtHC}
                        onChange={(e) => handleInputChange(record.key, "fortyFtHC", e.target.value)}
                        placeholder="Enter amount"
                    />
                    <Select
                        value={record.fortyFtHCCurrency}
                        onChange={(value) => handleInputChange(record.key, "fortyFtHCCurrency", value)}
                        style={{ width: 80 }}
                    >
                        {currencies.map((currency) => (
                            <Option key={currency} value={currency}>
                                {currency}
                            </Option>
                        ))}
                    </Select>
                </div>
            ),
        },
        {
            title: "Remark",
            dataIndex: "remark",
            key: "remark",
            render: (_, record) => (
                <Input
                    value={record.remark}
                    onChange={(e) => handleInputChange(record.key, "remark", e.target.value)}
                    placeholder="Enter remark"
                />
            ),
        },
    ];
    //new local charges end


    //new door delivery charges
    const [doorDeliveryDataSource, setDoorDeliveryDataSource] = useState([
        { key: "1", company: "*Advance Freight", twentyFt: "", twentyFtCurrency: "USD", fortyFt: "", fortyFtCurrency: "USD", fortyFtHC: "", fortyFtHCCurrency: "USD", remark: "" },
        { key: "2", company: "*Alameda Corrdor", twentyFt: "", twentyFtCurrency: "USD", fortyFt: "", fortyFtCurrency: "USD", fortyFtHC: "", fortyFtHCCurrency: "USD", remark: "" },
        { key: "3", company: "*Arbrtrary", twentyFt: "", twentyFtCurrency: "USD", fortyFt: "", fortyFtCurrency: "USD", fortyFtHC: "", fortyFtHCCurrency: "USD", remark: "" },

    ]);

    const doorDeliveryCurrencies = ["NOK", "NZD", "JPY", "SGD", "THB", "FJD", "USD", "RMB", "EUR", "HKD", "AUD", "MYR", "GBP", "CHF", "CNY"];

    const doorDeliveryColumns = [
        {
            title: "Door Delivery Charge",
            dataIndex: "company",
            key: "company",
        },
        {
            title: "20'",
            dataIndex: "twentyFt",
            key: "twentyFt",
            render: (_, record) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Input
                        value={record.twentyFt}
                        onChange={(e) => handleInputChange(record.key, "twentyFt", e.target.value)}
                        placeholder="Enter amount"
                    />
                    <Select
                        value={record.twentyFtCurrency}
                        onChange={(value) => handleInputChange(record.key, "twentyFtCurrency", value)}
                        style={{ width: 80 }}
                    >
                        {doorDeliveryCurrencies.map((currency) => (
                            <Option key={currency} value={currency}>
                                {currency}
                            </Option>
                        ))}
                    </Select>
                </div>
            ),
        },
        {
            title: "40'",
            dataIndex: "fortyFt",
            key: "fortyFt",
            render: (_, record) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Input
                        value={record.fortyFt}
                        onChange={(e) => handleInputChange(record.key, "fortyFt", e.target.value)}
                        placeholder="Enter amount"
                    />
                    <Select
                        value={record.fortyFtCurrency}
                        onChange={(value) => handleInputChange(record.key, "fortyFtCurrency", value)}
                        style={{ width: 80 }}
                    >
                        {currencies.map((currency) => (
                            <Option key={currency} value={currency}>
                                {currency}
                            </Option>
                        ))}
                    </Select>
                </div>
            ),
        },
        {
            title: "40'hc",
            dataIndex: "fortyFtHC",
            key: "fortyFtHC",
            render: (_, record) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Input
                        value={record.fortyFtHC}
                        onChange={(e) => handleInputChange(record.key, "fortyFtHC", e.target.value)}
                        placeholder="Enter amount"
                    />
                    <Select
                        value={record.fortyFtHCCurrency}
                        onChange={(value) => handleInputChange(record.key, "fortyFtHCCurrency", value)}
                        style={{ width: 80 }}
                    >
                        {currencies.map((currency) => (
                            <Option key={currency} value={currency}>
                                {currency}
                            </Option>
                        ))}
                    </Select>
                </div>
            ),
        },
        {
            title: "Remark",
            dataIndex: "remark",
            key: "remark",
            render: (_, record) => (
                <Input
                    value={record.remark}
                    onChange={(e) => handleInputChange(record.key, "remark", e.target.value)}
                    placeholder="Enter remark"
                />
            ),
        },
    ];
    //new door delivery charges end


    //new custom and transport charges
    const [customDataSource, setCustomDataSource] = useState([
        { key: "1", company: "*CUSTOMS CLERANCE ", twentyFt: "", twentyFtCurrency: "USD", fortyFt: "", fortyFtCurrency: "USD", fortyFtHC: "", fortyFtHCCurrency: "USD", remark: "" },
        { key: "2", company: "*TRANSPORT CHARGE ", twentyFt: "", twentyFtCurrency: "USD", fortyFt: "", fortyFtCurrency: "USD", fortyFtHC: "", fortyFtHCCurrency: "USD", remark: "" },
        { key: "3", company: "*OTHER CHARGE", twentyFt: "", twentyFtCurrency: "USD", fortyFt: "", fortyFtCurrency: "USD", fortyFtHC: "", fortyFtHCCurrency: "USD", remark: "" },

    ]);

    const customCurrencies = ["NOK", "NZD", "JPY", "SGD", "THB", "FJD", "USD", "RMB", "EUR", "HKD", "AUD", "MYR", "GBP", "CHF", "CNY"];

    const customColumns = [
        {
            title: "Custom & Transport Charge",
            dataIndex: "company",
            key: "company",
        },
        {
            title: "20'",
            dataIndex: "twentyFt",
            key: "twentyFt",
            render: (_, record) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Input
                        value={record.twentyFt}
                        onChange={(e) => handleInputChange(record.key, "twentyFt", e.target.value)}
                        placeholder="Enter amount"
                    />
                    <Select
                        value={record.twentyFtCurrency}
                        onChange={(value) => handleInputChange(record.key, "twentyFtCurrency", value)}
                        style={{ width: 80 }}
                    >
                        {customCurrencies.map((currency) => (
                            <Option key={currency} value={currency}>
                                {currency}
                            </Option>
                        ))}
                    </Select>
                </div>
            ),
        },
        {
            title: "40'",
            dataIndex: "fortyFt",
            key: "fortyFt",
            render: (_, record) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Input
                        value={record.fortyFt}
                        onChange={(e) => handleInputChange(record.key, "fortyFt", e.target.value)}
                        placeholder="Enter amount"
                    />
                    <Select
                        value={record.fortyFtCurrency}
                        onChange={(value) => handleInputChange(record.key, "fortyFtCurrency", value)}
                        style={{ width: 80 }}
                    >
                        {currencies.map((currency) => (
                            <Option key={currency} value={currency}>
                                {currency}
                            </Option>
                        ))}
                    </Select>
                </div>
            ),
        },
        {
            title: "40'hc",
            dataIndex: "fortyFtHC",
            key: "fortyFtHC",
            render: (_, record) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Input
                        value={record.fortyFtHC}
                        onChange={(e) => handleInputChange(record.key, "fortyFtHC", e.target.value)}
                        placeholder="Enter amount"
                    />
                    <Select
                        value={record.fortyFtHCCurrency}
                        onChange={(value) => handleInputChange(record.key, "fortyFtHCCurrency", value)}
                        style={{ width: 80 }}
                    >
                        {currencies.map((currency) => (
                            <Option key={currency} value={currency}>
                                {currency}
                            </Option>
                        ))}
                    </Select>
                </div>
            ),
        },
        {
            title: "Remark",
            dataIndex: "remark",
            key: "remark",
            render: (_, record) => (
                <Input
                    value={record.remark}
                    onChange={(e) => handleInputChange(record.key, "remark", e.target.value)}
                    placeholder="Enter remark"
                />
            ),
        },
    ];
    //new custom and transport charges end
    const handleInputChange = (key, field, value) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => key === item.key);
        if (index !== -1) {
            newData[index][field] = value;
            setDataSource(newData);
        }
    };


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
                                <p>Validity Peroid: 31/01/22</p>
                            </div>
                        </Col>
                    </Row>
                    <hr className="h-[3px] bg-[#2A388F] mb-5" />


                    {/* Company and other details - modified */}
                    {/* SECTION 1 STARTS HERE       */}
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
                    {/* SECTION 1 ENDS HERE       */}

                    
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
                                rules={[{ required: true, message: 'Please enter the port of loading!' }]}
                            >
                                <AutoComplete

                                    options={portsOptions}
                                    placeholder="try to type `port name`"
                                    filterOption={(inputValue, option) =>
                                        option &&
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />
                            </Form.Item>

                            <Form.Item
                                label="Place of loading"
                                name="companyName"
                                rules={[{ required: true, message: 'Please enter the port of loading!' }]}
                            >
                                <AutoComplete

                                    options={portsOptions}
                                    placeholder="try to type `place name`"
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
                                rules={[{ required: true, message: 'Please enter the port of discharge!' }]}
                            >
                                <AutoComplete

                                    options={companyOptions}
                                    placeholder="try to type `port name`"
                                    filterOption={(inputValue, option) =>
                                        option &&
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />
                            </Form.Item>

                            <Form.Item
                                label="Place of Delivery"
                                name="companyName"
                                rules={[{ required: true, message: 'Please enter the place of delivery!' }]}
                            >
                                <AutoComplete

                                    options={portsOptions}
                                    placeholder="try to type `port name`"
                                    filterOption={(inputValue, option) =>
                                        option &&
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Freight charges */}
                    <Row gutter={[16, 16]} className="flex justify-center">
                        <div className="overflow-auto w-full">
                            <Table
                                dataSource={dataSource}
                                columns={freightChargesColumns}
                                pagination={false}
                                className="min-w-[600px] md:min-w-[800px] lg:min-w-[1000px] customTable"
                                scroll={{ x: "max-content" }}
                                bordered
                            />
                        </div>
                    </Row>

                    {/* Door Delivery charges */}
                    <Row gutter={[16, 16]} className="flex justify-center">
                        <div className="overflow-auto w-full">
                            <Table
                                dataSource={doorDeliveryDataSource}
                                columns={doorDeliveryColumns}
                                pagination={false}
                                className="min-w-[600px] md:min-w-[800px] lg:min-w-[1000px] customTable"
                                scroll={{ x: "max-content" }}
                                bordered
                            />
                        </div>
                    </Row>

                    {/* Local Charges */}
                    <Row gutter={[16, 16]} className="flex justify-center">
                        <Col span={24}>
                            <h2 id='local-charges-title' className="text-left text-xl font-bold text-[#2A388F] mb-0 mt-4 bg-[#1A2067]">Local Charge</h2>
                        </Col>
                        <div className="overflow-auto w-full">
                            <Table
                                dataSource={localChargesdataSource}
                                columns={localChargesColumns}
                                pagination={false}
                                className="min-w-[600px] md:min-w-[800px] lg:min-w-[1000px] customTable"
                                scroll={{ x: "max-content" }}
                                bordered
                            />
                        </div>
                    </Row>

                    {/* Custom & Transport Charges */}
                    <Row gutter={[16, 16]} className="flex justify-center">
                        <Col span={24}>
                            <h2 id='local-charges-title' className="text-left text-xl font-bold text-[#2A388F] mb-0 mt-4 bg-[#1A2067]">Custom & Transport</h2>
                        </Col>
                        <div className="overflow-auto w-full">
                            <Table
                                dataSource={customDataSource}
                                columns={customColumns}
                                pagination={false}
                                className="min-w-[600px] md:min-w-[800px] lg:min-w-[1000px] customTable"
                                scroll={{ x: "max-content" }}
                                bordered
                            />
                        </div>
                    </Row>

                    {/*Section 3: Conditions and Sign*/}
                    <div className="bg-white p-6 rounded shadow-md mt-6">
                        <h3 className="text-lg font-bold text-[#2A388F] mb-4">
                            CONDITIONS :
                        </h3>
                        <ul
                            className="text-sm mb-4 list-disc pl-6"
                            style={{ textAlign: "left" }}
                        >
                            <li>All above charges are exclusive of Insurance, Courier fee.</li>
                            <li>
                                All above charges are subject to change local charges by shipping
                                line.
                            </li>
                            <li>Applicable to general commercial cargo only.</li>
                            <li>All above charges are subject to Extra work at cost.</li>
                            <li>All above charges are subject to VAT 7%.</li>
                        </ul>
                        <h3 className="text-lg font-bold text-[#2A388F] mb-4">
                            Term & Condition (Freight, Local charge, Customs clearance,
                            Transportation)
                        </h3>
                        <div className="text-sm" style={{ textAlign: "left" }}>
                            <p>
                                <strong>Credit Term:</strong> 30 Days
                            </p>
                            <p>
                                <strong>Billing Acceptance:</strong> Payment :-
                            </p>
                            <p>
                                <strong>Term & Condition (Import duty & Tax)</strong>
                            </p>
                            <p>
                                <strong>Credit Term:</strong> -
                            </p>
                            <p>
                                <strong>Limited Amount:</strong> -
                            </p>
                            <p>
                                <strong>Credit Line Limit:</strong> -
                            </p>
                            <p>
                                <strong>Weekly Statement:</strong> -
                            </p>
                            <p>
                                <strong>Payment:</strong> -
                            </p>
                        </div>
                        <p className="mt-4 text-sm">
                            If you accept our quotation purpose, would you please sign your
                            signature for approval and send us back accordingly.
                        </p>
                        <p className="mt-6 font-bold">Thanks and best regards,</p>
                        <div className="mt-6">
                            <p className="font-bold">WICE Logistics Public Company Limited</p>
                            <div className="mt-4">
                                {/* <label
                htmlFor="digital-signature"
                className="block text-sm font-medium text-gray-700"
              >
                Digital Signature
              </label> */}
                                <div className="border border-gray-300 rounded-md mt-2 w-full h-24 bg-gray-100 flex items-center justify-center">
                                    <p className="text-gray-400">Sign here...</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <p className="font-bold">Alliance Laundry (Thailand) Co., Ltd.</p>
                            <div className="border border-gray-300 rounded-md mt-2 w-full h-24 bg-gray-100 flex items-center justify-center">
                                <p className="text-gray-400">Sign here...</p>
                            </div>
                        </div>
                    </div>
                    <Row justify="center" gutter={16}>
                        <Col>
                            <button
                            id='saveButton'
                                className="bg-[#ED1C24] mt-5 text-white text-center px-6 py-3 rounded-md"
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                Save & Print
                            </button>
                        </Col>
                    </Row>

                </Form>
            </div>
        </div>
    );
};

export default QuotationForm3;