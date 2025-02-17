import React, { useState } from "react";
import { Table, Input, Select, Button, Form } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

const DoorDeliveryCharges = () => {
    //done
    const [doorDeliveryDataSource, setDoorDeliveryDataSource] = useState([
        {
            key: "1",
            company: ["*Advance Freight", "*Alameda Corrdor", "*Arbrtrary"],
            twentyFt: "",
            twentyFtCurrency: "USD",
            fortyFt: "",
            fortyFtCurrency: "USD",
            fortyFtHC: "",
            fortyFtHCCurrency: "USD",
            remark: "",
        },
    ]);

    //done
    const [doorDeliveryChargesOptions, setDoorDeliveryChargesOptions] = useState([
        "*Advance Freight",
        "*Alameda Corrdor",
        "*Arbrtrary",
    ]);

    //done
    const doorDeliveryCurrencies = [
        "NOK", "NZD", "JPY", "SGD", "THB", "FJD", "USD", "RMB", "EUR", "HKD", "AUD", "MYR", "GBP", "CHF", "CNY",
    ];

    //done
    const handleDoorDeliveryChargesNewRow = () => {
        const newRow = {
            key: (doorDeliveryDataSource.length + 1).toString(),
            company: [],
            twentyFt: "",
            twentyFtCurrency: "USD",
            fortyFt: "",
            fortyFtCurrency: "USD",
            fortyFtHC: "",
            fortyFtHCCurrency: "USD",
            remark: "",
        };
        setDoorDeliveryDataSource([...doorDeliveryDataSource, newRow]);
    };

    //done
    const handleAddDoorDeliveryChargesOptions = (newCompany) => {
        if (newCompany && !doorDeliveryChargesOptions.includes(newCompany)) {
            setDoorDeliveryChargesOptions((prev) => [...prev, newCompany]);
        }
    };

    //done
    const handleDoorDeliveryRowDelete = (key) => {
        setDoorDeliveryDataSource((prevData) => prevData.filter((item) => item.key !== key));
    };

    //done
    const doorDeliveryColumns = [
        {
            title: "Door Delivery Charge",
            dataIndex: "company",
            key: "company",
            render: (_, record, index) => (
                <Form.Item
                    name={["data", index, "company"]}
                    initialValue={record.company}
                    rules={[{ required: true, message: "Please select a company" }]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Select or Add Company"
                        showArrow
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                                <div style={{ display: "flex", padding: 8 }}>
                                    <Input
                                        placeholder="Add new company"
                                        onPressEnter={(e) => {
                                            const newCompany = e.target.value.trim();
                                            if (newCompany) {
                                                handleAddDoorDeliveryChargesOptions(newCompany);
                                                e.target.value = "";
                                            }
                                        }}
                                        style={{ flex: "auto" }}
                                    />
                                </div>
                            </>
                        )}
                        style={{ width: "100%" }}
                    >
                        {doorDeliveryChargesOptions.map((company) => (
                            <Option key={company} value={company}>
                                {company}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            ),
        },
        {
            title: "20'",
            dataIndex: "twentyFt",
            key: "twentyFt",
            render: (_, record, index) => (
                <Form.Item
                    name={["data", index, "twentyFt"]}
                    initialValue={record.twentyFt}
                >
                    <Input placeholder="Enter Amount" />
                </Form.Item>
            ),
        },
        {
            title: "20' Currency",
            dataIndex: "twentyFtCurrency",
            key: "twentyFtCurrency",
            render: (_, record, index) => (
                <Form.Item
                    name={["data", index, "twentyFtCurrency"]}
                    initialValue={record.twentyFtCurrency}
                >
                    <Select style={{ width: "100%" }}>
                        {doorDeliveryCurrencies.map((currency) => (
                            <Option key={currency} value={currency}>
                                {currency}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            ),
        },
        {
            title: "40'",
            dataIndex: "fortyFt",
            key: "fortyFt",
            render: (_, record, index) => (
                <Form.Item
                    name={["data", index, "fortyFt"]}
                    initialValue={record.fortyFt}
                >
                    <Input placeholder="Enter Amount" />
                </Form.Item>
            ),
        },
        {
            title: "40' Currency",
            dataIndex: "fortyFtCurrency",
            key: "fortyFtCurrency",
            render: (_, record, index) => (
                <Form.Item
                    name={["data", index, "fortyFtCurrency"]}
                    initialValue={record.fortyFtCurrency}
                >
                    <Select style={{ width: "100%" }}>
                        {doorDeliveryCurrencies.map((currency) => (
                            <Option key={currency} value={currency}>
                                {currency}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            ),
        },
        {
            title: "40'hc",
            dataIndex: "fortyFtHC",
            key: "fortyFtHC",
            render: (_, record, index) => (
                <Form.Item
                    name={["data", index, "fortyFtHC"]}
                    initialValue={record.fortyFtHC}
                >
                    <Input placeholder="Enter Amount" />
                </Form.Item>
            ),
        },
        {
            title: "40'hc Currency",
            dataIndex: "fortyFtHCCurrency",
            key: "fortyFtHCCurrency",
            render: (_, record, index) => (
                <Form.Item
                    name={["data", index, "fortyFtHCCurrency"]}
                    initialValue={record.fortyFtHCCurrency}
                >
                    <Select style={{ width: "100%" }}>
                        {doorDeliveryCurrencies.map((currency) => (
                            <Option key={currency} value={currency}>
                                {currency}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            ),
        },
        {
            title: "Remark",
            dataIndex: "remark",
            key: "remark",
            render: (_, record, index) => (
                <Form.Item
                    name={["data", index, "remark"]}
                    initialValue={record.remark}
                >
                    <Input placeholder="Enter Remark" />
                </Form.Item>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Button
                    type="danger"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDoorDeliveryRowDelete(record.key)}
                >
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <div>
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
            <Button type="primary" onClick={handleDoorDeliveryChargesNewRow} className="mt-4">
                Add Row
            </Button>
        </div>
    );
};

export default DoorDeliveryCharges;
