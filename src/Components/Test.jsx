import React, { useState } from "react";
import { Form, Input, Select, Button, Row, Col, Typography, Table } from "antd";
import { AutoComplete } from "antd";

const { Title } = Typography;
const { Option } = Select;

const Test = () => {
  const [form] = Form.useForm();
  const [quotationData, setQuotationData] = useState({
    customerDetails: {},
    otherDetails: {},
    freightCharges: [],
    localCharges: [],
    doorDeliveryCharges: [],
    customCharges: [],
  });

  const currencies = ["USD", "EUR", "THB", "SGD", "CNY"];

  // Sample initial data
  const initialFreightCharges = [
    { key: "1", company: "OOCL", twentyFt: "", fortyFt: "", fortyFtHC: "", remark: "" },
    { key: "2", company: "KMTC", twentyFt: "", fortyFt: "", fortyFtHC: "", remark: "" },
  ];

  const initialLocalCharges = [
    { key: "1", company: "*AMS", twentyFt: "", fortyFt: "", fortyFtHC: "", remark: "" },
  ];

  const initialDoorDeliveryCharges = [
    { key: "1", company: "*Advance Freight", twentyFt: "", fortyFt: "", fortyFtHC: "", remark: "" },
  ];

  const initialCustomCharges = [
    { key: "1", company: "*Customs Clearance", twentyFt: "", fortyFt: "", fortyFtHC: "", remark: "" },
  ];

  const [freightCharges, setFreightCharges] = useState(initialFreightCharges);
  const [localCharges, setLocalCharges] = useState(initialLocalCharges);
  const [doorDeliveryCharges, setDoorDeliveryCharges] = useState(initialDoorDeliveryCharges);
  const [customCharges, setCustomCharges] = useState(initialCustomCharges);

  const handleInputChange = (fieldGroup, fieldName, value) => {
    setQuotationData((prev) => ({
      ...prev,
      [fieldGroup]: {
        ...prev[fieldGroup],
        [fieldName]: value,
      },
    }));
  };

  const handleTableChange = (setDataSource, key, field, value) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSave = () => {
    form.validateFields()
      .then((values) => {
        const finalData = {
          ...quotationData,
          formFields: values,
          freightCharges,
          localCharges,
          doorDeliveryCharges,
          customCharges,
        };
        console.log("Quotation Data JSON:", finalData);
        alert("Quotation data saved! Check the console for JSON output.");
      })
      .catch((errorInfo) => {
        console.error("Validation failed:", errorInfo);
      });
  };

  const renderTable = (dataSource, setDataSource, columns) => (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      bordered
    />
  );

  const chargeColumns = (setDataSource) => [
    { title: "Company", dataIndex: "company", key: "company" },
    {
      title: "20'",
      dataIndex: "twentyFt",
      key: "twentyFt",
      render: (_, record) => (
        <Input
          value={record.twentyFt}
          onChange={(e) => handleTableChange(setDataSource, record.key, "twentyFt", e.target.value)}
          placeholder="Enter amount"
        />
      ),
    },
    {
      title: "40'",
      dataIndex: "fortyFt",
      key: "fortyFt",
      render: (_, record) => (
        <Input
          value={record.fortyFt}
          onChange={(e) => handleTableChange(setDataSource, record.key, "fortyFt", e.target.value)}
          placeholder="Enter amount"
        />
      ),
    },
    {
      title: "40'HC",
      dataIndex: "fortyFtHC",
      key: "fortyFtHC",
      render: (_, record) => (
        <Input
          value={record.fortyFtHC}
          onChange={(e) => handleTableChange(setDataSource, record.key, "fortyFtHC", e.target.value)}
          placeholder="Enter amount"
        />
      ),
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
      render: (_, record) => (
        <Input
          value={record.remark}
          onChange={(e) => handleTableChange(setDataSource, record.key, "remark", e.target.value)}
          placeholder="Enter remark"
        />
      ),
    },
  ];

  return (
    <div className="p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded shadow">
        <Form
          form={form}
          layout="vertical"
          onValuesChange={(changedValues) => {
            const [field, value] = Object.entries(changedValues)[0];
            handleInputChange("formFields", field, value);
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Title level={4} className="bg-[#2A388F] text-white p-2 rounded">
                Customer Details
              </Title>
              <Form.Item
                label="Company Name"
                name="companyName"
                rules={[{ required: true, message: "Please enter the company name!" }]}
              >
                <AutoComplete
                  options={[{ value: "Example Company" }]}
                  placeholder="Type company name"
                />
              </Form.Item>
              <Form.Item
                label="Attention"
                name="contactPerson"
                rules={[{ required: true, message: "Please enter the contact person!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Title level={4} className="bg-[#2A388F] text-white p-2 rounded">
                Other Details
              </Title>
              <Form.Item
                label="Incoterm"
                name="incoterm"
                rules={[{ required: true, message: "Please select an incoterm!" }]}
              >
                <Select>
                  <Option value="FOB">FOB</Option>
                  <Option value="CIF">CIF</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Title level={4} className="bg-[#2A388F] text-white p-2 rounded">
            Freight Charges
          </Title>
          {renderTable(freightCharges, setFreightCharges, chargeColumns(setFreightCharges))}

          <Title level={4} className="bg-[#2A388F] text-white p-2 rounded">
            Local Charges
          </Title>
          {renderTable(localCharges, setLocalCharges, chargeColumns(setLocalCharges))}

          <Title level={4} className="bg-[#2A388F] text-white p-2 rounded">
            Door Delivery Charges
          </Title>
          {renderTable(doorDeliveryCharges, setDoorDeliveryCharges, chargeColumns(setDoorDeliveryCharges))}

          <Title level={4} className="bg-[#2A388F] text-white p-2 rounded">
            Custom & Transport Charges
          </Title>
          {renderTable(customCharges, setCustomCharges, chargeColumns(setCustomCharges))}

          <Row justify="center">
            <Col>
              <Button
                type="primary"
                size="large"
                onClick={handleSave}
                id="saveButton"
                className="mt-4"
              >
                Save Data
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Test;
