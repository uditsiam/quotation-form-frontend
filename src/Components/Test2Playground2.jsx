const FreightCharge = () => {

    //done - Freight Charge Data Source and State
    const [dataSource, setDataSource] = useState([
        {
            key: "1",
            company: ["OOCL", "KMTC", "ONE"],
            twentyFt: "",
            twentyFtCurrency: "USD",
            fortyFt: "",
            fortyFtCurrency: "USD",
            fortyFtHC: "",
            fortyFtHCCurrency: "USD",
            remark: "",
        },
    ]);


    //done - Freight Charge Options State
    const [freightChargeOption, setFreightChargeOption] = useState([
        "OOCL",
        "KMTC",
        "ONE",
    ]);

    //done - Freight Charge Currencies
    const freightChargeCurrencies = [
        "NOK", "NZD", "JPY", "SGD", "THB", "FJD", "USD", "RMB", "EUR", "HKD", "AUD", "MYR", "GBP", "CHF", "CNY",
    ];
 
    //done - handle Freight Charge Add New Row
    const handleFreightChargesNewRow = () => {
        const newRow = {
            key: (dataSource.length + 1).toString(),
            company: [],
            twentyFt: "",
            twentyFtCurrency: "USD",
            fortyFt: "",
            fortyFtCurrency: "USD",
            fortyFtHC: "",
            fortyFtHCCurrency: "USD",
            remark: "",
        };
        setDataSource([...dataSource, newRow]);
    };


    //done - handle Freight Charge Options
    const handleAddFreightChargesOptions = (newCompany) => {
        if (newCompany && !freightChargeOption.includes(newCompany)) {
            setFreightChargeOption((prev) => [...prev, newCompany]);
        }
    };


    //done - handle Freight Charge Row Delete
    const handleFreightChargeRowDelete = (key) => {
        setDataSource((prevData) => prevData.filter((item) => item.key !== key));
    };


   

    //done - Freight Charge Columns
    const freightChargesColumns = [
        {
            title: "Freight Charge (Container)",
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
                                                handleAddFreightChargesOptions(newCompany);
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
                        {freightChargeOption.map((company) => (
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
                        {freightChargeCurrencies.map((currency) => (
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
                        {freightChargeCurrencies.map((currency) => (
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
                        {freightChargeCurrencies.map((currency) => (
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
    ]

     //uknown
     const handleInputChange = (key, field, value) => {
        const updatedDataSource = dataSource.map(item =>
            item.key === key ? { ...item, [field]: value } : item
        );
        setDataSource(updatedDataSource);
    };

    return (
        <div>
            {/* Freight Charge UI Start */}
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
            <Button type="primary" onClick={handleFreightChargesNewRow} className="mt-4">
                Add Row
            </Button>
            {/* Freight Charge UI End */}
        </div>
    );
};
