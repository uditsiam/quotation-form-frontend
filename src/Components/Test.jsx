import React, { useState } from "react";
import { Form, Input, Select, Button, Row, Col, Typography, Table, AutoComplete } from "antd";
import jsPDF from "jspdf";
import './QuotationForm.css'

const { Title } = Typography;
const { Option } = Select;

const QuotationForm3 = () => {
  const [form] = Form.useForm();
  const [quotationData, setQuotationData] = useState({
    customerDetails: {
      companyName: "",
      attention: "",
      addressOne: "",
      addressTwo: "",
      tel: "",
      email: "",
    },
    otherDetails: {
      incoterm: "",
      commodity: "",
      dimensions: { width: "", depth: "", height: "" },
      weight: "",
      portOfLoading: "",
      portOfDischarge: "",
      placeOfLoading: "",
      placeOfDelivery: "",
    },
    freightCharges: [
      { key: "1", company: "OOCL", twentyFt: "", fortyFt: "", fortyFtHC: "", remark: "" },
      { key: "2", company: "KMTC", twentyFt: "", fortyFt: "", fortyFtHC: "", remark: "" },
      { key: "3", company: "ONE", twentyFt: "", fortyFt: "", fortyFtHC: "", remark: "" },
    ],
    doorDeliveryCharges: [
      { key: "1", company: "*Advance Freight", twentyFt: "", fortyFt: "", fortyFtHC: "", remark: "" },
      { key: "2", company: "*Alameda Corrdora", twentyFt: "", fortyFt: "", fortyFtHC: "", remark: "" },
      { key: "3", company: "*Arbrtrary", twentyFt: "", fortyFt: "", fortyFtHC: "", remark: "" },
    ],
    localCharges: [
      { key: "1", company: "*AMS", twentyFt: "", fortyFt: "", fortyFtHC: "", remark: "" },
      { key: "2", company: "*B/L", twentyFt: "", fortyFt: "", fortyFtHC: "", remark: "" },
      { key: "3", company: "*Surrendered B/L", twentyFt: "", fortyFt: "", fortyFtHC: "", remark: "" },
      { key: "4", company: "*Customs clearance", twentyFt: "", fortyFt: "", fortyFtHC: "", remark: "" },
      { key: "5", company: "*Transport", twentyFt: "", fortyFt: "", fortyFtHC: "", remark: "" },
      { key: "6", company: "*Transport2", twentyFt: "", fortyFt: "", fortyFtHC: "", remark: "" },
    ],
    customCharges: [
      { key: "1", company: "*CUSTOMS CLERANCE", twentyFt: "", fortyFt: "", fortyFtHC: "", remark: "" },
      { key: "2", company: "*TRANSPORT CHARGE", twentyFt: "", fortyFt: "", fortyFtHC: "", remark: "" },
      { key: "3", company: "*OTHER CHARGE", twentyFt: "", fortyFt: "", fortyFtHC: "", remark: "" },
    ],
  });

  const handleInputChange = (group, field, value) => {
    setQuotationData((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [field]: value,
      },
    }));
  };

  const handleTableChange = (group, key, field, value) => {
    setQuotationData((prev) => ({
      ...prev,
      [group]: prev[group].map((row) =>
        row.key === key ? { ...row, [field]: value } : row
      ),
    }));
  };

  const handleSavePDF = () => {
    const doc = new jsPDF();
    doc.setFont("Helvetica", "bold");
    doc.text("Quotation Data", 10, 10);
    doc.text(JSON.stringify(quotationData, null, 2), 10, 20);
    doc.save("quotation-data.pdf");
  };

  const handleSave = () => {
    console.log("Quotation Data JSON:", quotationData);
    alert("Quotation data saved! Check the console for JSON output.");
  };

  const renderInput = (label, group, field, type = "text", placeholder = "") => (
    <Form.Item label={label}>
      <Input
        type={type}
        value={quotationData[group][field]}
        onChange={(e) => handleInputChange(group, field, e.target.value)}
        placeholder={placeholder}
      />
    </Form.Item>
  );

  const renderTable = (title, group) => (
    <>
      <Title level={4}>{title}</Title>
      <Table
        dataSource={quotationData[group]}
        columns={[
          { title: "Description", dataIndex: "company", key: "company" },
          {
            title: "20'",
            dataIndex: "twentyFt",
            key: "twentyFt",
            render: (_, record) => (
              <Input
                type="number"
                value={record.twentyFt}
                onChange={(e) =>
                  handleTableChange(group, record.key, "twentyFt", e.target.value)
                }
              />
            ),
          },
          {
            title: "40'",
            dataIndex: "fortyFt",
            key: "fortyFt",
            render: (_, record) => (
              <Input
                type="number"
                value={record.fortyFt}
                onChange={(e) =>
                  handleTableChange(group, record.key, "fortyFt", e.target.value)
                }
              />
            ),
          },
          {
            title: "40'hc",
            dataIndex: "fortyFtHC",
            key: "fortyFtHC",
            render: (_, record) => (
              <Input
                type="number"
                value={record.fortyFtHC}
                onChange={(e) =>
                  handleTableChange(group, record.key, "fortyFtHC", e.target.value)
                }
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
                onChange={(e) =>
                  handleTableChange(group, record.key, "remark", e.target.value)
                }
              />
            ),
          },
        ]}
        pagination={false}
        rowKey="key"
      />
    </>
  );

  return (
    <div className="p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded shadow">
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              {renderInput("Company Name", "customerDetails", "companyName")}
              {renderInput("Attention", "customerDetails", "attention")}
              {renderInput("Address One", "customerDetails", "addressOne")}
              {renderInput("Address Two", "customerDetails", "addressTwo")}
              {renderInput("Tel", "customerDetails", "tel")}
              {renderInput("Email", "customerDetails", "email", "email")}
            </Col>
            <Col span={12}>
              {renderInput("Incoterm", "otherDetails", "incoterm")}
              {renderInput("Commodity", "otherDetails", "commodity")}
              <Form.Item label="Dimensions (W x D x H)">
                <Input.Group compact>
                  <Input
                    placeholder="Width"
                    value={quotationData.otherDetails.dimensions.width}
                    onChange={(e) =>
                      handleInputChange("otherDetails", "dimensions", {
                        ...quotationData.otherDetails.dimensions,
                        width: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Depth"
                    value={quotationData.otherDetails.dimensions.depth}
                    onChange={(e) =>
                      handleInputChange("otherDetails", "dimensions", {
                        ...quotationData.otherDetails.dimensions,
                        depth: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Height"
                    value={quotationData.otherDetails.dimensions.height}
                    onChange={(e) =>
                      handleInputChange("otherDetails", "dimensions", {
                        ...quotationData.otherDetails.dimensions,
                        height: e.target.value,
                      })
                    }
                  />
                </Input.Group>
              </Form.Item>
              {renderInput("Weight", "otherDetails", "weight", "number")}
              {renderInput("Port of Loading", "otherDetails", "portOfLoading")}
              {renderInput("Port of Discharge", "otherDetails", "portOfDischarge")}
              {renderInput("Place of Loading", "otherDetails", "placeOfLoading")}
              {renderInput("Place of Delivery", "otherDetails", "placeOfDelivery")}
            </Col>
          </Row>
          <Row>
            <Col span={24}>{renderTable("Freight Charges", "freightCharges")}</Col>
          </Row>
          <Row>
            <Col span={24}>{renderTable("Door Delivery Charges", "doorDeliveryCharges")}</Col>
          </Row>
          <Row>
            <Col span={24}>{renderTable("Local Charges", "localCharges")}</Col>
          </Row>
          <Row>
            <Col span={24}>{renderTable("Custom Charges", "customCharges")}</Col>
          </Row>
          <Row justify="center">
            <Col>
              <Button
                type="primary"
                size="large"
                onClick={handleSave}
                className="mt-4"
              >
                Save Data
              </Button>
              <Button
                type="default"
                size="large"
                onClick={handleSavePDF}
                className="mt-4 ml-2"
              >
                Save as PDF
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default QuotationForm3;
