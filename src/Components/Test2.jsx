import React, { useState } from "react";
import { Form, Input, Select, Button, Row, Col, Typography, Table, AutoComplete } from "antd";
import jsPDF from "jspdf";

const { Title } = Typography;
const { Option } = Select;

const Test2 = () => {
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

  return (
    <div className="p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded shadow">
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Title level={4} className="text-blue-600 mb-4">Customer Details</Title>
              <Form.Item label="Company Name" name="companyName" rules={[{ required: true }]}> 
                <Input placeholder="Enter company name" value={quotationData.customerDetails.companyName} onChange={(e) => handleInputChange('customerDetails','companyName',e.target.value)}/>
              </Form.Item>
              <Form.Item label="Attention" name="attention" rules={[{ required: true }]}> 
                <Input placeholder="Enter attention" value={quotationData.customerDetails.attention} onChange={(e) => handleInputChange('customerDetails','attention',e.target.value)}/>
              </Form.Item>
              <Form.Item label="Address One" name="addressOne" rules={[{ required: true }]}> 
                <Input placeholder="Enter address one" value={quotationData.customerDetails.addressOne} onChange={(e) => handleInputChange('customerDetails','addressOne',e.target.value)}/>
              </Form.Item>
              <Form.Item label="Address Two" name="addressTwo"> 
                <Input placeholder="Enter address two" value={quotationData.customerDetails.addressTwo} onChange={(e) => handleInputChange('customerDetails','addressTwo',e.target.value)}/>
              </Form.Item>
              <Form.Item label="Tel" name="tel" rules={[{ required: true }]}> 
                <Input placeholder="Enter telephone" value={quotationData.customerDetails.tel} onChange={(e) => handleInputChange('customerDetails','tel',e.target.value)}/>
              </Form.Item>
              <Form.Item label="Email" name="email" rules={[{ required: true }, { type: 'email' }]}> 
                <Input placeholder="Enter email" value={quotationData.customerDetails.email} onChange={(e) => handleInputChange('customerDetails','email',e.target.value)}/>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Title level={4} className="text-blue-600 mb-4">Other Details</Title>
              <Form.Item label="Incoterm" name="incoterm" rules={[{ required: true }]}> 
                <Select
                  placeholder="Select incoterm"
                  value={quotationData.otherDetails.incoterm}
                  onChange={(value) => handleInputChange('otherDetails','incoterm',value)}
                >
                  <Option value="FOB">FOB</Option>
                  <Option value="CIF">CIF</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Commodity" name="commodity" rules={[{ required: true }]}> 
                <Input placeholder="Enter commodity" value={quotationData.otherDetails.commodity} onChange={(e) => handleInputChange('otherDetails','commodity',e.target.value)}/>
              </Form.Item>
              <Form.Item label="Dimensions (W x D x H)" name="dimensions"> 
                <Input.Group compact>
                  <Input
                    placeholder="Width"
                    value={quotationData.otherDetails.dimensions.width}
                    onChange={(e) => handleInputChange('otherDetails', 'dimensions', { ...quotationData.otherDetails.dimensions, width: e.target.value })}
                    style={{ width: '33%' }}
                  />
                  <Input
                    placeholder="Depth"
                    value={quotationData.otherDetails.dimensions.depth}
                    onChange={(e) => handleInputChange('otherDetails', 'dimensions', { ...quotationData.otherDetails.dimensions, depth: e.target.value })}
                    style={{ width: '33%' }}
                  />
                  <Input
                    placeholder="Height"
                    value={quotationData.otherDetails.dimensions.height}
                    onChange={(e) => handleInputChange('otherDetails', 'dimensions', { ...quotationData.otherDetails.dimensions, height: e.target.value })}
                    style={{ width: '33%' }}
                  />
                </Input.Group>
              </Form.Item>
              <Form.Item label="Weight" name="weight" rules={[{ required: true }]}> 
                <Input placeholder="Enter weight" value={quotationData.otherDetails.weight} onChange={(e) => handleInputChange('otherDetails','weight',e.target.value)}/>
              </Form.Item>
              <Form.Item label="Port of Loading" name="portOfLoading" rules={[{ required: true }]}> 
                <Input placeholder="Enter port of loading" value={quotationData.otherDetails.portOfLoading} onChange={(e) => handleInputChange('otherDetails','portOfLoading',e.target.value)}/>
              </Form.Item>
              <Form.Item label="Port of Discharge" name="portOfDischarge" rules={[{ required: true }]}> 
                <Input placeholder="Enter port of discharge" value={quotationData.otherDetails.portOfDischarge} onChange={(e) => handleInputChange('otherDetails','portOfDischarge',e.target.value)}/>
              </Form.Item>
              <Form.Item label="Place of Loading" name="placeOfLoading"> 
                <Input placeholder="Enter place of loading" value={quotationData.otherDetails.placeOfLoading} onChange={(e) => handleInputChange('otherDetails','placeOfLoading',e.target.value)}/>
              </Form.Item>
              <Form.Item label="Place of Delivery" name="placeOfDelivery"> 
                <Input placeholder="Enter place of delivery" value={quotationData.otherDetails.placeOfDelivery} onChange={(e) => handleInputChange('otherDetails','placeOfDelivery',e.target.value)}/>
              </Form.Item>
            </Col>
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

export default Test2;
