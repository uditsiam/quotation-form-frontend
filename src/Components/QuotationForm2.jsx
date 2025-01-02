import { Row, Col } from "antd";
import { AutoComplete } from "antd";

const options = [
  //use API to list the values here
  { value: "Burns Bay Road" },
  { value: "Downing Street" },
  { value: "Wall Street" },
];

const QuotationForm1 = () => (
  <Row gutter={16}>
    <Col span={8}>
      <div style={{ background: "#0092ff", color: "#fff", padding: 20 }}>
        {/* Left Column */}
        <AutoComplete
          style={{ width: 200 }}
          options={options}
          placeholder="try to type `b`"
          filterOption={(inputValue, option) =>
            option &&
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />

        <AutoComplete
          id="toPort"
          style={{ width: 200 }}
          options={options}
          placeholder="try to type `b`"
          filterOption={(inputValue, option) =>
            option &&
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </div>
    </Col>

    <Col span={8}>
      <div style={{ background: "#0092ff", color: "#fff", padding: 20 }}>
        Column 2
      </div>
    </Col>
    {/* <Col span={8}><div style={{ background: '#0092ff', color: '#fff', padding: 20 }}>Column 3</div></Col> */}
  </Row>
);

export default QuotationForm1;
