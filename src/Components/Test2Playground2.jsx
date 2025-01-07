const FreightCharge = () => {

    //done - Custom Charge Data Source and State
   const [customChargesdataSource, setCustomChargesDataSource] = useState([
    {
        key: "1",
        company: ["*CUSTOMS CLERANCE", "*TRANSPORT CHARGE", "*OTHER CHARGE"],
        twentyFt: "",
        twentyFtCurrency: "USD",
        fortyFt: "",
        fortyFtCurrency: "USD",
        fortyFtHC: "",
        fortyFtHCCurrency: "USD",
        remark: "",
    },
       ]);


    //done - Custom Charge Options State
    const [customChargeOption, setCustomChargesOption] = useState([
        "*CUSTOMS CLERANCE",
        "*TRANSPORT CHARGE",
        "*OTHER CHARGE"
    ]);

    //done - Custom Charge Currencies
    const customChargeCurrencies = [
        "NOK", "NZD", "JPY", "SGD", "THB", "FJD", "USD", "RMB", "EUR", "HKD", "AUD", "MYR", "GBP", "CHF", "CNY",
    ];
 
    //done - handle Custom Charge Add New Row
    const handleCustomChargesNewRow = () => {
        const newRow = {
            key: (customChargesdataSource.length + 1).toString(),
            company: [],
            twentyFt: "",
            twentyFtCurrency: "USD",
            fortyFt: "",
            fortyFtCurrency: "USD",
            fortyFtHC: "",
            fortyFtHCCurrency: "USD",
            remark: "",
        };
        setCustomChargesDataSource([...customChargesdataSource, newRow]);
    };


    //done - handle Custom Charge Options
    const handleAddCustomChargesOptions = (newCompany) => {
        if (newCompany && !customChargeOption.includes(newCompany)) {
            setCustomChargesOption((prev) => [...prev, newCompany]);
        }
    };


    //done - handle Custom Charge Row Delete
    const handleCustomChargeRowDelete = (key) => {
        setDataSource((prevData) => prevData.filter((item) => item.key !== key));
    };


    //done - Custom Charge Columns
    const customChargesColumns = [
        {
            title: "Custom Charge",
            dataIndex: "company",
            key: "company",
            render: (_, record, index) => (
                <Form.Item style={{width: 80}}
                    name={["data", index, "company"]}
                    initialValue={record.company}
                    rules={[{ required: true, message: "Please select a company" }]}
                >
                    <Select
                        // mode="multiple"
                        placeholder="Select or Add Company"
                        showArrow
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                                <div style={{ display: "flex", padding: 8 }}>
                                    <Input style={{width: 80}}
                                        placeholder="Add new company"
                                        onPressEnter={(e) => {
                                            const newCompany = e.target.value.trim();
                                            if (newCompany) {
                                                handleAddCustomChargesOptions(newCompany);
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
                        {customChargeOption.map((company) => (
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
                <Form.Item style={{width: 80}}
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
                <Form.Item style={{width: 80}}
                    name={["data", index, "twentyFtCurrency"]}
                    initialValue={record.twentyFtCurrency}
                >
                    <Select style={{ width: "100%" }}>
                        {customChargeCurrencies.map((currency) => (
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
                <Form.Item style={{width: 80}}
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
                <Form.Item style={{width: 80}}
                    name={["data", index, "fortyFtCurrency"]}
                    initialValue={record.fortyFtCurrency}
                >
                    <Select style={{ width: "100%" }}>
                        {customChargeCurrencies.map((currency) => (
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
                <Form.Item style={{width: 80}}
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
                <Form.Item style={{width: 80}}
                    name={["data", index, "fortyFtHCCurrency"]}
                    initialValue={record.fortyFtHCCurrency}
                >
                    <Select style={{ width: "100%" }}>
                        {customChargeCurrencies.map((currency) => (
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
                <Form.Item style={{width: 80}}
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
                id='delete-btn-4'
                    type="danger"
                    icon={<DeleteOutlined />}
                    onClick={() => handleCustomChargeRowDelete(record.key)}
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
        setCustomChargesDataSource(updatedDataSource);
    };

    return (
        <div>
            {/* Custom Charge UI Start */}
            <div className="overflow-auto w-full">
                <Table
                    dataSource={customChargesdataSource}
                    columns={customChargesColumns}
                    pagination={false}
                    className="min-w-[600px] md:min-w-[800px] lg:min-w-[1000px] customTable"
                    scroll={{ x: "max-content" }}
                    bordered
                />
            </div>
            <Button
            id='add-row-btn-4'
             type="primary" onClick={handleCustomChargesNewRow} className="mt-4">
                Add Row
            </Button>
            {/* Custom Charge UI End */}
        </div>
    );
};
