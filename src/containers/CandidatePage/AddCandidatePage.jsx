import {
  ScheduleOutlined,
  SearchOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Menu,
  Typography,
  Form,
  Steps,
  Card,
  Row,
  Col,
  Input,
  Select,
  Button,
  InputNumber,
  Radio,
  message,
} from "antd";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import locationApi from "../../api/locationApi";
import propertyApi from "../../api/propertyApi";
function AddCandidatePage(props) {
  const { Title } = Typography;
  const { Step } = Steps;
  const { Option } = Select;
  const [formLayout, setFormLayout] = useState("vertical");
  const [nationality, setNationality] = useState([]);
  const [position, setPosition] = useState([]);
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Personal Information",
    },
    {
      title: "Skills and Industry",
    },
    {
      title: "Education and Certificate",
    },
    {
      title: "Working History",
    },
    {
      title: "Remunertion and Rewards",
    },
    {
      title: "Finish",
    },
  ];
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

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

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
          <div className="container-fluid">
            <div
              className="site-card-border-less-wrapper"
              style={{ paddingTop: "18px" }}
            >
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/">Candidate List </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Create Candidate</Breadcrumb.Item>
              </Breadcrumb>
              <Title level={3} style={{ padding: "12px 0", margin: "0" }}>
                Create Candidate
              </Title>
              <Steps>
                {steps.map((item) => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
              <Form layout={formLayout}>
                <div
                  className="site-card-border-less-wrapper"
                  style={{ paddingTop: "18px" }}
                ></div>
                <Row style={{ paddingTop: "10px" }}>
                  <Col span={24}>
                    <div className="site-card-border-less-wrapper">
                      <Card title="Personal Information" bordered={false}>
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
                              <Select placeholder="Please select primary status">
                                <Option value="1">Active</Option>
                                <Option value="-1">Off-limit</Option>
                                <Option value="-2">Blacklist</Option>
                                <Option value="5">Inactive</Option>
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
                              <Radio.Group name="gender">
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
                              <Radio.Group>
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
                                              "Please input your valid email!",
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
                            <Form.Item
                              label="Position Applied"
                              name="positions"
                            >
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
                              <Select placeholder="Please select or add ">
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
                        <Row>
                          <Col span={24}>
                            <div
                              className="steps-action"
                              style={{ float: "right" }}
                            >
                              {current < steps.length - 1 && (
                                <Button type="primary" onClick={() => next()}>
                                  Create and Next
                                </Button>
                              )}
                              {current === steps.length - 1 && (
                                <Button
                                  type="primary"
                                  onClick={() =>
                                    message.success("Processing complete!")
                                  }
                                >
                                  Done
                                </Button>
                              )}
                              {current > 0 && (
                                <Button
                                  style={{
                                    margin: "0 8px",
                                  }}
                                  onClick={() => prev()}
                                >
                                  Previous
                                </Button>
                              )}
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default AddCandidatePage;
