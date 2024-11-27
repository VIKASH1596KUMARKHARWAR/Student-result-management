import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { RiUserStarLine, RiBook2Line } from "react-icons/ri";
import { FaClipboardList } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-5">
            <span className="sm-logo">SRMS</span>
            <span className="lg-logo">Student Result Management System</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            navigate(key);
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "students",
              icon: <RiUserStarLine className="fs-4" />,
              label: "Students",
            },
            {
              key: "results",
              icon: <FaClipboardList className="fs-4" />,
              label: "Results",
            },
            {
              key: "subjects",
              icon: <RiBook2Line className="fs-4" />,
              label: "Subjects",
            },
            {
              key: "attendance",
              icon: <RiBook2Line className="fs-4" />,
              label: "Attendance",
            },
            {
              key: "create-new-result",
              icon: <RiBook2Line className="fs-4" />,
              label: "Create Result",
            },
            {
              key: "reports",
              icon: <FaClipboardList className="fs-4" />,
              label: "Reports",
            },
          ]}
        />
      </Sider>
      <Layout className={`site-layout ${collapsed ? 'collapsed' : ''}`}>
        <Header
          className="d-flex justify-content-between align-items-center ps-1 pe-5"
          style={{
            padding: 0,
            background: "#f0f8ff",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Toggle Button */}
          <div style={{ zIndex: 2 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
                style: {
                  fontSize: '24px',
                  color: '#000',
                  cursor: 'pointer',
                  marginRight: '16px',
                  padding: '10px',
                  borderRadius: '4px',
                  transition: 'background-color 0.3s',
                  backgroundColor: 'transparent',
                  zIndex: 10, // Ensure it's above other elements
                },
                onMouseEnter: (e) => e.currentTarget.style.backgroundColor = '#e6f7ff',
                onMouseLeave: (e) => e.currentTarget.style.backgroundColor = 'transparent',
              }
            )}
          </div>
          <div className="d-flex gap-4 align-items-center">
            <div className="d-flex gap-3 align-items-center dropdown">
              <img
                width={32}
                height={32}
                src="https://example.com/your-profile-image.jpg"
                alt="Profile"
                className="img-fluid rounded-circle"
              />
              <div className="dropdown">
                <h5 className="mb-0">Vikash</h5>
                <p className="mb-0">your-email@example.com</p>
                <div className="dropdown-menu">
                  <Link className="dropdown-item" to="/profile">
                    View Profile
                  </Link>
                  <Link className="dropdown-item" to="/admin/students">
                    Students
                  </Link>
                  <Link className="dropdown-item" to="/admin/results">
                    Results
                  </Link>
                  <Link className="dropdown-item" to="/admin/subjects/1">
                    Subjects (Semester 1)
                  </Link>
                  <Link className="dropdown-item" to="/admin/subjects/2">
                    Subjects (Semester 2)
                  </Link>
                  <Link className="dropdown-item" to="/admin/attendance">
                    Attendance
                  </Link>
                  <Link className="dropdown-item" to="/signout">
                    Signout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
