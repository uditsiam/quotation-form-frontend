import React, { useState } from 'react';
import { Form, Input, Select, Button,Table, Typography, Row, Col, Collapse, Divider } from 'antd';
import jsPDF from 'jspdf';
import { AutoComplete } from "antd";
import './QuotationForm.css'

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
{ value: "Al Ain International Airport - AEAAN - United Arab Emirates" },{ value: "Ajman - AEAJM - United Arab Emirates" },{ value: "Abu Dhabi - AEAUH - United Arab Emirates" },{ value: "Yas Island Seaplane Base - AEAYM - United Arab Emirates" },{ value: "Al Bateen Executive Airport - AEAZI - United Arab Emirates" },{ value: "Dubai Creek Seaplane Base - AEDCG - United Arab Emirates" },{ value: "Al Dhafra Air Base - AEDHF - United Arab Emirates" },{ value: "Jebel Ali Seaplane Base - AEDJH - United Arab Emirates" },{ value: "Al Maktoum International Airport - AEDWC - United Arab Emirates" },{ value: "Dubai - AEDXB - United Arab Emirates" },{ value: "Al Fujayrah - AEFJR - United Arab Emirates" },{ value: "Jebel Ali - AEJEA - United Arab Emirates" },{ value: "Jebel Dhanna - AEJED - United Arab Emirates" },{ value: "Khor al Fakkan - AEKLF - United Arab Emirates" },{ value: "Al Minhad Air Base - AENHD - United Arab Emirates" },{ value: "Port Rashid - AEPRA - United Arab Emirates" },{ value: "Umm al Qaiwain - AEQIW - United Arab Emirates" },{ value: "Al Hamra Seaplane Base - AERHR - United Arab Emirates" },{ value: "Ras al Khaimah - AERKT - United Arab Emirates" },{ value: "Ar Ruways - AERUW - United Arab Emirates" },{ value: "Sharjah - AESHJ - United Arab Emirates" },{ value: "Sir Bani Yas Airport - AEXSB - United Arab Emirates" },{ value: "Dalma Airport - AEZDY - United Arab Emirates" },{ value: "Bamyan Airport - AFBIN - Afghanistan" },{ value: "Bost Airport - AFBST - Afghanistan" },{ value: "Chaghcharan Airport - AFCCN - Afghanistan" },{ value: "Darwaz Airport - AFDAZ - Afghanistan" },{ value: "Dwyer Airport - AFDWR - Afghanistan" },{ value: "Farah Airport - AFFAH - Afghanistan" },{ value: "Fayzabad Airport - AFFBD - Afghanistan" },{ value: "Gardez Airport - AFGRG - Afghanistan" },{ value: "Ghazni Airport - AFGZI - Afghanistan" },{ value: "Herat International Airport - AFHEA - Afghanistan" },{ value: "Jalalabad Airport - AFJAA - Afghanistan" },{ value: "Hamid Karzai International Airport - AFKBL - Afghanistan" },{ value: "Kandahar International Airport - AFKDH - Afghanistan" },{ value: "Khost Airfield - AFKHT - Afghanistan" },{ value: "Razer Airport - AFKUR - Afghanistan" },{ value: "Khwahan Airport - AFKWH - Afghanistan" },{ value: "Qala i Naw Airport - AFLQN - Afghanistan" },{ value: "Maymana Airport - AFMMZ - Afghanistan" },{ value: "Mazar-e Sharif International Airport - AFMZR - Afghanistan" },{ value: "Forward Operating Base Shank - AFOAA - Afghanistan" },{ value: "Shindand Air Base - AFOAH - Afghanistan" },{ value: "Bagram Airfield - AFOAI - Afghanistan" },{ value: "Sharana Airstrip / Forward Operating Base Sharana - AFOAS - Afghanistan" },{ value: "Camp Bastion Air Base - AFOAZ - Afghanistan" },{ value: "Forward Operating Base Salerno - AFOLR - Afghanistan" },{ value: "Sardeh Band Airport - AFSBF - Afghanistan" },{ value: "Sheghnan Airport - AFSGA - Afghanistan" },{ value: "Tarinkot Airport - AFTII - Afghanistan" },{ value: "Taloqan Airport - AFTQN - Afghanistan" },{ value: "Kunduz Airport - AFUND - Afghanistan" },{ value: "Urgun Airport - AFURN - Afghanistan" },{ value: "Uruzgan Airport - AFURZ - Afghanistan" },{ value: "Zaranj Airport - AFZAJ - Afghanistan" },{ value: "Antigua - AGANU - Antigua and Barbuda" },{ value: "Barbuda Codrington Airport - AGBBQ - Antigua and Barbuda" },{ value: "Saint John's - AGSJO - Antigua and Barbuda" },{ value: "Clayton J. Lloyd International Airport - AIAXA - Anguilla" },{ value: "Blowing Point - AIBLP - Anguilla" },{ value: "Road Bay - AIRBY - Anguilla" },{ value: "Durres - ALDRZ - Albania" },{ value: "Zvartnots International Airport - AMEVN - Armenia" },{ value: "Shirak Airport - AMLWN - Armenia" },{ value: "Bonaire - ANBON - Netherlands Antilles" },{ value: "Curacao - ANCUR - Netherlands Antilles" },{ value: "Sint Eustatius (Antilles) - ANEUX - Netherlands" },{ value: "Galisby - ANGSB - Netherlands Antilles" },{ value: "Philipsburg - ANPHI - Netherlands Antilles" },{ value: "St Maarten - ANSXM - Netherlands Antilles" },{ value: "Willemstad - ANWIL - Netherlands Antilles" },{ value: "Andulo Airport - AOANL - Angola" },{ value: "N'zeto Airport - AOARZ - Angola" },{ value: "Ambriz Airport - AOAZZ - Angola" },{ value: "Benguela Airport (Gen. V. Deslandes Airport) - AOBUG - Angola" },{ value: "Cabinda - AOCAB - Angola" },{ value: "Cazombo Airport - AOCAV - Angola" },{ value: "Catumbela Airport - AOCBT - Angola" },{ value: "Waco Kungo Airport - AOCEO - Angola" },{ value: "Cafunfo Airport - AOCFF - Angola" },{ value: "Cangamba Airport - AOCNZ - Angola" },{ value: "Cuito Cuanavale Airport - AOCTI - Angola" },{ value: "Dirico Airport - AODRC - Angola" },{ value: "Dundo Airport - AODUE - Angola" },{ value: "Lumbala N'guimbo Airport - AOGGC - Angola" },{ value: "Negage Airport - AOGXG - Angola" },{ value: "Jamba Airport - AOJMB - Angola" },{ value: "Kapanda Airport - AOKNP - Angola" },{ value: "Luanda - AOLAD - Angola" },{ value: "Lucapa Airport - AOLBZ - Angola" },{ value: "Lobito Airport - AOLLT - Angola" },{ value: "Lobito - AOLOB - Angola" },{ value: "Luena Airport - AOLUO - Angola" },{ value: "Cuango-Luzamba Airport - AOLZM - Angola" },{ value: "Malanje Airport - AOMEG - Angola" },{ value: "Namibe - AOMSZ - Angola" },{ value: "Sumbe Airport - AONDD - Angola" },{ value: "N'dalatando Airport - AONDF - Angola" },{ value: "Albano Machado Airport - AONOV - Angola" },{ value: "Nzagi Airport - AONZA - Angola" },{ value: "Porto Amboim Airport - AOPBN - Angola" },{ value: "Chitato Airport - AOPGI - Angola" },{ value: "Lubango Mukanka Airport - AOSDD - Angola" },{ value: "Menongue Airport - AOSPP - Angola" },{ value: "Mbanza Congo Airport - AOSSY - Angola" },{ value: "Kuito Airport - AOSVP - Angola" },{ value: "Soyo - AOSZA - Angola" },{ value: "Luau Airport - AOUAL - Angola" },{ value: "Uige Airport - AOUGO - Angola" },{ value: "Henrique de Carvalho Airport - AOVHC - Angola" },{ value: "Ondjiva Pereira Airport - AOVPE - Angola" },{ value: "Xangongo Airport - AOXGN - Angola" },{ value: "Teniente R. Marsh Airport - AQTNM - Antarctica" },{ value: "Jorge Newbery Airpark - ARAEP - Argentina" },{ value: "Bahia Blanca - ARBHI - Argentina" },{ value: "Buenos Aires - ARBUE - Argentina" },{ value: "Campana - ARCMP - Argentina" },{ value: "Corrientes - ARCNQ - Argentina" },{ value: "Comodoro Pierrestegui Airport - ARCOC - Argentina" },{ value: "Comodoro Rivadavia - ARCRD - Argentina" },{ value: "Caleta Olivia - ARCVI - Argentina" },{ value: "Delta Dock - ARDDC - Argentina" },{ value: "El Palomar Airport - AREPA - Argentina" },{ value: "General Pico Airport - ARGPO - Argentina" },{ value: "La Plata - ARLPG - Argentina" },{ value: "Mar del Plata - ARMDQ - Argentina" },{ value: "Necochea - ARNEC - Argentina" },{ value: "Goya - AROYA - Argentina" },{ value: "Puerto Madryn - ARPMY - Argentina" },{ value: "Puerto Deseado - ARPUD - Argentina" },{ value: "Rio Grande - ARRGA - Argentina" },{ value: "Rio Gallegos - ARRGL - Argentina" },{ value: "Rio Cullen - ARRIC - Argentina" },{ value: "Valle del Conlara Airport - ARRLO - Argentina" },{ value: "Rosario - ARROS - Argentina" },{ value: "Rio Mayo Airport - ARROY - Argentina" },{ value: "Santa Rosa Airport - ARRSA - Argentina" },{ value: "Rio Turbio Airport - ARRYO - Argentina" },{ value: "Santa Cruz Airport - ARRZA - Argentina" },{ value: "San Antonio Este - ARSAE - Argentina" },{ value: "Santa Fe - ARSFN - Argentina" },{ value: "San Lorenzo - ARSLO - Argentina" },{ value: "San Nicolas de los Arroyos - ARSNS - Argentina" },{ value: "San Pedro - ARSPD - Argentina" },{ value: "Ushuaia - ARUSH - Argentina" },{ value: "Zarate - ARZAE - Argentina" },{ value: "Pago Pago - ASPPG - American Samoa" },{ value: "Hainfeld - ATLTX - Austria" },{ value: "Abbot Point - AUABP - Australia" },{ value: "Adelaide - AUADL - Australia" },{ value: "Ardrossan - AUARD - Australia" },{ value: "Bremer Bay - AUBBY - Australia" },{ value: "Bell Bay - AUBEL - Australia" },{ value: "Brisbane - AUBNE - Australia" },{ value: "Booby Island - AUBOO - Australia" },{ value: "Burnie - AUBWT - Australia" },{ value: "Chittering - AUCHT - Australia" },{ value: "Cairns - AUCNS - Australia" },{ value: "Devonport - AUDPO - Australia" },{ value: "Darwin - AUDRW - Australia" },{ value: "Fremantle - AUFRE - Australia" },{ value: "Gladstone - AUGLT - Australia" },{ value: "Gove - AUGOV - Australia" },{ value: "Hobart - AUHBA - Australia" },{ value: "Hay Point - AUHPT - Australia" },{ value: "Launceston - AULST - Australia" },{ value: "Melbourne - AUMEL - Australia" },{ value: "New Norfolk - AUNLK - Australia" },{ value: "Newcastle - AUNTL - Australia" },{ value: "Port Adelaide - AUPAE - Australia" },{ value: "Port Hedland - AUPHE - Australia" },{ value: "Port Kembla - AUPKL - Australia" },{ value: "Sydney - AUSYD - Australia" },{ value: "Townsville - AUTSV - Australia" },{ value: "Weipa - AUWEI - Australia" },{ value: "Aruba - AWAUA - Aruba" },{ value: "Oranjestad - AWORJ - Aruba" },{ value: "Baku - AZBAK - Azerbaijan" },{ value: "Bridgetown - BBBGI - Barbados" },{ value: "Chittagong - BDCGP - Bangladesh" },{ value: "Chalna - BDCHL - Bangladesh" },{ value: "Dhaka - BDDAC - Bangladesh" },{ value: "Mongla - BDMGL - Bangladesh" },{ value: "Antwerpen - BEANR - Belgium" },{ value: "Bossuit - BEBSU - Belgium" },{ value: "Doel - BEDEL - Belgium" },{ value: "Gent (Ghent) - BEGNE - Belgium" },{ value: "Oostende (Ostend) - BEOST - Belgium" },{ value: "Zeebrugge - BEZEE - Belgium" },{ value: "Ouagadougou - BFOUA - Burkina Faso" },{ value: "Burgas - BGBOJ - Bulgaria" },{ value: "Varna - BGVAR - Bulgaria" },{ value: "Al Hidd - BHAHD - Bahrain" },{ value: "Bahrain - BHBAH - Bahrain" },{ value: "Khalifa Bin Salman Port - BHKBS - Bahrain" },{ value: "Manama - BHMAN - Bahrain" },{ value: "Sitrah - BHSIT - Bahrain" },{ value: "Cotonou - BJCOO - Benin" },{ value: "Hamilton - BMBDA - Bermuda" },{ value: "Southampton - BMSOU - Bermuda" },{ value: "Bandar Seri Begawan - BNBWN - Brunei Darussalam" },{ value: "Kuala Belait - BNKUB - Brunei Darussalam" },{ value: "Muara - BNMUA - Brunei Darussalam" },{ value: "Puerto Busch - BOPBU - Bolivia, Plurinational State of" },{ value: "Santa Cruz - BOSRZ - Bolivia, Plurinational State of" },{ value: "Aratu - BRARB - Brazil" },{ value: "Areia Branca - BRARE - Brazil" },{ value: "Belem - BRBEL - Brazil" },{ value: "Cabedelo - BRCDO - Brazil" },{ value: "Forno - BRFNO - Brazil" },{ value: "Fortaleza - BRFOR - Brazil" },{ value: "Imbituba - BRIBB - Brazil" },{ value: "Itaguai - BRIGI - Brazil" },{ value: "Itapoa - BRIOA - Brazil" },{ value: "Ilheus - BRIOS - Brazil" },{ value: "Itabirito - BRIRO - Brazil" },{ value: "Itajai - BRITJ - Brazil" },{ value: "Itaqui - BRITQ - Brazil" },{ value: "Itapemirim - BRITZ - Brazil" },{ value: "Manaus - BRMAO - Brazil" },{ value: "Maceio - BRMCZ - Brazil" },{ value: "Natal - BRNAT - Brazil" },{ value: "Navegantes - BRNVT - Brazil" },{ value: "Portocel - BRPCL - Brazil" },{ value: "Pecem - BRPEC - Brazil" },{ value: "Paranagua - BRPNG - Brazil" },{ value: "Paranã - BRPNN - Brazil" },{ value: "Porto Alegre - BRPOA - Brazil" },{ value: "Recife - BRREC - Brazil" },{ value: "Rio Grande - BRRIG - Brazil" },{ value: "Rio de Janeiro - BRRIO - Brazil" },{ value: "Salto Grande - BRSAL - Brazil" },{ value: "Sao Francisco do Sul - BRSFS - Brazil" },{ value: "Porto de Itaguai - BRSPB - Brazil" },{ value: "Salvador - BRSSA - Brazil" },{ value: "Sao Sebastiao - BRSSO - Brazil" },{ value: "Santos - BRSSZ - Brazil" },{ value: "Santarem - BRSTM - Brazil" },{ value: "Suape - BRSUA - Brazil" },{ value: "Vitoria da Conquista - BRVDC - Brazil" },{ value: "Vila do Conde - BRVIC - Brazil" },{ value: "Vitoria - BRVIX - Brazil" },{ value: "Vila do Conde - BRVLC - Brazil" },{ value: "Freeport, Grand Bahama - BSFPO - Bahamas" },{ value: "Nassau - BSNAS - Bahamas" },{ value: "Minsk - BYMSQ - Belarus" },{ value: "Belize City - BZBZE - Belize" },{ value: "Bathurst - CABAT - Canada" },{ value: "Brockville - CABCK - Canada" },{ value: "Baie d'Urfe - CABDU - Canada" },{ value: "Becancour - CABEC - Canada" },{ value: "Baie-Johan-Beetz - CABJO - Canada" },{ value: "Burlington - CABRL - Canada" },{ value: "Calgary - CACAL - Canada" },{ value: "Corner Brook - CACBK - Canada" },{ value: "Cowichan Bay - CACCB - Canada" },{ value: "Collingwood - CACOL - Canada" },{ value: "Crofton - CACRO - Canada" },{ value: "Cornwall - CACWL - Canada" },{ value: "Dorval - CADOR - Canada" },{ value: "Drummondville - CADRU - Canada" },{ value: "Edmonton - CAEDM - Canada" },{ value: "Halifax - CAHAL - Canada" },{ value: "Hamilton - CAHAM - Canada" },{ value: "Harmac - CAHMC - Canada" },{ value: "Kingsville - CAKVL - Canada" },{ value: "Magog - CAMAG - Canada" },{ value: "Moncton - CAMNT - Canada" },{ value: "Montreal - CAMTR - Canada" },{ value: "Niagara Falls - CANIA - Canada" },{ value: "Nanaimo - CANNO - Canada" },{ value: "North Bay - CANOR - Canada" },{ value: "New Westminster - CANWE - Canada" },{ value: "Oakville - CAOAK - Canada" },{ value: "Odessa - CAODE - Canada" },{ value: "Oshawa - CAOSH - Canada" },{ value: "Port Credit - CAPCR - Canada" },{ value: "Port Dover - CAPDV - Canada" },{ value: "Port Mellon - CAPML - Canada" },{ value: "Pointe-Claire - CAPOI - Canada" },{ value: "Prince Rupert - CAPRR - Canada" },{ value: "Quebec - CAQUE - Canada" },{ value: "Saskatoon - CASAK - Canada" },{ value: "Saint-Catharines - CASCA - Canada" },{ value: "Saint-John - CASJB - Canada" },{ value: "Saint-John's - CASJF - Canada" },{ value: "Sarnia - CASNI - Canada" },{ value: "Sorel - CASOR - Canada" },{ value: "Sault-Sainte-Marie - CASSM - Canada" },{ value: "Stoney Creek - CASTC - Canada" },{ value: "Summerside - CASUM - Canada" },{ value: "Texada Island - CATEX - Canada" },{ value: "Thunder Bay - CATHU - Canada" },{ value: "Toronto - CATOR - Canada" },{ value: "Trois-Rivieres (Three Rivers) - CATRR - Canada" },{ value: "Trenton - CATTC - Canada" },{ value: "Vancouver - CAVAN - Canada" },{ value: "Valleyfield - CAVLF - Canada" },{ value: "Winona - CAWIN - Canada" },{ value: "Winnipeg - CAWNP - Canada" },{ value: "Boma - CDBOA - Congo, The Democratic Republic of the" },{ value: "Matadi - CDMAT - Congo, The Democratic Republic of the" },{ value: "Pointe Noire - CGPNR - Congo" },{ value: "Abidjan - CIABJ - Côte d'Ivoire" },{ value: "San-Pedro - CISPY - Côte d'Ivoire" },{ value: "Antofagasta - CLANF - Chile" },{ value: "Arica - CLARI - Chile" },{ value: "Bahia San Gregorio - CLBAG - Chile" },{ value: "Barquito - CLBAR - Chile" },{ value: "San Vicente - CLCAP - Chile" },{ value: "Calbuco - CLCBC - Chile" },{ value: "Caleta Coloso - CLCCL - Chile" },{ value: "Chacabuco - CLCHB - Chile" },{ value: "Caldera - CLCLD - Chile" },{ value: "Coronel - CLCNL - Chile" },{ value: "Chanaral - CLCNR - Chile" },{ value: "Cabo Negro - CLCNX - Chile" },{ value: "Coquimbo - CLCQQ - Chile" },{ value: "Corral - CLCRR - Chile" },{ value: "Dalcahue - CLDCH - Chile" },{ value: "Guayacan - CLGYC - Chile" },{ value: "Huasco - CLHSO - Chile" },{ value: "Isla de Pascua - CLIPC - Chile" },{ value: "Iquique - CLIQQ - Chile" },{ value: "Jureles - CLJRL - Chile" },{ value: "Los Vilos - CLLOS - Chile" },{ value: "Lirquen - CLLQN - Chile" },{ value: "Las Ventanas - CLLVS - Chile" },{ value: "Michilla - CLMCH - Chile" },{ value: "Mejillones - CLMJS - Chile" },{ value: "Puerto Angamos - CLPAG - Chile" },{ value: "Puerto Chacabuco - CLPCH - Chile" },{ value: "Penco - CLPEO - Chile" },{ value: "Punta Chungo - CLPGO - Chile" },{ value: "Puerto Montt - CLPMC - Chile" },{ value: "Puerto Natales - CLPNT - Chile" },{ value: "Punta Patache - CLPPC - Chile" },{ value: "Punta Padrones - CLPPD - Chile" },{ value: "Quellon (Puerto Quellon) - CLPTE - Chile" },{ value: "Patillos - CLPTI - Chile" },{ value: "Punta Arenas - CLPUQ - Chile" },{ value: "Quemchi - CLQMC - Chile" },{ value: "Quintero - CLQTV - Chile" },{ value: "San Antonio - CLSAI - Chile" },{ value: "San Vicente - CLSVE - Chile" },{ value: "Talcahuano - CLTAL - Chile" },{ value: "Talcahuano - CLTHO - Chile" },{ value: "Tome - CLTOM - Chile" },{ value: "Tocopilla - CLTOQ - Chile" },{ value: "Taltal - CLTTC - Chile" },{ value: "Valparaiso - CLVAP - Chile" },{ value: "Castro - CLWCA - Chile" },{ value: "Chaiten - CLWCH - Chile" },{ value: "Puerto Aisen - CLWPA - Chile" },{ value: "Puerto Williams - CLWPU - Chile" },{ value: "Ancud - CLZUD - Chile" },{ value: "Douala - CMDLA - Cameroon" },{ value: "Bayuquan - CNBAY - China" },{ value: "Beihai Fucheng Apt - CNBHY - China" },{ value: "Beijiao - CNBJO - China" },{ value: "Guangzhou - CNCAN - China" },{ value: "Changshu - CNCGU - China" },{ value: "Chongqing - CNCKG - China" },{ value: "Chaozhou Port - CNCOZ - China" },{ value: "Changsha - CNCSX - China" },{ value: "Chengdu - CNCTU - China" },{ value: "Chiwan Port - CNCWN - China" },{ value: "Dagang - CNDAA - China" },{ value: "Dalian - CNDAL - China" },{ value: "Da Chan Bay - CNDCB - China" },{ value: "Dongguan Port - CNDGG - China" },{ value: "Dalian - CNDLC - China" },{ value: "Doumen Port - CNDOU - China" },{ value: "Fangcheng Port - CNFAN - China" },{ value: "Fuyong - CNFNG - China" },{ value: "Fuzhou - CNFOC - China" },{ value: "Foshan - CNFOS - China" },{ value: "Fuqing - CNFUG - China" },{ value: "Gongyi - CNGGY - China" },{ value: "Gongming - CNGOG - China" },{ value: "Gaoming Port - CNGOM - China" },{ value: "Guigang - CNGUG - China" },{ value: "Haikou - CNHAK - China" },{ value: "Huadu - CNHDU - China" },{ value: "Hebei - CNHEB - China" },{ value: "Hangzhou - CNHGH - China" },{ value: "Haimen - CNHME - China" },{ value: "Humen Port - CNHMN - China" },{ value: "Heshan Port - CNHSN - China" },{ value: "Huangpu Port - CNHUA - China" },{ value: "Huludao Port - CNHUD - China" },{ value: "Huizhou Port - CNHUI - China" },{ value: "Jingzhou - CNJGZ - China" },{ value: "Jiangyin Port - CNJIA - China" },{ value: "Jian - CNJIN - China" },{ value: "Jiujiang Port - CNJIU - China" },{ value: "Jiangmen Port - CNJMN - China" },{ value: "Jinzhou Port - CNJNZ - China" },{ value: "Jiao Xin - CNJXN - China" },{ value: "Jiuzhou Port - CNJZU - China" },{ value: "Nanchang - CNKHN - China" },{ value: "Kunming - CNKMG - China" },{ value: "Kaiping - CNKPN - China" },{ value: "Lanshi Port - CNLAN - China" },{ value: "Longhua - CNLGH - China" },{ value: "Lianhuashan Port - CNLIH - China" },{ value: "Longkou Port - CNLKU - China" },{ value: "Lanshi - CNLSI - China" },{ value: "Lianyungang - CNLYG - China" },{ value: "Liuzhou Port - CNLZH - China" },{ value: "Mawei Port - CNMAW - China" },{ value: "Maoming - CNMMI - China" },{ value: "Mawan Port - CNMWN - China" },{ value: "Mianyang - CNMYG - China" },{ value: "Nanhai Port - CNNAH - China" },{ value: "Ningbo - CNNBO - China" },{ value: "Ningbo - CNNGB - China" },{ value: "Nangang - CNNGG - China" },{ value: "Nanjing - CNNKG - China" },{ value: "Nanning - CNNNG - China" },{ value: "Nansha Port - CNNSA - China" },{ value: "Nantong Port - CNNTG - China" },{ value: "Shiqiao - CNPNY - China" },{ value: "Putian - CNPUT - China" },{ value: "Qianwan - CNQAW - China" },{ value: "Qingdao - CNQIN - China" },{ value: "Qingyuan - CNQYN - China" },{ value: "Quanzhou Port - CNQZJ - China" },{ value: "Rongqi Port - CNROQ - China" },{ value: "Rizhao Port - CNRZH - China" },{ value: "Sanbu Port - CNSBU - China" },{ value: "Shuidong Port - CNSDG - China" },{ value: "Shanghai - CNSGH - China" },{ value: "Shanghai - CNSHA - China" },{ value: "Shekou Port - CNSHK - China" },{ value: "Qinhuangdao Port - CNSHP - China" },{ value: "Shatian - CNSIN - China" },{ value: "Sanshui - CNSJQ - China" },{ value: "Shenwan - CNSNW - China" },{ value: "Sanshan (Nanhai) - CNSSH - China" },{ value: "Port of Shantou - CNSTG - China" },{ value: "Shunde Port - CNSUD - China" },{ value: "Jieyang Chaoshan Apt - CNSWA - China" },{ value: "Shanwei Port - CNSWE - China" },{ value: "Shenzhen Baoan - CNSZX - China" },{ value: "Taicang - CNTAG - China" },{ value: "Qingdao - CNTAO - China" },{ value: "Taiping - CNTAP - China" },{ value: "Taicheng (Taishan) - CNTHG - China" },{ value: "Tianjin - CNTSN - China" },{ value: "Tianjin New Port - CNTXG - China" },{ value: "Taizhou - CNTZO - China" },{ value: "Wanzai - CNWAZ - China" },{ value: "Weihai - CNWEI - China" },{ value: "Wuhu Port - CNWHI - China" },{ value: "Wenzhou - CNWNZ - China" },{ value: "Wuhan - CNWUH - China" },{ value: "Xinfeng - CNXAB - China" },{ value: "Xiamen - CNXAM - China" },{ value: "Xingang - CNXGA - China" },{ value: "Xingang - CNXGG - China" },{ value: "Xiaolan - CNXIL - China" },{ value: "Xinhui Port - CNXIN - China" },{ value: "Xintang Port - CNXIT - China" },{ value: "Xiamen - CNXMN - China" },{ value: "Yangshan - CNYAN - China" },{ value: "Yichang - CNYIC - China" },{ value: "Yingkou Port - CNYIK - China" },{ value: "Yangjiang Port - CNYJI - China" },{ value: "Yunfu - CNYNF - China" },{ value: "Yantai - CNYNT - China" },{ value: "Yangpu Port - CNYPG - China" },{ value: "Beijiao - CNYQS - China" },{ value: "Yantai - CNYTG - China" },{ value: "Yantian Port - CNYTN - China" },{ value: "Yangzhou Port - CNYZH - China" },{ value: "Zhapu (Zhejiang) - CNZAP - China" },{ value: "Zhanjiang Potou Apt - CNZHA - China" },{ value: "Zhenjiang Port - CNZHE - China" },{ value: "Zhangjiagang - CNZJG - China" },{ value: "Zhoushan Port - CNZOS - China" },{ value: "Zhaoqing Port - CNZQG - China" },{ value: "Zhongshan Port - CNZSN - China" },{ value: "Zhuhai Port - CNZUH - China" },{ value: "Barranquilla - COBAQ - Colombia" },{ value: "Buenaventura - COBUN - Colombia" },{ value: "Cartagena - COCTG - Colombia" },{ value: "Puerto Bolivar - COPBO - Colombia" },{ value: "Santa Marta - COSMR - Colombia" },{ value: "Tumaco - COTCO - Colombia" },{ value: "Caldera - CRCAL - Costa Rica" },{ value: "Golfito - CRGLF - Costa Rica" },{ value: "Puerto Limon - CRLIO - Costa Rica" },{ value: "Moin - CRMOB - Costa Rica" },{ value: "Puntarenas - CRPAS - Costa Rica" },{ value: "Puerto Caldera - CRPCA - Costa Rica" },{ value: "San Jose - CRSJO - Costa Rica" },{ value: "La Habana - CUHAV - Cuba" },{ value: "Mariel - CUMAR - Cuba" },{ value: "Matanzas - CUQMA - Cuba" },{ value: "Santiago de Cuba - CUSCU - Cuba" },{ value: "Mindelo - CVMIN - Cape Verde" },{ value: "Palmeira - CVPAL - Cape Verde" },{ value: "Praia - CVRAI - Cape Verde" },{ value: "Limassol - CYLMS - Cyprus" },{ value: "Nicosia - CYNIC - Cyprus" },{ value: "Paphos - CYPFO - Cyprus" },{ value: "Bahlingen - DEBEZ - Germany" },{ value: "Bingen am Rhein - DEBIN - Germany" },{ value: "Brake - DEBKE - Germany" },{ value: "Bad Oeynhausen - DEBOY - Germany" },{ value: "Bramel - DEBRA - Germany" },{ value: "Brunsbuttel - DEBRB - Germany" },{ value: "Bremen - DEBRE - Germany" },{ value: "Bremerhaven - DEBRV - Germany" },{ value: "Burgstaaken/Fehmarn - DEBSK - Germany" },{ value: "Koln - DECGN - Germany" },{ value: "Cuxhaven - DECUX - Germany" },{ value: "Dusseldorf - DEDUS - Germany" },{ value: "Elsfleth - DEELS - Germany" },{ value: "Emden - DEEME - Germany" },{ value: "Flensburg - DEFLF - Germany" },{ value: "Hamburg - DEHAM - Germany" },{ value: "Harburg - DEHBU - Germany" },{ value: "Hamm - DEHMM - Germany" },{ value: "Kiel - DEKEL - Germany" },{ value: "Kriegenbrunn - DEKGU - Germany" },{ value: "Kochendorf - DEKHO - Germany" },{ value: "Lubeck - DELBC - Germany" },{ value: "Leer - DELEE - Germany" },{ value: "Mannheim - DEMHG - Germany" },{ value: "Nordenham - DENHA - Germany" },{ value: "Nordstrand - DENOR - Germany" },{ value: "Pfronten - DEPFR - Germany" },{ value: "Rostock - DERSK - Germany" },{ value: "Wedel - DEWED - Germany" },{ value: "Worms - DEWOR - Germany" },{ value: "Wilhelmshaven - DEWVN - Germany" },{ value: "Djibouti - DJJIB - Djibouti" },{ value: "Djibouti - DJPOD - Djibouti" },{ value: "Aalborg - DKAAL - Denmark" },{ value: "Aarhus - DKAAR - Denmark" },{ value: "Assens - DKASN - Denmark" },{ value: "Kobenhavn - DKCPH - Denmark" },{ value: "Esbjerg - DKEBJ - Denmark" },{ value: "Fredericia - DKFRC - Denmark" },{ value: "Hirtshals - DKHIR - Denmark" },{ value: "Helsingor - DKHLS - Denmark" },{ value: "Holstebro - DKHSB - Denmark" },{ value: "Kalundborg - DKKAL - Denmark" },{ value: "Kerteminde - DKKTD - Denmark" },{ value: "Nyborg - DKNBG - Denmark" },{ value: "Odense - DKODE - Denmark" },{ value: "Rungsted - DKRUG - Denmark" },{ value: "Skagen - DKSKA - Denmark" },{ value: "Svendborg - DKSVE - Denmark" },{ value: "Roseau - DMRSU - Dominica" },{ value: "Caucedo - DOCAU - Dominican Republic" },{ value: "Rio Haina - DOHAI - Dominican Republic" },{ value: "Manzanillo - DOMAN - Dominican Republic" },{ value: "Puerto Plata - DOPOP - Dominican Republic" },{ value: "Santo Domingo - DOSDQ - Dominican Republic" },{ value: "San Pedro de Macoris - DOSPM - Dominican Republic" },{ value: "Annaba (ex Bone) - DZAAE - Algeria" },{ value: "Alger (Algiers) - DZALG - Algeria" },{ value: "Bejaia (ex Bougie) - DZBJA - Algeria" },{ value: "Ghardaia - DZGHA - Algeria" },{ value: "Mostaganem - DZMOS - Algeria" },{ value: "Oran - DZORN - Algeria" },{ value: "Skikda (ex Philippeville) - DZSKI - Algeria" },{ value: "Bahia de Caraquez - ECBHA - Ecuador" },{ value: "Chanduy - ECCHA - Ecuador" },{ value: "Esmeraldas - ECESM - Ecuador" },{ value: "Guayaquil - ECGYE - Ecuador" },{ value: "La Libertad - ECLLD - Ecuador" },{ value: "Manta - ECMEC - Ecuador" },{ value: "Monteverde - ECMTV - Ecuador" },{ value: "Puerto Bolivar - ECPBO - Ecuador" },{ value: "Haldi - EEHLD - Estonia" },{ value: "Muuga - EEMUG - Estonia" },{ value: "Tallinn - EETLL - Estonia" },{ value: "Ain Sukhna - EGAIS - Egypt" },{ value: "El Iskandariya (Alexandria) - EGALY - Egypt" },{ value: "Dumyat (Damietta) - EGDAM - Egypt" },{ value: "El Dekheila - EGEDK - Egypt" },{ value: "Port Said - EGPSD - Egypt" },{ value: "Sokhna Port - EGSOK - Egypt" },{ value: "As Suways (Suez) - EGSUZ - Egypt" },{ value: "Assab - ERASA - Eritrea" },{ value: "Massawa (Mitsiwa) - ERMSW - Eritrea" },{ value: "Lanzarote - ESACE - Spain" },{ value: "Malaga - ESAGP - Spain" },{ value: "Alicante - ESALC - Spain" },{ value: "Algeciras - ESALG - Spain" },{ value: "Aviles - ESAVS - Spain" },{ value: "Barcelona - ESBCN - Spain" },{ value: "Bilbao - ESBIO - Spain" },{ value: "Bermeo - ESBRM - Spain" },{ value: "Cadiz - ESCAD - Spain" },{ value: "Cartagena - ESCAR - Spain" },{ value: "Castellon de la Plana - ESCAS - Spain" },{ value: "Ceuta - ESCEU - Spain" },{ value: "Cebolla - ESEBO - Spain" },{ value: "Ferez - ESFER - Spain" },{ value: "Puerto del Rosario-Fuerteventura - ESFUE - Spain" },{ value: "Gijon - ESGIJ - Spain" },{ value: "Huelva - ESHUV - Spain" },{ value: "Ibiza - ESIBZ - Spain" },{ value: "La Coruna (A Coruna) - ESLCG - Spain" },{ value: "Almeria - ESLEI - Spain" },{ value: "Las Palmas de Gran Canaria - ESLPA - Spain" },{ value: "Madrid - ESMAD - Spain" },{ value: "Mahon, Menorca - ESMAH - Spain" },{ value: "Melilla - ESMLN - Spain" },{ value: "Motril - ESMOT - Spain" },{ value: "Marin, Pontevedra - ESMPG - Spain" },{ value: "Palamos - ESPAL - Spain" },{ value: "Pasajes - ESPAS - Spain" },{ value: "Palma de Mallorca - ESPMI - Spain" },{ value: "Santa Cruz de Tenerife - ESSCT - Spain" },{ value: "Santander - ESSDR - Spain" },{ value: "Santurce - ESSNR - Spain" },{ value: "Santa Cruz de La Palma - ESSPC - Spain" },{ value: "Sevilla - ESSVQ - Spain" },{ value: "Tarragona - ESTAR - Spain" },{ value: "Tabuenca - ESTBZ - Spain" },{ value: "Tenerife - ESTCI - Spain" },{ value: "Tortosa - ESTOT - Spain" },{ value: "Vigo - ESVGO - Spain" },{ value: "Valencia - ESVLC - Spain" },{ value: "Zaragoza - ESZAZ - Spain" },{ value: "Helsingfors (Helsinki) - FIHEL - Finland" },{ value: "Hango (Hanko) - FIHKO - Finland" },{ value: "Fredrikshamn (Hamina) - FIHMN - Finland" },{ value: "Kemi/Tornea (Kemi/Tornio) - FIKEM - Finland" },{ value: "Karleby (Kokkola) - FIKOK - Finland" },{ value: "Kotka - FIKTK - Finland" },{ value: "Mantyluoto - FIMTL - Finland" },{ value: "Oulu - FIOLU - Finland" },{ value: "Oulu (Uleaborg) - FIOUL - Finland" },{ value: "Bjorneborg (Pori) - FIPOR - Finland" },{ value: "Rauma (Raumo) - FIRAU - Finland" },{ value: "Abo (Turku) - FITKU - Finland" },{ value: "Tornea (Tornio) - FITOR - Finland" },{ value: "Lautoka - FJLTK - Fiji" },{ value: "Suva - FJSUV - Fiji" },{ value: "Port Stanley - FKPSY - Falkland Islands (Malvinas)" },{ value: "Pohnpei (ex Ponape) - FMPNI - Micronesia, Federated States of" },{ value: "Thorshavn - FOTHO - Faroe Islands" },{ value: "Bassens - FRBAS - France" },{ value: "Bayonne - FRBAY - France" },{ value: "Brest - FRBES - France" },{ value: "Bordeaux - FRBOD - France" },{ value: "Boulogne-sur-Mer - FRBOL - France" },{ value: "Calais - FRCQF - France" },{ value: "Dunkerque - FRDKK - France" },{ value: "Dieppe - FRDPE - France" },{ value: "Fos-sur-Mer - FRFOS - France" },{ value: "Chitry - FRHGT - France" },{ value: "Honfleur - FRHON - France" },{ value: "Javrezac - FRJAV - France" },{ value: "La Ciotat - FRLCT - France" },{ value: "Le Havre - FRLEH - France" },{ value: "La Planche - FRLPC - France" },{ value: "La Pallice - FRLPE - France" },{ value: "La Rochelle - FRLRH - France" },{ value: "Lorient - FRLRT - France" },{ value: "Le Treport - FRLTR - France" },{ value: "Le Verdon-sur-Mer - FRLVE - France" },{ value: "Mundolsheim - FRMDH - France" },{ value: "Marseille - FRMRS - France" },{ value: "Monteton - FRMT7 - France" },{ value: "Montoir-de-Bretagne - FRMTX - France" },{ value: "Nantes - FRNTE - France" },{ value: "La Groise - FROR6 - France" },{ value: "Paris - FRPAR - France" },{ value: "Piriac-sur-Mer - FRPIR - France" },{ value: "Port-Vendres - FRPOV - France" },{ value: "Sete - FRSET - France" },{ value: "Saint-Nazaire - FRSNR - France" },{ value: "Toulon - FRTLN - France" },{ value: "Rouen - FRURO - France" },{ value: "Mus - FRUSJ - France" },{ value: "Cap Lopez - GACLZ - Gabon" },{ value: "Libreville - GALBV - Gabon" },{ value: "Owendo - GAOWE - Gabon" },{ value: "Port Gentil - GAPOG - Gabon" },{ value: "Aberdeen - GBABD - United Kingdom" },{ value: "Avonmouth - GBAVO - United Kingdom" },{ value: "Barry Dock - GBBAD - United Kingdom" },{ value: "Broadstairs - GBBDT - United Kingdom" },{ value: "Belfast - GBBEL - United Kingdom" },{ value: "Burnham on Crouch - GBBOC - United Kingdom" },{ value: "Bootle - GBBOE - United Kingdom" },{ value: "Boston - GBBOS - United Kingdom" },{ value: "Birkenhead - GBBRK - United Kingdom" },{ value: "Bristol - GBBRS - United Kingdom" },{ value: "Bridlington - GBBRT - United Kingdom" },{ value: "Bridgwater - GBBRW - United Kingdom" },{ value: "Cardiff - GBCDF - United Kingdom" },{ value: "Carrickfergus - GBCFG - United Kingdom" },{ value: "Charleston - GBCHD - United Kingdom" },{ value: "Cairnryan - GBCYN - United Kingdom" },{ value: "Dundee - GBDUN - United Kingdom" },{ value: "Dover - GBDVR - United Kingdom" },{ value: "Edinburgh - GBEDI - United Kingdom" },{ value: "Sheildaig - GBEIL - United Kingdom" },{ value: "Ellesmere Port - GBELL - United Kingdom" },{ value: "Seaton - GBEON - United Kingdom" },{ value: "Falmouth - GBFAL - United Kingdom" },{ value: "Fawley - GBFAW - United Kingdom" },{ value: "Fraserburgh - GBFRB - United Kingdom" },{ value: "Felixstowe - GBFXT - United Kingdom" },{ value: "Guernsey - GBGCI - United Kingdom" },{ value: "Glasgow - GBGLW - United Kingdom" },{ value: "Goole - GBGOO - United Kingdom" },{ value: "Grangemouth - GBGRG - United Kingdom" },{ value: "Greenock - GBGRK - United Kingdom" },{ value: "Grimsby - GBGSY - United Kingdom" },{ value: "Great Yarmouth - GBGTY - United Kingdom" },{ value: "Gravesend - GBGVS - United Kingdom" },{ value: "Harwich - GBHRW - United Kingdom" },{ value: "Hull - GBHUL - United Kingdom" },{ value: "Immingham - GBIMM - United Kingdom" },{ value: "Inverkeithing - GBINK - United Kingdom" },{ value: "Inverness - GBINV - United Kingdom" },{ value: "Ipswich - GBIPS - United Kingdom" },{ value: "Irlam - GBIRL - United Kingdom" },{ value: "King's Lynn - GBKLN - United Kingdom" },{ value: "Lancaster - GBLAN - United Kingdom" },{ value: "London Gateway Port - GBLGP - United Kingdom" },{ value: "Liverpool - GBLIV - United Kingdom" },{ value: "London - GBLON - United Kingdom" },{ value: "Maldon - GBMAL - United Kingdom" },{ value: "Macduff - GBMCD - United Kingdom" },{ value: "Middlesbrough - GBMID - United Kingdom" },{ value: "Moaness, Hoy - GBMNS - United Kingdom" },{ value: "Montrose - GBMON - United Kingdom" },{ value: "Maryport - GBMRY - United Kingdom" },{ value: "Newcastle upon Tyne - GBNCL - United Kingdom" },{ value: "Northfleet - GBNFT - United Kingdom" },{ value: "Newhaven - GBNHV - United Kingdom" },{ value: "Nelson - GBNLN - United Kingdom" },{ value: "Newport - GBNPT - United Kingdom" },{ value: "Pen-Clawdd - GBPDD - United Kingdom" },{ value: "Purfleet - GBPFT - United Kingdom" },{ value: "Plymouth - GBPLY - United Kingdom" },{ value: "Portsmouth - GBPME - United Kingdom" },{ value: "Poole - GBPOO - United Kingdom" },{ value: "Preston - GBPRE - United Kingdom" },{ value: "Portbury - GBPRU - United Kingdom" },{ value: "Parkeston Quay - GBPST - United Kingdom" },{ value: "Queenborough - GBQUB - United Kingdom" },{ value: "Rye - GBRYE - United Kingdom" },{ value: "Scarborough - GBSCA - United Kingdom" },{ value: "Sheerness - GBSHS - United Kingdom" },{ value: "Southampton - GBSOU - United Kingdom" },{ value: "Stanlow - GBSOW - United Kingdom" },{ value: "South Shields - GBSSH - United Kingdom" },{ value: "Sunderland - GBSUN - United Kingdom" },{ value: "Silvertown - GBSVT - United Kingdom" },{ value: "Swansea - GBSWA - United Kingdom" },{ value: "Teesport - GBTEE - United Kingdom" },{ value: "Thamesport - GBTHP - United Kingdom" },{ value: "Tilbury - GBTIL - United Kingdom" },{ value: "Tyne - GBTYN - United Kingdom" },{ value: "Widnes - GBWDN - United Kingdom" },{ value: "Workington - GBWOR - United Kingdom" },{ value: "Stonehouse - GBYVZ - United Kingdom" },{ value: "Saint George's - GDSTG - Grenada" },{ value: "Batumi - GEBUS - Georgia" },{ value: "Poti - GEPTI - Georgia" },{ value: "Tbilisi - GETBS - Georgia" },{ value: "Cayenne - GFCAY - French Guiana" },{ value: "Degrad des Cannes - GFDDC - French Guiana" },{ value: "Tema - GHTEM - Ghana" },{ value: "Takoradi - GHTKD - Ghana" },{ value: "Gibraltar - GIGIB - Gibraltar" },{ value: "Banjul - GMBJL - Gambia" },{ value: "Conakry - GNCKY - Guinea" },{ value: "Basse-Terre - GPBBR - Guadeloupe" },{ value: "Gustavia - GPGUS - Guadeloupe" },{ value: "Pointe-a-Pitre - GPPTP - Guadeloupe" },{ value: "Saint Barthelemy - GPSBH - Guadeloupe" },{ value: "Bata - GQBSG - Equatorial Guinea" },{ value: "Malabo - GQSSG - Equatorial Guinea" },{ value: "Astakos - GRAST - Greece" },{ value: "Eleusina - GREEU - Greece" },{ value: "Heraklion (Iraklion) - GRHER - Greece" },{ value: "Kapsalion (Kythira) - GRKAP - Greece" },{ value: "Piraeus - GRPIR - Greece" },{ value: "Rhodes - GRRHO - Greece" },{ value: "Thessaloniki - GRSKG - Greece" },{ value: "Volos - GRVOL - Greece" },{ value: "Champerico - GTCHR - Guatemala" },{ value: "Guatemala City - GTGUA - Guatemala" },{ value: "Puerto Barrios - GTPBR - Guatemala" },{ value: "Puerto Quetzal - GTPRQ - Guatemala" },{ value: "Puerto Santo Tomas de Castilla - GTSTC - Guatemala" },{ value: "Guam - GUGUM - Guam" },{ value: "Bissau - GWOXB - Guinea-Bissau" },{ value: "Georgetown - GYGEO - Guyana" },{ value: "Hong Kong - HKHKG - Hong Kong" },{ value: "Amapala - HNAMP - Honduras" },{ value: "La Ceiba - HNLCE - Honduras" },{ value: "Puerto Castilla - HNPCA - Honduras" },{ value: "Puerto Cortes - HNPCR - Honduras" },{ value: "Roatan - HNRTB - Honduras" },{ value: "San Lorenzo - HNSLO - Honduras" },{ value: "Tela - HNTEA - Honduras" },{ value: "Tegucigalpa - HNTGU - Honduras" },{ value: "Dubrovnik - HRDBV - Croatia" },{ value: "Lastovo - HRLST - Croatia" },{ value: "Ploce - HRPLE - Croatia" },{ value: "Rijeka - HRRJK - Croatia" },{ value: "Split - HRSPU - Croatia" },{ value: "Cap-Haitien - HTCAP - Haiti" },{ value: "Port-au-Prince - HTPAP - Haiti" },{ value: "Budapest - HUBUD - Hungary" },{ value: "Amamapare, Ij - IDAMA - Indonesia" },{ value: "Banjarmasin - IDBDJ - Indonesia" },{ value: "Bitung, Sulawesi - IDBIT - Indonesia" },{ value: "Belawan, Sumatra - IDBLW - Indonesia" },{ value: "Belanak Terminal - IDBNT - Indonesia" },{ value: "Balikpapan - IDBPN - Indonesia" },{ value: "Batam Island - IDBTM - Indonesia" },{ value: "Buatan - IDBUN - Indonesia" },{ value: "Batu Ampal - IDBUR - Indonesia" },{ value: "Cigading - IDCIG - Indonesia" },{ value: "Jambi, Sumatra - IDDJB - Indonesia" },{ value: "Jayapura, Irian Jaya - IDDJJ - Indonesia" },{ value: "Jakarta, Java - IDJKT - Indonesia" },{ value: "Kabil - IDKAB - Indonesia" },{ value: "Lobam - IDLBM - Indonesia" },{ value: "Makassar - IDMAK - Indonesia" },{ value: "Medan, Sumatra - IDMES - Indonesia" },{ value: "Merak, Java - IDMRK - Indonesia" },{ value: "Padang - IDPDG - Indonesia" },{ value: "Panjang (Lampung, Sumatra) - IDPJG - Indonesia" },{ value: "Pekanbaru, Sumatra - IDPKU - Indonesia" },{ value: "Palembang, Sumatra - IDPLM - Indonesia" },{ value: "Panjang - IDPNJ - Indonesia" },{ value: "Pontianak, Kalimantan - IDPNK - Indonesia" },{ value: "Perawang - IDPWG - Indonesia" },{ value: "Sungai Pakning, Sumatra - IDSEQ - Indonesia" },{ value: "Semarang - IDSRG - Indonesia" },{ value: "Samarinda, Kalimantan - IDSRI - Indonesia" },{ value: "Surabaya - IDSUB - Indonesia" },{ value: "Taboneo - IDTAB - Indonesia" },{ value: "Teluk Betung, Sumatra - IDTBG - Indonesia" },{ value: "Tanjung Priok - IDTPP - Indonesia" },{ value: "Tebingtinggi - IDTTI - Indonesia" },{ value: "Ujung Pandang, Sulawesi - IDUPG - Indonesia" },{ value: "Drogheda - IEDRO - Ireland" },{ value: "Dublin - IEDUB - Ireland" },{ value: "Foynes - IEFOV - Ireland" },{ value: "Galway - IEGWY - Ireland" },{ value: "Kinsale - IEKLN - Ireland" },{ value: "Cork - IEORK - Ireland" },{ value: "Waterford - IEWAT - Ireland" },{ value: "Ashdod - ILASH - Israel" },{ value: "Hadera - ILHAD - Israel" },{ value: "Haifa - ILHFA - Israel" },{ value: "Netanya - ILNAT - Israel" },{ value: "Ramat Gan - ILRMG - Israel" },{ value: "Tel Aviv-Yafo - ILTLV - Israel" },{ value: "Agra - INAGR - India" },{ value: "Ahmedabad - INAMD - India" },{ value: "Bangalore - INBLR - India" },{ value: "Mumbai (ex Bombay) - INBOM - India" },{ value: "Kolkata (ex Calcutta) - INCCU - India" },{ value: "Cuddalore - INCDL - India" },{ value: "Coimbatore - INCJB - India" },{ value: "Cochin - INCOK - India" },{ value: "Daman - INDAM - India" },{ value: "Dadri - INDRI - India" },{ value: "Goa - INGOI - India" },{ value: "Haldia - INHAL - India" },{ value: "Hyderabad - INHYD - India" },{ value: "New Delhi - INICD - India" },{ value: "Mangalore - INIXE - India" },{ value: "Kandla - INIXY - India" },{ value: "Jaipur - INJAI - India" },{ value: "Jodhpur - INJDH - India" },{ value: "Kakinada - INKAK - India" },{ value: "Kattupalli - INKAT - India" },{ value: "Kanpur - INKNU - India" },{ value: "Krishnapatnam - INKRI - India" },{ value: "Ludhiana - INLUH - India" },{ value: "Chennai (ex Madras) - INMAA - India" },{ value: "Moradabad - INMOR - India" },{ value: "Marmagao (Marmugao) - INMRM - India" },{ value: "Mundra - INMUN - India" },{ value: "Nagpur - INNAG - India" },{ value: "Jawaharlal Nehru (Nhava Sheva) - INNSA - India" },{ value: "Panipat - INPAP - India" },{ value: "Pipavav (Victor) Port - INPAV - India" },{ value: "Pithampur - INPIR - India" },{ value: "Pune - INPNQ - India" },{ value: "Surat - INSTV - India" },{ value: "Tuticorin - INTUT - India" },{ value: "Visakhapatnam - INVTZ - India" },{ value: "Veraval - INVVA - India" },{ value: "Umm Qasr Port - IQUQR - Iraq" },{ value: "Bandar Khomeini - IRBKM - Iran, Islamic Republic of" },{ value: "Bandar Abbas - IRBND - Iran, Islamic Republic of" },{ value: "Bushehr - IRBUZ - Iran, Islamic Republic of" },{ value: "Khorramshahr - IRKHO - Iran, Islamic Republic of" },{ value: "Chah Bahar - IRZBR - Iran, Islamic Republic of" },{ value: "Eskifjordur - hofn - ISESK - Iceland" },{ value: "Grundartangi - ISGRT - Iceland" },{ value: "Reykjavik - ISREY - Iceland" },{ value: "Ancona - ITAOI - Italy" },{ value: "Augusta - ITAUG - Italy" },{ value: "Bari - ITBRI - Italy" },{ value: "Cagliari - ITCAG - Italy" },{ value: "Crotone - ITCRV - Italy" },{ value: "Catania - ITCTA - Italy" },{ value: "Civitavecchia - ITCVV - Italy" },{ value: "Faenza - ITFAE - Italy" },{ value: "Gaeta - ITGAE - Italy" },{ value: "Gioia Tauro - ITGIT - Italy" },{ value: "Genova - ITGOA - Italy" },{ value: "Livorno - ITLIV - Italy" },{ value: "Milano - ITMIL - Italy" },{ value: "Monfalcone - ITMNF - Italy" },{ value: "Modena - ITMOD - Italy" },{ value: "Napoli - ITNAP - Italy" },{ value: "Padova - ITPDA - Italy" },{ value: "Pesaro - ITPES - Italy" },{ value: "Porto Garibaldi - ITPGA - Italy" },{ value: "Palermo - ITPMO - Italy" },{ value: "Capri - ITPRJ - Italy" },{ value: "Pescara - ITPSR - Italy" },{ value: "Portoscuso (Porto Vesme) - ITPVE - Italy" },{ value: "Ravenna - ITRAN - Italy" },{ value: "Salerno - ITSAL - Italy" },{ value: "La Spezia - ITSPE - Italy" },{ value: "Savona - ITSVN - Italy" },{ value: "Taranto - ITTAR - Italy" },{ value: "Trapani - ITTPS - Italy" },{ value: "Torino - ITTRN - Italy" },{ value: "Trieste - ITTRS - Italy" },{ value: "Venezia - ITVCE - Italy" },{ value: "Vado Ligure - ITVDL - Italy" },{ value: "Viareggio - ITVIA - Italy" },{ value: "Kingston - JMKIN - Jamaica" },{ value: "Montego Bay - JMMBJ - Jamaica" },{ value: "Ocho Rios - JMOCJ - Jamaica" },{ value: "Port Kaiser - JMPKS - Jamaica" },{ value: "Al 'Aqabah - JOAQJ - Jordan" },{ value: "Aburatsu - JPABU - Japan" },{ value: "Aomori - JPAOJ - Japan" },{ value: "Akita - JPAXT - Japan" },{ value: "Chiba - JPCHB - Japan" },{ value: "Fukuyama, Hiroshima - JPFKY - Japan" },{ value: "Hachinohe - JPHHE - Japan" },{ value: "Hibi - JPHIB - Japan" },{ value: "Hitachinaka - JPHIC - Japan" },{ value: "Hiroshima - JPHIJ - Japan" },{ value: "Himeji - JPHIM - Japan" },{ value: "Hikoshima - JPHIS - Japan" },{ value: "Hakodate - JPHKD - Japan" },{ value: "Hakata/Fukuoka - JPHKT - Japan" },{ value: "Hamada - JPHMD - Japan" },{ value: "Hamamatsu - JPHMM - Japan" },{ value: "Hososhima - JPHSM - Japan" },{ value: "Hitachi - JPHTC - Japan" },{ value: "Niihama - JPIHA - Japan" },{ value: "Imabari - JPIMB - Japan" },{ value: "Imari - JPIMI - Japan" },{ value: "Ishigaki - JPISG - Japan" },{ value: "Ishikari - JPISI - Japan" },{ value: "Ishinomaki - JPISM - Japan" },{ value: "Isa - JPISS - Japan" },{ value: "Iwakuni - JPIWK - Japan" },{ value: "Iyomishima - JPIYM - Japan" },{ value: "Kochi - JPKCZ - Japan" },{ value: "Kakogawa - JPKGA - Japan" },{ value: "Niigata - JPKIJ - Japan" },{ value: "Kumamoto - JPKMJ - Japan" },{ value: "Kanda, Fukuoka - JPKND - Japan" },{ value: "Kinuura - JPKNU - Japan" },{ value: "Kanazawa - JPKNZ - Japan" },{ value: "Kagoshima - JPKOJ - Japan" },{ value: "Kure, Hiroshima - JPKRE - Japan" },{ value: "Kashima, Ibaraki - JPKSM - Japan" },{ value: "Kushiro - JPKUH - Japan" },{ value: "Kawasaki - JPKWS - Japan" },{ value: "Kisarazu - JPKZU - Japan" },{ value: "Maizuru - JPMAI - Japan" },{ value: "Miike, Fukuoka - JPMII - Japan" },{ value: "Moji/Kitakyushu - JPMOJ - Japan" },{ value: "Mutsure - JPMTR - Japan" },{ value: "Muroran - JPMUR - Japan" },{ value: "Matsuyama - JPMYJ - Japan" },{ value: "Naha, Okinawa - JPNAH - Japan" },{ value: "Nakanoseki - JPNAN - Japan" },{ value: "Naoetsu - JPNAO - Japan" },{ value: "Naoshima - JPNAS - Japan" },{ value: "Nagoya, Aichi - JPNGO - Japan" },{ value: "Nagasaki - JPNGS - Japan" },{ value: "Oita - JPOIT - Japan" },{ value: "Okinawa - JPOKA - Japan" },{ value: "Omaezaki - JPOMZ - Japan" },{ value: "Onahama - JPONA - Japan" },{ value: "Onomichi - JPONO - Japan" },{ value: "Osaka - JPOSA - Japan" },{ value: "Otake - JPOTK - Japan" },{ value: "Saganoseki - JPSAG - Japan" },{ value: "Shibushi - JPSBS - Japan" },{ value: "Sendai, Miyagi - JPSDJ - Japan" },{ value: "Sendaishinko - JPSDS - Japan" },{ value: "Sodegaura - JPSDU - Japan" },{ value: "Satsumasendai - JPSEN - Japan" },{ value: "Shimonoseki - JPSHS - Japan" },{ value: "Sakaide - JPSKD - Japan" },{ value: "Shikama - JPSKM - Japan" },{ value: "Sakata - JPSKT - Japan" },{ value: "Souma - JPSMA - Japan" },{ value: "Sakaiminato - JPSMN - Japan" },{ value: "Shimizu - JPSMZ - Japan" },{ value: "Takamatsu - JPTAK - Japan" },{ value: "Tobata/Kitakyushu - JPTBT - Japan" },{ value: "Tagonoura - JPTGO - Japan" },{ value: "Toyohashi - JPTHS - Japan" },{ value: "Tokushima - JPTKS - Japan" },{ value: "Tokuyama - JPTKY - Japan" },{ value: "Tsukumi - JPTMI - Japan" },{ value: "Tomakomai - JPTMK - Japan" },{ value: "Tonda - JPTND - Japan" },{ value: "Tokachi - JPTOK - Japan" },{ value: "Toyamashinko - JPTOS - Japan" },{ value: "Toyama - JPTOY - Japan" },{ value: "Tsuruga - JPTRG - Japan" },{ value: "Tokyo - JPTYO - Japan" },{ value: "Ube - JPUBJ - Japan" },{ value: "Kobe - JPUKB - Japan" },{ value: "Unten - JPUNT - Japan" },{ value: "Wakayama - JPWAK - Japan" },{ value: "Yatsushiro - JPYAT - Japan" },{ value: "Yokkaichi - JPYKK - Japan" },{ value: "Yokohama - JPYOK - Japan" },{ value: "Yokosuka - JPYOS - Japan" },{ value: "Yawata/Kitakyushu - JPYWT - Japan" },{ value: "Mombasa - KEMBA - Kenya" },{ value: "Nairobi - KENBO - Kenya" },{ value: "Kampong Saom - KHKOS - Cambodia" },{ value: "Phnom Penh - KHPNH - Cambodia" },{ value: "Tarawa - KITRW - Kiribati" },{ value: "Mutsamudu, Anjouan - KMMUT - Comoros" },{ value: "Moroni - KMYVA - Comoros" },{ value: "Basseterre, Saint Kitts - KNBAS - Saint Kitts and Nevis" },{ value: "Nevis - KNNEV - Saint Kitts and Nevis" },{ value: "Chongjin - KPCHO - Korea, Democratic People's Republic of" },{ value: "Wonsan - KPWON - Korea, Democratic People's Republic of" },{ value: "Jeju - KRCHA - South Korea" },{ value: "Jinhae - KRCHF - South Korea" },{ value: "Janghang/Seocheon-gun - KRCHG - South Korea" },{ value: "Cheonan - KRCHO - South Korea" },{ value: "Chungju - KRCHU - South Korea" },{ value: "Changwon - KRCHW - South Korea" },{ value: "Cheongwon-gun - KRCWO - South Korea" },{ value: "Goyang - KRGYG - South Korea" },{ value: "Jinju - KRHIN - South Korea" },{ value: "Hamyang-gun - KRHYG - South Korea" },{ value: "Hyeonpoong/Daegu - KRHYP - South Korea" },{ value: "Incheon - KRICH - South Korea" },{ value: "Incheon - KRINC - South Korea" },{ value: "Jeongeup - KRJEO - South Korea" },{ value: "Geoje - KRJGE - South Korea" },{ value: "Jangheung-gun - KRJHG - South Korea" },{ value: "Gwangyang - KRKAN - South Korea" },{ value: "Geoje - KRKJE - South Korea" },{ value: "Gimcheon - KRKMC - South Korea" },{ value: "Pohang - KRKPO - South Korea" },{ value: "Gumi - KRKUM - South Korea" },{ value: "Gunsan - KRKUV - South Korea" },{ value: "Gwangju - KRKWJ - South Korea" },{ value: "Gwangju - KRKWU - South Korea" },{ value: "Masan - KRMAS - South Korea" },{ value: "Mokpo - KRMOK - South Korea" },{ value: "Namyang/Goheung-gun - KRNYJ - South Korea" },{ value: "Namyangju - KRNYU - South Korea" },{ value: "Okpo/Geoje - KROKP - South Korea" },{ value: "Onsan/Ulsan - KRONS - South Korea" },{ value: "Busan - KRPUS - South Korea" },{ value: "Samcheonpo/Sacheon - KRSCP - South Korea" },{ value: "Seoul - KRSEL - South Korea" },{ value: "Seosan - KRSSA - South Korea" },{ value: "Daegu - KRTAE - South Korea" },{ value: "Daejeon - KRTJN - South Korea" },{ value: "Tongyeong - KRTYG - South Korea" },{ value: "Ulsan - KRUSN - South Korea" },{ value: "Yesan - KRYES - South Korea" },{ value: "Yeosu - KRYOS - South Korea" },{ value: "Kuwait - KWKWI - Kuwait" },{ value: "Shuaiba - KWSAA - Kuwait" },{ value: "Shuwaikh - KWSWK - Kuwait" },{ value: "Grand Cayman - KYGCM - Cayman Islands" },{ value: "Georgetown, Grand Cayman - KYGEC - Cayman Islands" },{ value: "Beirut - LBBEY - Lebanon" },{ value: "Tripoli - LBKYE - Lebanon" },{ value: "Castries - LCCAS - Saint Lucia" },{ value: "Saint Lucia Apt - LCSLU - Saint Lucia" },{ value: "Vieux Fort - LCVIF - Saint Lucia" },{ value: "Colombo - LKCMB - Sri Lanka" },{ value: "Monrovia - LRMLW - Liberia" },{ value: "Klaipeda - LTKLJ - Lithuania" },{ value: "Aizkraukle - LVAIZ - Latvia" },{ value: "Riga - LVRIX - Latvia" },{ value: "Salacgriva - LVSAL - Latvia" },{ value: "Ventspils - LVVNT - Latvia" },{ value: "Bingazi (Benghazi) - LYBEN - Libya" },{ value: "Al Khums - LYKHO - Libya" },{ value: "Misurata - LYMRA - Libya" },{ value: "Tripoli - LYTIP - Libya" },{ value: "Agadir - MAAGA - Morocco" },{ value: "Casablanca - MACAS - Morocco" },{ value: "El Jadida - MAELJ - Morocco" },{ value: "Mohammedia - MAMOH - Morocco" },{ value: "Kenitra (ex Port Lyautey) - MANNA - Morocco" },{ value: "Tanger Med - MAPTM - Morocco" },{ value: "Safi - MASFI - Morocco" },{ value: "Tangier - MATNG - Morocco" },{ value: "Monaco - MCMON - Monaco" },{ value: "Giurgiulesti - MDGIU - Moldova, Republic of" },{ value: "Bar - MEBAR - Montenegro" },{ value: "Antsiranana - MGDIE - Madagascar" },{ value: "Ehoala - MGEHL - Madagascar" },{ value: "Majunga (Mahajanga) - MGMJN - Madagascar" },{ value: "Nosy-Be - MGNOS - Madagascar" },{ value: "Tulear (Toliara) - MGTLE - Madagascar" },{ value: "Tamatave (Toamasina) - MGTMM - Madagascar" },{ value: "Toamasina - MGTOA - Madagascar" },{ value: "Majuro - MHMAJ - Marshall Islands" },{ value: "Bamako - MLBKO - Mali" },{ value: "Yangon - MMRGN - Myanmar" },{ value: "Macau - MOMFM - Macao" },{ value: "Saipan - MPSPN - Northern Mariana Islands" },{ value: "Fort-de-France - MQFDF - Martinique" },{ value: "Nouadhibou - MRNDB - Mauritania" },{ value: "Nouakchott - MRNKC - Mauritania" },{ value: "Marsaxlokk - MTMAR - Malta" },{ value: "Mgarr, Gozo - MTMGZ - Malta" },{ value: "Valletta - MTMLA - Malta" },{ value: "Port Louis - MUPLU - Mauritius" },{ value: "Male - MVMLE - Maldives" },{ value: "Blantyre - MWBLZ - Malawi" },{ value: "Acapulco - MXACA - Mexico" },{ value: "Altamira - MXATM - Mexico" },{ value: "Coatzacoalcos - MXCOA - Mexico" },{ value: "Ensenada - MXESE - Mexico" },{ value: "Guaymas - MXGYM - Mexico" },{ value: "Ciudad de Mexico - MXMEX - Mexico" },{ value: "Progreso - MXPGO - Mexico" },{ value: "Puerto Morelos - MXPMS - Mexico" },{ value: "Reynosa - MXREX - Mexico" },{ value: "Salina Cruz - MXSCX - Mexico" },{ value: "Tampico - MXTAM - Mexico" },{ value: "Topolobampo - MXTPB - Mexico" },{ value: "Veracruz - MXVER - Mexico" },{ value: "Manzanillo - MXZLO - Mexico" },{ value: "Kota Kinabalu, Sabah - MYBKI - Malaysia" },{ value: "Bintulu, Sarawak - MYBTU - Malaysia" },{ value: "Bagan Luar (Butterworth) - MYBWH - Malaysia" },{ value: "Johor Bahru - MYJHB - Malaysia" },{ value: "Kuching, Sarawak - MYKCH - Malaysia" },{ value: "Kuantan (Tanjong Gelang) - MYKUA - Malaysia" },{ value: "Labuan, Sabah - MYLBU - Malaysia" },{ value: "Mersing - MYMEP - Malaysia" },{ value: "Malacca - MYMKZ - Malaysia" },{ value: "Muar - MYMUA - Malaysia" },{ value: "Miri, Sarawak - MYMYY - Malaysia" },{ value: "Penang (Georgetown) - MYPEN - Malaysia" },{ value: "Pasir Gudang, Johor - MYPGU - Malaysia" },{ value: "Port Klang (Pelabuhan Klang) - MYPKG - Malaysia" },{ value: "Sibu, Sarawak - MYSBW - Malaysia" },{ value: "Sandakan, Sabah - MYSDK - Malaysia" },{ value: "Tanjong Baran - MYTBA - Malaysia" },{ value: "Kuala Terengganu - MYTGG - Malaysia" },{ value: "Tanjung Pelepas - MYTPP - Malaysia" },{ value: "Tawau, Sabah - MYTWU - Malaysia" },{ value: "Westport/Port Klang - MYWSP - Malaysia" },{ value: "Beira - MZBEW - Mozambique" },{ value: "Nacala - MZMNC - Mozambique" },{ value: "Maputo - MZMPM - Mozambique" },{ value: "Pemba - MZPOL - Mozambique" },{ value: "Quelimane - MZUEL - Mozambique" },{ value: "Luderitz - NALUD - Namibia" },{ value: "Walvis Bay - NAWVB - Namibia" },{ value: "Noumea - NCNOU - New Caledonia" },{ value: "Apapa - NGAPP - Nigeria" },{ value: "Calabar - NGCBQ - Nigeria" },{ value: "Lagos - NGLOS - Nigeria" },{ value: "Onne - NGONN - Nigeria" },{ value: "Port Harcourt - NGPHC - Nigeria" },{ value: "Tincan/Lagos - NGTIN - Nigeria" },{ value: "Warri - NGWAR - Nigeria" },{ value: "Corinto - NICIO - Nicaragua" },{ value: "Managua - NIMGA - Nicaragua" },{ value: "Alkmaar - NLALK - Netherlands" },{ value: "Amsterdam - NLAMS - Netherlands" },{ value: "Bergen op Zoom - NLBZM - Netherlands" },{ value: "Dordrecht - NLDOR - Netherlands" },{ value: "Eemshaven - NLEEM - Netherlands" },{ value: "Groningen - NLGRQ - Netherlands" },{ value: "Hoek van Holland - NLHVH - Netherlands" },{ value: "IJmuiden/Velsen - NLIJM - Netherlands" },{ value: "Moerdijk - NLMOE - Netherlands" },{ value: "Rotterdam - NLRTM - Netherlands" },{ value: "Terneuzen - NLTNZ - Netherlands" },{ value: "Velsen - NLVEL - Netherlands" },{ value: "Vlaardingen - NLVLA - Netherlands" },{ value: "Vlissingen - NLVLI - Netherlands" },{ value: "Zaandam - NLZAA - Netherlands" },{ value: "Zeewolde - NLZEW - Netherlands" },{ value: "Alvik - NOAAV - Norway" },{ value: "Alesund - NOAES - Norway" },{ value: "Agotnes - NOAGO - Norway" },{ value: "Andalsnes - NOAND - Norway" },{ value: "Austevoll - NOASV - Norway" },{ value: "Bergen - NOBGO - Norway" },{ value: "Bodo - NOBOO - Norway" },{ value: "Brevik - NOBVK - Norway" },{ value: "Drammen - NODRM - Norway" },{ value: "Eigersund - NOEGD - Norway" },{ value: "Frekhaug - NOFKG - Norway" },{ value: "Fredrikstad - NOFRK - Norway" },{ value: "Floro - NOFRO - Norway" },{ value: "Fusa - NOFUS - Norway" },{ value: "Gjemnes - NOGJM - Norway" },{ value: "Halden - NOHAL - Norway" },{ value: "Haugesund - NOHAU - Norway" },{ value: "Hestvika - NOHES - Norway" },{ value: "Holla - NOHLA - Norway" },{ value: "Hogset - NOHOG - Norway" },{ value: "Husoy - Tonsberg - NOHOY - Norway" },{ value: "Hareid - NOHRI - Norway" },{ value: "Heroya - NOHRY - Norway" },{ value: "Husnes - NOHUS - Norway" },{ value: "Havik - NOHVI - Norway" },{ value: "Ikornnes - NOIKR - Norway" },{ value: "Karmoy - NOKMY - Norway" },{ value: "Kristiansand - NOKRS - Norway" },{ value: "Knarrevik - NOKRV - Norway" },{ value: "Kristiansund - NOKSU - Norway" },{ value: "Larvik - NOLAR - Norway" },{ value: "Lyngdal - NOLND - Norway" },{ value: "Maloy - NOMAY - Norway" },{ value: "Molde - NOMOL - Norway" },{ value: "Mongstad - NOMON - Norway" },{ value: "Mo i Rana - NOMQN - Norway" },{ value: "Moss - NOMSS - Norway" },{ value: "Odda - NOODD - Norway" },{ value: "Orkanger - NOORK - Norway" },{ value: "Oslo - NOOSL - Norway" },{ value: "Porsgrunn - NOPOR - Norway" },{ value: "Sandefjord - NOSAD - Norway" },{ value: "Sauda - NOSAU - Norway" },{ value: "Skien - NOSKE - Norway" },{ value: "Skogn - NOSKX - Norway" },{ value: "Sortland - NOSLX - Norway" },{ value: "Sarpsborg - NOSPG - Norway" },{ value: "Stord - NOSRP - Norway" },{ value: "Straumen - NOSTM - Norway" },{ value: "Sunndalsora - NOSUN - Norway" },{ value: "Svelgen - NOSVE - Norway" },{ value: "Stavanger - NOSVG - Norway" },{ value: "Tananger - NOTAE - Norway" },{ value: "Tonsberg - NOTON - Norway" },{ value: "Tromso - NOTOS - Norway" },{ value: "Trondheim - NOTRD - Norway" },{ value: "Auckland - NZAKL - New Zealand" },{ value: "Bluff - NZBLU - New Zealand" },{ value: "Christchurch - NZCHC - New Zealand" },{ value: "Dunedin - NZDUD - New Zealand" },{ value: "Hamilton - NZHLZ - New Zealand" },{ value: "Lyttelton - NZLYT - New Zealand" },{ value: "Middleton/Christchurch - NZMNR - New Zealand" },{ value: "Napier - NZNPE - New Zealand" },{ value: "New Plymouth - NZNPL - New Zealand" },{ value: "Nelson - NZNSN - New Zealand" },{ value: "Palmerston North - NZPMR - New Zealand" },{ value: "Port Chalmers - NZPOE - New Zealand" },{ value: "Timaru - NZTIU - New Zealand" },{ value: "Temuka - NZTKA - New Zealand" },{ value: "Tauranga - NZTRG - New Zealand" },{ value: "Wanganui - NZWAG - New Zealand" },{ value: "Wellington - NZWLG - New Zealand" },{ value: "Whangarei - NZWRE - New Zealand" },{ value: "Muscat - OMMCT - Oman" },{ value: "Mina' Qabus - OMMNQ - Oman" },{ value: "Port Qaboos - OMOPQ - Oman" },{ value: "Salalah - OMSLL - Oman" },{ value: "Sohar - OMSOH - Oman" },{ value: "Puerto Armuelles - PAAML - Panama" },{ value: "Balboa - PABLB - Panama" },{ value: "Colon Free Zone - PACFZ - Panama" },{ value: "Coco Solo - PACSO - Panama" },{ value: "Cristobal - PACTB - Panama" },{ value: "Chitre - PACTD - Panama" },{ value: "Canazas - PACZZ - Panama" },{ value: "Manzanillo - PAMIT - Panama" },{ value: "Colon - PAONX - Panama" },{ value: "Rodman - PAPSA - Panama" },{ value: "Panama, Ciudad de - PAPTY - Panama" },{ value: "Atico - PEATI - Peru" },{ value: "Chimbote - PECHM - Peru" },{ value: "Callao - PECLL - Peru" },{ value: "General San Martin - PEGSM - Peru" },{ value: "Huacho - PEHCO - Peru" },{ value: "Ilo - PEILQ - Peru" },{ value: "Iquitos - PEIQT - Peru" },{ value: "Lobitos - PELOB - Peru" },{ value: "Matarani - PEMRI - Peru" },{ value: "Pacasmayo - PEPAC - Peru" },{ value: "Paita - PEPAI - Peru" },{ value: "Puerto Chicama - PEPCH - Peru" },{ value: "Pisco - PEPIO - Peru" },{ value: "San Nicolas - PESNX - Peru" },{ value: "Supe - PESUP - Peru" },{ value: "Salaverry - PESVY - Peru" },{ value: "Talara - PETYL - Peru" },{ value: "Papeete - PFPPT - French Polynesia" },{ value: "Lae - PGLAE - Papua New Guinea" },{ value: "Madang - PGMAG - Papua New Guinea" },{ value: "Port Moresby - PGPOM - Papua New Guinea" },{ value: "Rabaul - PGRAB - Papua New Guinea" },{ value: "Cebu - PHCEB - Philippines" },{ value: "Cagayan de Oro, Mindanao - PHCGY - Philippines" },{ value: "Davao, Mindanao - PHDVO - Philippines" },{ value: "General Santos - PHGES - Philippines" },{ value: "Iligan, Mindanao - PHIGN - Philippines" },{ value: "Isabela (Basilan) - PHISB - Philippines" },{ value: "Magellanes/Masao - PHMLS - Philippines" },{ value: "Manicani - PHMNI - Philippines" },{ value: "Manila - PHMNL - Philippines" },{ value: "Manila North Harbour - PHMNN - Philippines" },{ value: "Manila South Harbour - PHMNS - Philippines" },{ value: "Ozamis, Mindanao - PHOZC - Philippines" },{ value: "Pasaleng, Luzon - PHPSL - Philippines" },{ value: "Subic Bay - PHSFS - Philippines" },{ value: "Zamboanga - PHZAM - Philippines" },{ value: "Karachi-muhammad Bin Qasim - PKBQM - Pakistan" },{ value: "Karachi - PKKHI - Pakistan" },{ value: "Gdansk - PLGDN - Poland" },{ value: "Gdynia - PLGDY - Poland" },{ value: "Swinoujscie - PLSWI - Poland" },{ value: "Szczecin - PLSZZ - Poland" },{ value: "Aguadilla - PRBQN - Puerto Rico" },{ value: "Mayaguez - PRMAZ - Puerto Rico" },{ value: "Puerto Nuevo - PRPNU - Puerto Rico" },{ value: "Ponce - PRPSE - Puerto Rico" },{ value: "San Juan - PRSJU - Puerto Rico" },{ value: "Angra do Heroismo - PTADH - Portugal" },{ value: "Canical - PTCNL - Portugal" },{ value: "Entroncamento - PTENT - Portugal" },{ value: "Figueira da Foz - PTFDF - Portugal" },{ value: "Funchal, Madeira - PTFNC - Portugal" },{ value: "Horta - PTHOR - Portugal" },{ value: "Leixoes - PTLEI - Portugal" },{ value: "Lisboa - PTLIS - Portugal" },{ value: "Porto - PTOPO - Portugal" },{ value: "Ponta Delgada - PTPDL - Portugal" },{ value: "Praia da Vitoria - PTPRV - Portugal" },{ value: "Setubal - PTSET - Portugal" },{ value: "Sines - PTSIE - Portugal" },{ value: "Terceira Island Apt - PTTER - Portugal" },{ value: "Viana do Castelo - PTVDC - Portugal" },{ value: "Asuncion - PYASU - Paraguay" },{ value: "Barrio Caacupe Mi - PYBCM - Paraguay" },{ value: "Fenix - PYFNX - Paraguay" },{ value: "Pilar - PYPIL - Paraguay" },{ value: "Pto Seguro/col Mariano Roque Alonso - PYPSE - Paraguay" },{ value: "San Antonio - PYSAN - Paraguay" },{ value: "Terport (San Antonio) - PYTER - Paraguay" },{ value: "Doha - QADOH - Qatar" },{ value: "Mesaieed - QAMES - Qatar" },{ value: "Umm Sa'id (Mesaieed) - QAUMS - Qatar" },{ value: "Le Port - RELPT - Réunion" },{ value: "Port de Pointe des Galets - REPDG - Réunion" },{ value: "Reunion - REREU - Réunion" },{ value: "Saint-Denis de la Reunion Apt - RERUN - Réunion" },{ value: "Agigea - ROAGI - Romania" },{ value: "Braila - ROBRA - Romania" },{ value: "Constanta - ROCND - Romania" },{ value: "Galati - ROGAL - Romania" },{ value: "Mangalia - ROMAG - Romania" },{ value: "Arkhangelsk - RUARH - Russian Federation" },{ value: "Magadan - RUGDX - Russian Federation" },{ value: "Kaliningrad - RUKGD - Russian Federation" },{ value: "Kholmsk - RUKHO - Russian Federation" },{ value: "Korsakov - RUKOR - Russian Federation" },{ value: "Krasnodar - RUKRR - Russian Federation" },{ value: "Saint Petersburg (ex Leningrad) - RULED - Russian Federation" },{ value: "Murmansk - RUMMK - Russian Federation" },{ value: "Nakhodka - RUNJK - Russian Federation" },{ value: "Novorossiysk - RUNVS - Russian Federation" },{ value: "Potapova - RUPTP - Russian Federation" },{ value: "Rostov - RUROV - Russian Federation" },{ value: "Taganrog - RUTAG - Russian Federation" },{ value: "Vladivostok - RUVVO - Russian Federation" },{ value: "Vyborg - RUVYG - Russian Federation" },{ value: "Vostochnyy Port - RUVYP - Russian Federation" },{ value: "Kigali - RWKGL - Rwanda" },{ value: "Ad Dammam - SADMM - Saudi Arabia" },{ value: "Dammam - SADMN - Saudi Arabia" },{ value: "Jeddah - SAJED - Saudi Arabia" },{ value: "Jubail - SAJUB - Saudi Arabia" },{ value: "King Abdullah City - SAKAC - Saudi Arabia" },{ value: "Riyadh - SARUH - Saudi Arabia" },{ value: "Honiara, Guadalcanal Is - SBHIR - Solomon Islands" },{ value: "Noro, New Georgia - SBNOR - Solomon Islands" },{ value: "Mahe - SCMAW - Seychelles" },{ value: "Port Victoria - SCPOV - Seychelles" },{ value: "Port Sudan - SDPZU - Sudan" },{ value: "Ahus - SEAHU - Sweden" },{ value: "Falkenberg - SEFAG - Sweden" },{ value: "Goteborg - SEGOT - Sweden" },{ value: "Gavle - SEGVX - Sweden" },{ value: "Halmstad - SEHAD - Sweden" },{ value: "Helsingborg - SEHEL - Sweden" },{ value: "Karlshamn - SEKAN - Sweden" },{ value: "Karlstad - SEKSD - Sweden" },{ value: "Landskrona - SELAA - Sweden" },{ value: "Malmo - SEMMA - Sweden" },{ value: "Norrkoping - SENRK - Sweden" },{ value: "Oskarshamn - SEOSK - Sweden" },{ value: "Oxelosund - SEOXE - Sweden" },{ value: "Sundsvall - SESDL - Sweden" },{ value: "Skelleftea - SESFT - Sweden" },{ value: "Skelleftehamn - SESKE - Sweden" },{ value: "Sodertalje - SESOE - Sweden" },{ value: "Stockholm - SESTO - Sweden" },{ value: "Trelleborg - SETRG - Sweden" },{ value: "Uddevalla - SEUDD - Sweden" },{ value: "Umea - SEUME - Sweden" },{ value: "Vasteras - SEVST - Sweden" },{ value: "Jurong/Singapore - SGJUR - Singapore" },{ value: "Singapore - SGSIN - Singapore" },{ value: "Koper - SIKOP - Slovenia" },{ value: "Bratislava - SKBTS - Slovakia" },{ value: "Freetown - SLFNA - Sierra Leone" },{ value: "Dakar - SNDKR - Senegal" },{ value: "Berbera - SOBBO - Somalia" },{ value: "Kismayu - SOKMU - Somalia" },{ value: "Mogadishu - SOMGQ - Somalia" },{ value: "Paramaribo - SRPBM - Suriname" },{ value: "Sao Tome Island - STTMS - Sao Tome and Principe" },{ value: "Acajutla - SVAQJ - El Salvador" },{ value: "La Libertad - SVLLD - El Salvador" },{ value: "La Union - SVLUN - El Salvador" },{ value: "San Salvador - SVSAL - El Salvador" },{ value: "Damascus (Damas) - SYDAM - Syrian Arab Republic" },{ value: "Latakia - SYLTK - Syrian Arab Republic" },{ value: "Tartus - SYTTS - Syrian Arab Republic" },{ value: "Providenciales - TCPLS - Turks and Caicos Islands" },{ value: "Lome - TGLFW - Togo" },{ value: "Bangpakong - THBGP - Thailand" },{ value: "Bangkok - THBKK - Thailand" },{ value: "Bangkok Modern Terminals/Bangkok - THBMT - Thailand" },{ value: "Koh Sichang - THKSI - Thailand" },{ value: "Khlong Toei - THKTY - Thailand" },{ value: "Laem Chabang - THLCH - Thailand" },{ value: "Lat Krabang - THLKR - Thailand" },{ value: "Mab Tapud - THMAT - Thailand" },{ value: "Pat Bangkok - THPAT - Thailand" },{ value: "Paknam - THPKN - Thailand" },{ value: "Siam Bangkok Port - THSBP - Thailand" },{ value: "Sahathai - THSCS - Thailand" },{ value: "Songkhla - THSGZ - Thailand" },{ value: "Samut Prakarn - THSPR - Thailand" },{ value: "Sriracha - THSRI - Thailand" },{ value: "Thai prosperity terminal - THTPT - Thailand" },{ value: "Gabes - TNGAE - Tunisia" },{ value: "Jarjis - TNJAR - Tunisia" },{ value: "La Goulette Nord (Halqueloued) - TNLGN - Tunisia" },{ value: "Rades - TNRDS - Tunisia" },{ value: "Sfax - TNSFA - Tunisia" },{ value: "Sousse - TNSUS - Tunisia" },{ value: "Tunis - TNTUN - Tunisia" },{ value: "Nuku'alofa - TOTBU - Tonga" },{ value: "Aliaga - TRALI - Turkey" },{ value: "Ambarli - TRAMB - Turkey" },{ value: "Avcilar - TRAVC - Turkey" },{ value: "Antalya - TRAYT - Turkey" },{ value: "Bayrampasa - TRBAY - Turkey" },{ value: "Bandirma - TRBDM - Turkey" },{ value: "Evyap Port /Kocaeli - TREYP - Turkey" },{ value: "Gebze - TRGEB - Turkey" },{ value: "Gemlik - TRGEM - Turkey" },{ value: "Haydarpasa - TRHAY - Turkey" },{ value: "Hereke - TRHER - Turkey" },{ value: "Iskenderun - TRISK - Turkey" },{ value: "Istanbul - TRIST - Turkey" },{ value: "Izmir - TRIZM - Turkey" },{ value: "Izmit - TRIZT - Turkey" },{ value: "Kumport - TRKMX - Turkey" },{ value: "Mardas - TRMAD - Turkey" },{ value: "Marmara Ereglisi - TRMAR - Turkey" },{ value: "Mersin - TRMER - Turkey" },{ value: "Nemrut Bay - TRNEM - Turkey" },{ value: "Samsun - TRSSX - Turkey" },{ value: "Tekirdag - TRTEK - Turkey" },{ value: "Trabzon - TRTZX - Turkey" },{ value: "Yarimca - TRYAR - Turkey" },{ value: "Port-of-Spain - TTPOS - Trinidad and Tobago" },{ value: "Pointe a Pierre - TTPTP - Trinidad and Tobago" },{ value: "Point Lisas - TTPTS - Trinidad and Tobago" },{ value: "San Fernando - TTSFE - Trinidad and Tobago" },{ value: "Keelung (Chilung) - TWKEL - Taiwan" },{ value: "Kaohsiung - TWKHH - Taiwan" },{ value: "Mai-liao - TWMLI - Taiwan" },{ value: "Suao - TWSUO - Taiwan" },{ value: "Taipei - TWTPE - Taiwan" },{ value: "Taichung - TWTXG - Taiwan" },{ value: "Taoyuan - TWTYN - Taiwan" },{ value: "Dar es Salaam - TZDAR - Tanzania, United Republic of" },{ value: "Tanga - TZTGT - Tanzania, United Republic of" },{ value: "Zanzibar - TZZNZ - Tanzania, United Republic of" },{ value: "Kiev - UAIEV - Ukraine" },{ value: "Illichivs'k - UAILK - Ukraine" },{ value: "Kherson - UAKHE - Ukraine" },{ value: "Mariupol (ex Zhdanov) - UAMPW - Ukraine" },{ value: "Odessa - UAODS - Ukraine" },{ value: "Sevastopol - UASVP - Ukraine" },{ value: "Jinja - UGJIN - Uganda" },{ value: "Kampala - UGKLA - Uganda" },{ value: "Kodiak - USADQ - United States" },{ value: "Anchorage - USANC - United States" },{ value: "Annapolis - USANP - United States" },{ value: "Damascus - USAR5 - United States" },{ value: "Atlanta - USATL - United States" },{ value: "Baltimore - USBAL - United States" },{ value: "Bear Creek - USBCC - United States" },{ value: "Birmingham - USBHM - United States" },{ value: "Nashville - USBNA - United States" },{ value: "Boston - USBOS - United States" },{ value: "Beaumont - USBPT - United States" },{ value: "Brownsville - USBRO - United States" },{ value: "Buffalo - USBUF - United States" },{ value: "Council Bluffs - USCBF - United States" },{ value: "Chattanooga - USCHA - United States" },{ value: "Chicago - USCHI - United States" },{ value: "Charleston - USCHS - United States" },{ value: "Cleveland - USCLE - United States" },{ value: "Port Angeles - USCLM - United States" },{ value: "Charlotte - USCLT - United States" },{ value: "Columbus - USCMH - United States" },{ value: "Chippewa Falls - USCPF - United States" },{ value: "Cape Canaveral - USCPV - United States" },{ value: "Corpus Christi - USCRP - United States" },{ value: "Cincinnati - USCVG - United States" },{ value: "Cape Romanzof - USCZF - United States" },{ value: "Dauphin - USDA8 - United States" },{ value: "Dallas - USDAL - United States" },{ value: "Decatur - USDEC - United States" },{ value: "Denver - USDEN - United States" },{ value: "Detroit - USDET - United States" },{ value: "Dalton - USDNN - United States" },{ value: "Des Moines - USDSM - United States" },{ value: "Dutch Harbor - USDUT - United States" },{ value: "El Paso - USELP - United States" },{ value: "Kenai - USENA - United States" },{ value: "Newark - USEWR - United States" },{ value: "Fernandina Beach - USFEB - United States" },{ value: "Fort Lauderdale - USFLL - United States" },{ value: "Freeport - USFPO - United States" },{ value: "Fresh Water Bay - USFRP - United States" },{ value: "Fort Worth - USFWT - United States" },{ value: "Greensboro - USGBO - United States" },{ value: "Galveston - USGLS - United States" },{ value: "Gulfport - USGPT - United States" },{ value: "Greer - USGSP - United States" },{ value: "Honolulu - USHNL - United States" },{ value: "Houston - USHOU - United States" },{ value: "Huntsville - USHSV - United States" },{ value: "Wilmington - USILM - United States" },{ value: "Indianapolis - USIND - United States" },{ value: "Jacksonville - USJ3C - United States" },{ value: "Jacksonville - USJAX - United States" },{ value: "Joliet - USJOT - United States" },{ value: "Kansas City - USKCK - United States" },{ value: "Las Vegas - USLAS - United States" },{ value: "Los Alamitos - USLAT - United States" },{ value: "Los Angeles - USLAX - United States" },{ value: "Lake Charles - USLCH - United States" },{ value: "Long Beach - USLGB - United States" },{ value: "Laredo - USLRD - United States" },{ value: "Louisville - USLUI - United States" },{ value: "Memphis - USMEM - United States" },{ value: "Minneapolis - USMES - United States" },{ value: "Miami - USMIA - United States" },{ value: "Kansas City - USMKC - United States" },{ value: "Milwaukee - USMKE - United States" },{ value: "Mobile - USMOB - United States" },{ value: "Morehead City - USMRH - United States" },{ value: "Minneapolis/St Paul Apt - USMSP - United States" },{ value: "New Orleans - USMSY - United States" },{ value: "Newport News - USNNS - United States" },{ value: "Port Hueneme - USNTD - United States" },{ value: "North Charleston - USNTS - United States" },{ value: "New York - USNYC - United States" },{ value: "Oakland - USOAK - United States" },{ value: "Oceanside - USOCN - United States" },{ value: "Washington - USOCW - United States" },{ value: "Olympia - USOLM - United States" },{ value: "Omaha - USOMA - United States" },{ value: "Norfolk - USORF - United States" },{ value: "Orlando - USORL - United States" },{ value: "Otay Mesa - USOYM - United States" },{ value: "Palm Beach - USPAB - United States" },{ value: "Portage Creek - USPCA - United States" },{ value: "Portland - USPDX - United States" },{ value: "Port Elizabeth - USPEB - United States" },{ value: "Port Everglades - USPEF - United States" },{ value: "Panama City - USPFN - United States" },{ value: "Pascagoula - USPGL - United States" },{ value: "Hampton-Williamsburg-Newport News Apt - USPHF - United States" },{ value: "Philadelphia - USPHL - United States" },{ value: "Phoenix - USPHX - United States" },{ value: "Peoria - USPIA - United States" },{ value: "Pittsburgh - USPIT - United States" },{ value: "Port Manatee - USPME - United States" },{ value: "Pensacola - USPNS - United States" },{ value: "Port Arthur - USPOA - United States" },{ value: "Pennsauken - USPPS - United States" },{ value: "Pearson - USPS6 - United States" },{ value: "Portsmouth - USPTM - United States" },{ value: "Providence - USPVD - United States" },{ value: "Portland - USPWM - United States" },{ value: "Port Wentworth - USPWN - United States" },{ value: "Plymouth - USPYM - United States" },{ value: "Rotterdam - USRAJ - United States" },{ value: "Riviera Beach - USRBC - United States" },{ value: "Richmond - USRIC - United States" },{ value: "Reno - USRNO - United States" },{ value: "Sacramento - USSAC - United States" },{ value: "San Diego - USSAN - United States" },{ value: "San Antonio - USSAT - United States" },{ value: "Savannah - USSAV - United States" },{ value: "Stockton - USSCK - United States" },{ value: "Seattle - USSEA - United States" },{ value: "San Francisco - USSFO - United States" },{ value: "Salt Lake City - USSLC - United States" },{ value: "South Saint Paul - USSPT - United States" },{ value: "Brunswick - USSSI - United States" },{ value: "Saint Louis - USSTL - United States" },{ value: "Saint Paul - USSTP - United States" },{ value: "Sturgeon Bay - USSUE - United States" },{ value: "Superior - USSUW - United States" },{ value: "Newburgh - USSWF - United States" },{ value: "Santa Teresa - USSXT - United States" },{ value: "Swartz Creek - USSXZ - United States" },{ value: "Tacoma - USTIW - United States" },{ value: "Tamms - USTMM - United States" },{ value: "Toledo - USTOL - United States" },{ value: "Tampa - USTPA - United States" },{ value: "Savannah - USTSA - United States" },{ value: "Tulsa - USTUL - United States" },{ value: "Waukegan - USUGN - United States" },{ value: "Port Chester - USUXZ - United States" },{ value: "Tonawanda - USUZF - United States" },{ value: "Virginia Beach - USVAB - United States" },{ value: "Howard Beach/Queens/New York - USXGO - United States" },{ value: "Kirkland - USXHF - United States" },{ value: "Long Island City/Queens/New York - USXHO - United States" },{ value: "Oakboro - USYOB - United States" },{ value: "Colonia - UYCYR - Uruguay" },{ value: "Montevideo - UYMVD - Uruguay" },{ value: "Nueva Palmira - UYNVP - Uruguay" },{ value: "Paysandu - UYPDU - Uruguay" },{ value: "Kingstown - VCKTN - Saint Vincent and the Grenadines" },{ value: "Amuay - VEAMY - Venezuela" },{ value: "Barcelona - VEBLA - Venezuela" },{ value: "El Guamache - VEEGU - Venezuela" },{ value: "El Tablazo/Maracaibo L - VEETV - Venezuela" },{ value: "Guaranao Bay - VEGUB - Venezuela" },{ value: "Guanta - VEGUT - Venezuela" },{ value: "La Guaira - VELAG - Venezuela" },{ value: "La Salina/Maracaibo L - VELSV - Venezuela" },{ value: "Maracaibo - VEMAR - Venezuela" },{ value: "Matanzas - VEMTV - Venezuela" },{ value: "Puerto Cabello - VEPBL - Venezuela" },{ value: "Punta Cardon - VEPCN - Venezuela" },{ value: "Puerto Sucre - VEPSU - Venezuela" },{ value: "Puerto Ordaz - VEPZO - Venezuela" },{ value: "Road Town, Tortola - VGRAD - Virgin Islands, British" },{ value: "Tortola - VGTOV - Virgin Islands, British" },{ value: "Charlotte Amalie, Saint Thomas - VICHA - Virgin Islands, U.S." },{ value: "Christiansted, Saint Croix - VICTD - Virgin Islands, U.S." },{ value: "Saint Thomas - VISTT - Virgin Islands, U.S." },{ value: "Saint Croix - VISTX - Virgin Islands, U.S." },{ value: "Cat Lai - VNCLI - Viet Nam" },{ value: "Cai Lan - VNCLN - Viet Nam" },{ value: "Da Nang - VNDAD - Viet Nam" },{ value: "Haiphong - VNHPH - Viet Nam" },{ value: "Nha Trang - VNNHA - Viet Nam" },{ value: "Phuoc Long - VNPHG - Viet Nam" },{ value: "Ho Chi Minh City - VNSGN - Viet Nam" },{ value: "Su Tu Den - VNSTD - Viet Nam" },{ value: "Cai Mep - VNTOT - Viet Nam" },{ value: "Tan Thuan Dong - VNTTD - Viet Nam" },{ value: "Qui Nhon - VNUIH - Viet Nam" },{ value: "Ho Chi Minh, VICT - VNVIC - Viet Nam" },{ value: "Vung Tau - VNVUT - Viet Nam" },{ value: "Espiritu Santo - VUSON - Vanuatu" },{ value: "Port Vila - VUVLI - Vanuatu" },{ value: "Apia - WSAPW - Samoa" },{ value: "Aden - YEADE - Yemen" },{ value: "Hodeidah - YEHOD - Yemen" },{ value: "Little Aden - YELAD - Yemen" },{ value: "Mukalla - YEMKX - Yemen" },{ value: "Longoni - YTLON - Mayotte" },{ value: "Bloemfontein - ZABFN - South Africa" },{ value: "Cape Town - ZACPT - South Africa" },{ value: "Durban - ZADUR - South Africa" },{ value: "East London - ZAELS - South Africa" },{ value: "Johannesburg - ZAJNB - South Africa" },{ value: "Port Elizabeth - ZAPLZ - South Africa" },{ value: "Pretoria - ZAPRY - South Africa" },{ value: "Richards Bay - ZARCB - South Africa" },{ value: "Coega - ZAZBA - South Africa" },{ value: "Lusaka - ZMLUN - Zambia" },{ value: "Bulawayo - ZWBUQ - Zimbabwe" },{ value: "Harare - ZWHRE - Zimbabwe" },{ value: "Mutare - ZWUTA - Zimbabwe" },
]

    const renderSeaFreightChargeAccordion = (id) => (
        <Collapse defaultActiveKey={['1']} className="mb-4">
            <Panel header={`Sea Freight Export Charge - Route ${id}`} key="1">
                <Collapse>
                    <Panel header="Freight Charge" key="freight">
                        {/* Freight Charge Content */}
                        <p>Freight charge details...</p>
                        {/* Sea Freight Export Charge Section Starts */}
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
                    </Panel>
                    <Panel header="Door Delivery Charge" key="door-delivery">
                        {/* Door Delivery Charge Content */}
                        <p>Door delivery details...</p>
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
                    </Panel>
                    <Panel header="Local Charge" key="local">
                        {/* Local Charge Content */}
                        <p>Local charge details...</p>
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
                    </Panel>
                    <Panel header="Custom & Transport Charge" key="custom">
                        {/* Custom & Transport Charge Content */}
                        <p>Custom and transport charge details...</p>
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
