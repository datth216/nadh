import {
  MinusCircleOutlined,
  PlusOutlined,
  ScheduleOutlined,
  SearchOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Menu,
  Radio,
  Row,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import locationApi from "../../api/locationApi";
import propertyApi from "../../api/propertyApi";
import userApi from "../../api/userApi";
import { candidate_priority_status } from "../../common/_variables";
import Header from "../../components/Header/Header";
import { convertUtcTime } from "../../utils/convertUtcTime";

function EditCandidatePage(props) {
  const { Option } = Select;
  const { TextArea } = Input;
  const [candidate, setCandidate] = useState({});
  const [position, setPosition] = useState([]);
  const [nationality, setNationality] = useState([]);
  const [location, setLocation] = useState([]);
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("vertical");
  const [value, setValue] = useState(1);
  const [status, setStatus] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");

  const url = window.location.href;
  const lastSegment = url.split("/").pop();

  useEffect(() => {
    setLoading(true);
    const getCandidate = async () => {
      try {
        const data = await userApi.getById(lastSegment);
        console.log(data);
        setCandidate(data);
      } catch (error) {
        console.log({ error });
      }
    };
    setLoading(false);
    getCandidate();
  }, []);

  useEffect(() => {
    const getPosition = async () => {
      try {
        const response = await propertyApi.getPositionList();
        const data = await response.data;
        setPosition(data);
      } catch (error) {
        console.log({ error });
      }
    };
    getPosition();
  }, []);

  useEffect(() => {
    const getNationality = async () => {
      try {
        const response = await propertyApi.getNationalityList();
        const data = await response.data;
        setNationality(data);
      } catch (error) {
        console.log({ error });
      }
    };
    getNationality();
  }, []);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const response = await locationApi.getAll();
        const data = await response.data;
        // console.log(data);
        setLocation(data);
      } catch (error) {
        console.log({ error });
      }
    };
    getLocation();
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      ...candidate,
      martial_status: candidate.extra?.martial_status,
      creator: candidate.creator?.full_name,
      createdAt: convertUtcTime(candidate.createdAt),
      nationality: getNationalityValue(),
      positions: getPositions(),
      highest_education: candidate.highest_education?.label,
      emails: candidate.emails,
      phones: getPhone(),
      prefix: "+84",
    });
  }, [candidate]);

  const year = [];
  const month = [];
  const date = [];

  for (let i = 1962; i < 2023; i++) {
    year.push(<Option key={i} value={i}></Option>);
  }

  for (let i = 1; i < 13; i++) {
    month.push(<Option key={i}></Option>);
  }

  for (let i = 1; i < 32; i++) {
    date.push(<Option key={i}></Option>);
  }

  // function getLocationCode() {
  //   const data = location.map((item) => {
  //     return item.extra?.dial_code;
  //   });

  //   console.log(data);
  // }

  function getPositions() {
    const value = candidate?.prefer_position?.positions;
    return value;
  }

  function getNationalityValue() {
    const value = candidate?.nationality;
    return value;
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleClickGender = (e) => {
    setValue(e.target.value);
  };

  const handleClickMaritalStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleChangeData = (e) => {
    console.log(
      candidate_priority_status.find(
        (item) => item.id * 1 === e.target.value * 1
      )
    );
    setData(e.target.value);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        {getPhoneCode().map((item) => {
          const { key, extra } = item;
          return <Option key={key}>{extra.dial_code}</Option>;
        })}
      </Select>
    </Form.Item>
  );
  // console.log(form.getFieldValue());

  function getPhoneCode() {
    const arr = [];
    for (let item in candidate?.phones) {
      const { phone_code } = candidate?.phones[item];
      arr.push(phone_code);
    }
    return arr;
  }

  getPhoneCode();

  function getPhone() {
    const arr = [];
    for (let item in candidate?.phones) {
      const { number } = candidate?.phones[item];
      arr.push(number);
    }
    return arr;
  }

  return (
    <>
      <Header />
      <div className="app-body">
        <main className="main">
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["candidates"]}
            style={{
              left: "0px",
              width: "100%",
              zIndex: "999",
              backgroundColor: "rgb(255, 255, 255)",
              paddingLeft: "10px",
            }}
          >
            <Menu.Item key="candidates" icon={<SolutionOutlined />}>
              Candidates
            </Menu.Item>
            <Menu.Item key="clients" icon={<TeamOutlined />}>
              Clients
            </Menu.Item>
            <Menu.Item key="jobs" icon={<ScheduleOutlined />}>
              Jobs
            </Menu.Item>
            <Menu.Item key="system-users" icon={<UserOutlined />}>
              System Users
            </Menu.Item>
            <Menu.Item key="group-user" icon={<UserOutlined />}>
              Group User
            </Menu.Item>
            <Menu.Item key="mega-search" icon={<SearchOutlined />}>
              Mega Search
            </Menu.Item>
          </Menu>
          <Form form={form} layout={formLayout}>
            <div className="container-fluid">
              <Row style={{ paddingTop: "18px" }}>
                <Col
                  span={14}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className="site-card-border-less-wrapper">
                    <Breadcrumb>
                      <Breadcrumb.Item>
                        <a href="/">Candidate List</a>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>
                        {candidate.candidate_id} -{" "}
                        {candidate.full_name?.toUpperCase()} -{" "}
                        {candidate.priority_status === 1 && "ACTIVE"}
                        {candidate.priority_status === -1 && "OFF-LIMIT"}
                        {candidate.priority_status === -2 && "BLACKLIST"}
                        {candidate.priority_status === 5 && "INACTIVE"} -{" "}
                        {candidate.flow_status === 1 && <span>Raw</span>}
                        {candidate.flow_status === 2 && (
                          <span>Screening Call</span>
                        )}
                        {candidate.flow_status === 3 && (
                          <span>Interview with NADH</span>
                        )}
                        {candidate.flow_status === 4 && (
                          <span>Shortlisting</span>
                        )}
                        {candidate.flow_status === 5 && (
                          <span>Submit to Client</span>
                        )}
                        {candidate.flow_status === 6 && (
                          <span>Interview with Client</span>
                        )}
                        {candidate.flow_status === 7 && (
                          <span>Reference Check</span>
                        )}
                        {candidate.flow_status === 8 && (
                          <span>Negotiation</span>
                        )}
                        {candidate.flow_status === 9 && (
                          <span>Offer Accepted</span>
                        )}
                        {candidate.flow_status === 10 && <span>Placement</span>}
                        {candidate.flow_status === 11 && <span>Follow-up</span>}
                        {candidate.flow_status === 12 && (
                          <span>Replacement</span>
                        )}
                        {candidate.flow_status === -1 && (
                          <span>Candidate Declined</span>
                        )}
                        {candidate.flow_status === -2 && (
                          <span>Rejected by NADH</span>
                        )}
                        {candidate.flow_status === -3 && (
                          <span>Rejected by Client</span>
                        )}
                        {candidate.flow_status === -4 && (
                          <span>Client Canceled</span>
                        )}
                      </Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                </Col>
                <Col span={10}>
                  <Button type="primary" style={{ float: "right" }}>
                    View File PDF
                  </Button>
                  <Button
                    type="primary"
                    style={{ float: "right", marginRight: "12px" }}
                  >
                    Dowload File PDF
                  </Button>
                </Col>
              </Row>
              <Row style={{ paddingTop: "10px" }}>
                <Col span={16}>
                  <div
                    className="site-card-border-less-wrapper"
                    style={{
                      marginBottom: "24px",
                    }}
                  >
                    <Card
                      title="Overview"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      <TextArea rows={4} placeholder="Overview" />
                    </Card>
                  </div>
                  <div className="site-card-border-less-wrapper">
                    <Card
                      title="Personal Information"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      <Row>
                        <Col span={12}>
                          <Form.Item
                            label="First Name"
                            name="first_name"
                            rules={[
                              {
                                required: true,
                                message: "Please input your firstname!",
                              },
                            ]}
                          >
                            <Input placeholder="Please input your first name" />
                          </Form.Item>
                        </Col>
                        <Col span={12} style={{ padding: "0 15px" }}>
                          <Form.Item
                            label="Last Name"
                            name="last_name"
                            rules={[
                              {
                                required: true,
                                message: "Please input your lastname!",
                              },
                            ]}
                          >
                            <Input placeholder="Please input your last name" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={12}>
                          <Form.Item
                            label="Middle Name"
                            name="middle_name"
                            rules={[
                              {
                                message: "Please input your middlename!",
                              },
                            ]}
                          >
                            <Input placeholder="Please input your middle name" />
                          </Form.Item>
                        </Col>
                        <Col span={12} style={{ padding: "0 15px" }}>
                          <Form.Item
                            label="Primary Status"
                            name="priority_status"
                            rules={[
                              {
                                required: true,
                                message: "Please input your lastname!",
                              },
                            ]}
                          >
                            <Select
                              defaultValue="1"
                              onChange={handleChangeData}
                            >
                              {candidate_priority_status.map((item) => {
                                return (
                                  <Option
                                    key={item.id}
                                    value={Number(item.key)}
                                  >
                                    {item.label}
                                  </Option>
                                );
                              })}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={12}>
                          <Form.Item
                            label="Birthday"
                            name="dob"
                            rules={[
                              {
                                message: "Please choose your date!",
                              },
                            ]}
                          >
                            <Row>
                              <Col span={8} style={{ paddingRight: "10px" }}>
                                <Select allowClear placeholder="Date">
                                  {date}
                                </Select>
                              </Col>
                              <Col span={8} style={{ paddingRight: "10px" }}>
                                <Select allowClear placeholder="Month">
                                  {month}
                                </Select>
                              </Col>
                              <Col span={8}>
                                <Select allowClear placeholder="Year">
                                  {year}
                                </Select>
                              </Col>
                            </Row>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={12}>
                          <Form.Item label="Gender" name="gender">
                            <Radio.Group
                              onChange={handleClickGender}
                              name="gender"
                            >
                              <Radio value={1}>Male</Radio>
                              <Radio value={2}>Female</Radio>
                              <Radio value={3}>Complicated</Radio>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                        <Col span={12} style={{ padding: "0 15px" }}>
                          <Form.Item
                            label="Marital Status"
                            name="martial_status"
                          >
                            <Radio.Group onChange={handleClickMaritalStatus}>
                              <Radio value={1}>Yes</Radio>
                              <Radio value={-1}>No</Radio>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={12}>
                          <Form.Item
                            label="Ready To Move"
                            name="relocating_willingness"
                          >
                            <Select defaultValue="Yes">
                              <Option value={1}>Yes</Option>
                              <Option value={-1}>No</Option>
                              <Option value={2}>Available</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={12} style={{ padding: "0 15px" }}>
                          <Form.Item label="Source" name="source">
                            <Input placeholder="Please input your source" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={12}>
                          <Form.Item label="Created By" name="creator">
                            <Input disabled />
                          </Form.Item>
                        </Col>
                        <Col span={12} style={{ padding: "0 15px" }}>
                          <Form.Item label="Created On" name="createdAt">
                            <Input disabled />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={14}>
                          <p style={{ marginBottom: "8px" }}>
                            <span
                              style={{
                                display: "inlineBlock",
                                marginRight: "4px",
                                color: "#ff4d4f",
                                fontSize: "14px",
                                lineHeight: "1",
                                content: "*",
                                padding: "0 0 8px",
                                fontFamily: "SimSun, sans-serif",
                              }}
                            >
                              *
                            </span>
                            Email
                          </p>
                          <Form.List name="emails" label="Email">
                            {(fields, { add, remove }, { errors }) => (
                              <>
                                {fields.map((field, index) => (
                                  <Form.Item key={field.key}>
                                    <Form.Item
                                      label="Email"
                                      key={field.key}
                                      {...field}
                                      validateTrigger={["onChange", "onBlur"]}
                                      rules={[
                                        {
                                          required: true,
                                          whitespace: true,
                                          message:
                                            "Please input your valid email",
                                        },
                                      ]}
                                      noStyle
                                    >
                                      <Input
                                        placeholder="ex: email@email.com"
                                        style={{
                                          width: "96%",
                                        }}
                                      />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                      <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                        style={{
                                          marginLeft: "10px",
                                          color: "red",
                                        }}
                                      />
                                    ) : null}
                                  </Form.Item>
                                ))}
                                <Form.Item>
                                  <Button
                                    type="primary"
                                    ghost
                                    onClick={() => add()}
                                    style={{
                                      width: "96%",
                                    }}
                                    icon={<PlusOutlined />}
                                  >
                                    Add field
                                  </Button>
                                  <Form.ErrorList errors={errors} />
                                </Form.Item>
                              </>
                            )}
                          </Form.List>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={14}>
                          <p style={{ marginBottom: "8px" }}>
                            <span
                              style={{
                                display: "inlineBlock",
                                marginRight: "4px",
                                color: "#ff4d4f",
                                fontSize: "14px",
                                lineHeight: "1",
                                content: "*",
                                padding: "0 0 8px",
                                fontFamily: "SimSun, sans-serif",
                              }}
                            >
                              *
                            </span>
                            Phones
                          </p>
                          <Form.List name="phones">
                            {(fields, { add, remove }, { errors }) => (
                              <>
                                {fields.map((field, index) => (
                                  <Form.Item key={field.key}>
                                    <Form.Item
                                      key={field.key}
                                      {...field}
                                      validateTrigger={["onChange", "onBlur"]}
                                      rules={[
                                        {
                                          required: true,
                                          whitespace: true,
                                          message:
                                            "Please input your phone number",
                                        },
                                      ]}
                                      noStyle
                                    >
                                      <Input
                                        addonBefore={prefixSelector}
                                        placeholder="ex: 123456789"
                                        style={{
                                          width: "96%",
                                        }}
                                      />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                      <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                        style={{
                                          marginLeft: "10px",
                                          color: "red",
                                        }}
                                      />
                                    ) : null}
                                  </Form.Item>
                                ))}
                                <Form.Item>
                                  <Button
                                    type="primary"
                                    ghost
                                    onClick={() => add()}
                                    style={{
                                      width: "96%",
                                    }}
                                    icon={<PlusOutlined />}
                                  >
                                    Add field
                                  </Button>
                                  <Form.ErrorList errors={errors} />
                                </Form.Item>
                              </>
                            )}
                          </Form.List>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={6}>
                          <Form.Item label="Address" name="address">
                            <Select defaultValue="lucy" allowClear>
                              <Option value="lucy">Lucy</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            label="City"
                            name="city"
                            style={{ marginLeft: "15px" }}
                          >
                            <Select defaultValue="lucy" allowClear>
                              <Option value="lucy">Lucy</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            label="District"
                            name="disctrict"
                            style={{ marginLeft: "15px" }}
                          >
                            <Select defaultValue="lucy" allowClear>
                              <Option value="lucy">Lucy</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <Form.Item label="Nationality" name="nationality">
                            <Select
                              mode="multiple"
                              allowClear
                              style={{
                                width: "100%",
                              }}
                              placeholder="Please select or add "
                              onChange={handleChange}
                            >
                              {nationality.map((item) => {
                                const { key, label } = item;
                                return (
                                  <Option key={key} value={key}>
                                    {label}
                                  </Option>
                                );
                              })}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <Form.Item label="Position Applied" name="positions">
                            <Select
                              mode="multiple"
                              allowClear
                              style={{
                                width: "100%",
                              }}
                              placeholder="Please select or add "
                              onChange={handleChange}
                            >
                              {position.map((item) => {
                                const { key, label } = item;
                                return (
                                  <Option key={key} value={key}>
                                    {label}
                                  </Option>
                                );
                              })}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <Form.Item
                            label="Highest Education"
                            name="highest_education"
                          >
                            <Select defaultValue="Yes">
                              <Option value={382}>Associate</Option>
                              <Option value={383}>Bachelor</Option>
                              <Option value={384}>Master</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={12}>
                          <Form.Item
                            label="Industry Year of Services"
                            name="industry_years"
                          >
                            <InputNumber
                              placeholder="0"
                              min={0}
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12} style={{ padding: "0 15px" }}>
                          <Form.Item
                            label="Year of Management"
                            name="management_years"
                          >
                            <InputNumber
                              placeholder="0"
                              min={0}
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={12}>
                          <Form.Item
                            label="No. of Direct Reports"
                            name="direct_reports"
                          >
                            <InputNumber
                              placeholder="0"
                              min={0}
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </div>
                </Col>
                <Col span={8}></Col>
              </Row>
            </div>
          </Form>
        </main>
      </div>
    </>
  );
}

export default EditCandidatePage;
