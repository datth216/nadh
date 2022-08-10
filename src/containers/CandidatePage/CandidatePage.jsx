import {
  EyeOutlined,
  PlusOutlined,
  ScheduleOutlined,
  SearchOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Input, Menu, Space, Table, Tag, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";
import userApi from "../../api/userApi";
import Header from "../../components/Header/Header";
import "./CandidatePage.scss";

function CandidatePage(props) {
  const { Link } = Typography;
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [candidateList, setCandidateList] = useState([]);

  useEffect(() => {
    const getCandidateList = async () => {
      try {
        const response = await userApi.getAll();
        const data = await response.data;
        console.log(data);
        setCandidateList(data);
      } catch (error) {
        console.log({ error });
      }
    };
    getCandidateList();
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const navigate = useNavigate();

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "candidate_id",
      key: "candidate_id",
      width: 120,
      render: (text, record) => {
        return (
          <span
            style={{
              cursor: "pointer",
              textTransform: "capitalize",
              color: "#1890FF",
            }}
            onClick={() => navigate(`/candidates-edit/${record.candidate_id}`)}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "full_name",
      key: "full_name",
      width: 150,
      render: (text, record) => {
        return (
          <span
            style={{
              cursor: "pointer",
              textTransform: "capitalize",
              color: "#1890FF",
            }}
            onClick={() => navigate(`/candidates-edit/${record.candidate_id}`)}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: "Primary Status",
      dataIndex: "priority_status",
      key: "priority_status",
      width: 100,
      render: (record) => {
        return (
          <div>
            {record === 1 && <Tag color="green">Active</Tag>}
            {record === -1 && <Tag color="geekblue">Off-limit</Tag>}
            {record === -2 && <Tag color="magenta">Blacklist</Tag>}
            {record === 5 && <Tag color="red">Inactive</Tag>}
          </div>
        );
      },
    },
    {
      title: "Languages",
      dataIndex: "languages",
      key: "languages",
      width: 200,
      render: (text, record) => {
        return text.map((item) => <p key={item.key}> {`-` + item.label}</p>);
      },
    },
    {
      title: "Highest Degree",
      dataIndex: ["highest_education", "label"],
      key: "label",
      width: 130,
    },
    {
      title: "City",
      dataIndex: "",
      key: "",
      width: 100,
      render: (record) => {
        const obj = record.addresses;
        if (obj.length === 0) return;

        const data = obj.map((item) => {
          const country = item.country.label;
          const city = item.city?.label;

          const obj = {
            key: `${item.country.key}${
              item.city?.key
                ? item?.city.key
                : Math.floor(Math.random() * 10000)
            }`,
            country: country,
            city: city,
          };

          return obj;
        });

        return data.map((item) => {
          return (
            <p key={item.key}>
              {item.country} {`${item.city ? ` - ${item.city}` : ""} `}
            </p>
          );
        });
      },
    },
    {
      title: "Industry",
      dataIndex: "business_line",
      key: "business_line",
      width: 200,
      render: (text, record) => {
        if (text.length === 0) return;
        return text.map((item) => {
          const { sector, category, industry } = item;
          return (
            <p key={`${sector?.id} ${category?.id} ${industry?.id}`}>
              *{sector?.label}
            </p>
          );
        });
      },
    },
    {
      title: "YOB",
      dataIndex: "dob",
      key: "dob",
      render: (record) => {
        return record?.substring(0, 4);
      },
      width: 80,
    },
    {
      title: "Activity",
      dataIndex: "flow_status",
      key: "flow_status",
      width: 180,
      render: (text) => {
        return (
          <>
            {text === 1 && <span>Raw</span>}
            {text === 2 && <span>Screening Call</span>}
            {text === 3 && <span>Interview with NADH</span>}
            {text === 4 && <span>Shortlisting</span>}
            {text === 5 && <span>Submit to Client</span>}
            {text === 6 && <span>Interview with Client</span>}
            {text === 7 && <span>Reference Check</span>}
            {text === 8 && <span>Negotiation</span>}
            {text === 9 && <span>Offer Accepted</span>}
            {text === 10 && <span>Placement</span>}
            {text === 11 && <span>Follow-up</span>}
            {text === 12 && <span>Replacement</span>}
            {text === -1 && <span>Candidate Declined</span>}
            {text === -2 && <span>Rejected by NADH</span>}
            {text === -3 && <span>Rejected by Client</span>}
            {text === -4 && <span>Client Canceled</span>}
          </>
        );
      },
    },
    {
      title: "Recent Companies",
      dataIndex: "current_employments",
      key: "current_employments",
      width: 200,
      render: (text) => {
        return text.map((item) => {
          const { label, key } = item.organization;
          return <p key={key}>{`- ` + label}</p>;
        });
      },
    },
    {
      title: "Recent Positions",
      dataIndex: "current_employments",
      key: "current_employments",
      width: 200,
      render: (text) => {
        return text.map((item) => {
          const { label, key } = item.title;
          return <p key={key}>{`- ` + label}</p>;
        });
      },
    },
    {
      title: "Year Of Services",
      dataIndex: "industry_years",
      key: "industry_years",
      width: 120,
      ...getColumnSearchProps("industry_years"),
    },
    {
      title: "Year Of Management",
      dataIndex: "management_years",
      key: "management_years",
      width: 150,
      ...getColumnSearchProps("management_years"),
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "",
      width: 100,
      fixed: "right",
      render: (text, record) => {
        return (
          <div className="anticon-eye" style={{ paddingLeft: "17px" }}>
            <EyeOutlined
              onClick={() =>
                navigate(`/candidates-edit/${record.candidate_id}`)
              }
            />
          </div>
        );
      },
    },
  ];

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
              style={{
                marginTop: "25px",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
            >
              <Card
                title="Candidates List (100)"
                bordered={false}
                extra={
                  <div>
                    <Button type="primary" ghost>
                      Clear All Filters
                    </Button>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      style={{ marginLeft: "16px" }}
                      onClick={() => {
                        navigate("/candidates-add");
                      }}
                    >
                      Create Candidate
                    </Button>
                  </div>
                }
                style={{ border: "none" }}
              >
                <Table
                  columns={columns}
                  dataSource={candidateList || []}
                  rowKey="id"
                  scroll={{
                    x: 1950,
                  }}
                  pagination={{
                    showQuickJumper: true,
                    showSizeChanger: false,
                  }}
                />
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default CandidatePage;
