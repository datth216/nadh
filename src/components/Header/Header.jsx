import "antd/dist/antd.css";
import {
  UserOutlined,
  LockOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu, Avatar } from "antd";
import React from "react";
import logo from "../../assets/images/logo_white.png";
import "./Header.scss";
import { useNavigate, Link } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  const menu = (
    <Menu
      items={[
        {
          label: "User Information",
          key: "1",
          icon: <InfoCircleOutlined />,
        },
        {
          label: "Log Out",
          key: "2",
          icon: <LockOutlined />,
          onClick: handleLogout,
        },
      ]}
    />
  );

  return (
    <header className="app-header navbar" id="header">
      <span className="navbar__brand">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </span>
      <span className="navbar__logout">
        <Dropdown.Button
          placement="bottom"
          overlay={menu}
          icon={<UserOutlined />}
        ></Dropdown.Button>
      </span>
    </header>
  );
}

export default Header;
