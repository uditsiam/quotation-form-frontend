import React, { useState } from 'react';
import { Form, Input, Select, Button, Typography, Row, Col, Collapse, Divider } from 'antd';
import jsPDF from 'jspdf';

const { Title } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

const Test2 = () => {
    const [form] = Form.useForm();
    const [seaFreightCharges, setSeaFreightCharges] = useState([{ id: 1 }]);

    const addNewRoute = () => {
        setSeaFreightCharges([...seaFreightCharges, { id: seaFreightCharges.length + 1 }]);
    };

    const handleSave = () => {
        form.validateFields().then((values) => {
            const jsonData = JSON.stringify(values, null, 2);
            console.log(jsonData); // Save the JSON data as needed

            const doc = new jsPDF();
            doc.text('Quotation Details', 10, 10);
            doc.text(jsonData, 10, 20);
            doc.save('quotation.pdf');
        });
    };

    const renderSeaFreightChargeAccordion = (id) => (
        <Collapse defaultActiveKey={['1']} className="mb-4">
            <Panel header={`Sea Freight Export Charge - Route ${id}`} key="1">
                <Collapse>
                    <Panel header="Freight Charge" key="freight">
                        {/* Freight Charge Content */}
                        <p>Freight charge details...</p>
                    </Panel>
                    <Panel header="Door Delivery Charge" key="door-delivery">
                        {/* Door Delivery Charge Content */}
                        <p>Door delivery details...</p>
                    </Panel>
                    <Panel header="Local Charge" key="local">
                        {/* Local Charge Content */}
                        <p>Local charge details...</p>
                    </Panel>
                    <Panel header="Custom & Transport Charge" key="custom">
                        {/* Custom & Transport Charge Content */}
                        <p>Custom and transport charge details...</p>
                    </Panel>
                </Collapse>
            </Panel>
        </Collapse>
    );

    return (
        <div className="p-8 bg-gray-50">
            <div className="max-w-7xl mx-auto bg-white p-6 rounded shadow">
                <Form form={form} layout="vertical">
                    {/* Customer Details */}
                    <Row gutter={16}>
                        <Col span={12}>
                            <Title level={4}>Customer Details</Title>
                            <Form.Item
                                label="Company Name"
                                name="companyName"
                                rules={[{ required: true, message: 'Please enter the company name!' }]}
                            >
                                <Input placeholder="Enter company name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Title level={4}>Other Details</Title>
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
                        </Col>
                    </Row>

                    <Divider />

                    {/* Sea Freight Export Charges */}
                    <Title level={4}>Sea Freight Export Charges</Title>
                    {seaFreightCharges.map((route) => (
                        <div key={route.id}>{renderSeaFreightChargeAccordion(route.id)}</div>
                    ))}
                    <Button type="dashed" onClick={addNewRoute} block className="mb-4">
                        Create Another Route
                    </Button>

                    <Divider />

                    <Button type="primary" onClick={handleSave} block>
                        Save & Print
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Test2;
