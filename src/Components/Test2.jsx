import React, { useState } from "react";
import { Form, Input, Select, Button, Row, Col, Typography, Table, AutoComplete } from "antd";

const { Title } = Typography;
const { Option } = Select;

const Test2 = () => {
  const [form] = Form.useForm();
  const [quotationData, setQuotationData] = useState({
    customerDetails: {},
    otherDetails: {},
    freightCharges: [],
    localCharges: [],
    doorDeliveryCharges: [],
    customCharges: [],
  });

  // Handles input changes for grouped fields
  const handleInputChange = (fieldGroup, key, fieldName, value) => {
    setQuotationData((prev) => {
      if (Array.isArray(prev[fieldGroup])) {
        const updatedGroup = prev[fieldGroup].map((item) =>
          item.key === key ? { ...item, [fieldName]: value } : item
        );
        return { ...prev, [fieldGroup]: updatedGroup };
      }
      return {
        ...prev,
        [fieldGroup]: {
          ...prev[fieldGroup],
          [fieldName]: value,
        },
      };
    });
  };

  // Table columns configuration for different charges
  const tableColumns = (fieldGroup, currencies) => [
    {
      title: "Description",
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
            onChange={(e) => handleInputChange(fieldGroup, record.key, "twentyFt", e.target.value)}
          />
          <Select
            value={record.twentyFtCurrency}
            onChange={(value) => handleInputChange(fieldGroup, record.key, "twentyFtCurrency", value)}
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
            onChange={(e) => handleInputChange(fieldGroup, record.key, "fortyFt", e.target.value)}
          />
          <Select
            value={record.fortyFtCurrency}
            onChange={(value) => handleInputChange(fieldGroup, record.key, "fortyFtCurrency", value)}
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
            onChange={(e) => handleInputChange(fieldGroup, record.key, "fortyFtHC", e.target.value)}
          />
          <Select
            value={record.fortyFtHCCurrency}
            onChange={(value) => handleInputChange(fieldGroup, record.key, "fortyFtHCCurrency", value)}
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
          onChange={(e) => handleInputChange(fieldGroup, record.key, "remark", e.target.value)}
        />
      ),
    },
  ];

  // Table data sources
  const currencies = ["USD", "EUR", "THB", "JPY", "AUD"];

  // Sample table data
  const freightChargesData = [
    { key: "1", company: "OOCL", twentyFt: "", twentyFtCurrency: "USD", fortyFt: "", fortyFtCurrency: "USD", fortyFtHC: "", fortyFtHCCurrency: "USD", remark: "" },
  ];
  const localChargesData = [
    { key: "1", company: "Customs Clearance", twentyFt: "", twentyFtCurrency: "USD", fortyFt: "", fortyFtCurrency: "USD", fortyFtHC: "", fortyFtHCCurrency: "USD", remark: "" },
  ];

  const handleSave = () => {
    form.validateFields()
      .then((values) => {
        console.log("Quotation Data JSON:", {
          ...quotationData,
          formFields: values,
        });
        alert("Quotation data saved! Check the console for JSON output.");
      })
      .catch((errorInfo) => {
        console.error("Validation failed:", errorInfo);
      });
  };

  return (
    <div className="p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded shadow">
        <Form
          form={form}
          layout="vertical"
          onValuesChange={(changedValues) => {
            const [field, value] = Object.entries(changedValues)[0];
            handleInputChange("formFields", null, field, value);
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

          <Row>
            <Col span={24}>
              <Title level={4} className="bg-[#2A388F] text-white p-2 rounded">
                Freight Charges
              </Title>
              <Table
                dataSource={freightChargesData}
                columns={tableColumns("freightCharges", currencies)}
                pagination={false}
              />
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Title level={4} className="bg-[#2A388F] text-white p-2 rounded">
                Local Charges
              </Title>
              <Table
                dataSource={localChargesData}
                columns={tableColumns("localCharges", currencies)}
                pagination={false}
              />
            </Col>
          </Row>

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

export default Test2;
