// import React from "react";
// import { Line } from "@ant-design/charts";
// import { Card, Progress, Statistic } from "antd";


// const Dashboard = () => {
//     // Sample data for the line chart
//     const data = [
//         { year: "2019", value: 30 },
//         { year: "2020", value: 50 },
//         { year: "2021", value: 80 },
//         { year: "2022", value: 70 },
//         { year: "2023", value: 90 },
//     ];

//     const config = {
//         data,
//         xField: "year",
//         yField: "value",
//         point: {
//             size: 5,
//             shape: "diamond",
//         },
//         label: {
//             style: {
//                 fill: "#aaa",
//             },
//         },
//         // Add a smooth line style
//         smooth: true,
//     };

//     return (
//         <div className="dashboard-container">
//             <h2 className="dashboard-header">Student Result Management Dashboard</h2>


//             <div className="dashboard-card">
//                 <h3 className="dashboard-card-title">Student Performance Over Years</h3>
//                 <Line {...config} />
//             </div>

//             <div className="dashboard-card">
//                 <h3 className="dashboard-card-title">Results Distribution</h3>
//                 <Progress percent={90} type="line" />
//                 <Progress percent={80} type="line" />
//                 <Progress percent={70} type="line" />
//             </div>

//             <div className="dashboard-card">
//                 <h3 className="dashboard-card-title">Top Achievers</h3>
//                 <ul>
//                     <li>Student A - 95%</li>
//                     <li>Student B - 92%</li>
//                     <li>Student C - 90%</li>
//                 </ul>
//             </div>
//             <div className="dashboard-statistics d-block">
//                 <Card style={{ width: "100%", marginBottom: "16px", display: "block" }}>
//                     <Statistic title="Total Students" value={500} />
//                 </Card>
//                 <Card style={{ width: "100%", marginBottom: "16px", display: "block" }}>
//                     <Statistic title="Average Score" value={75} suffix="%" />
//                 </Card>
//                 <Card style={{ width: "100%", marginBottom: "16px", display: "block" }}>
//                     <Statistic title="Passed Students" value={450} suffix=" students" />
//                 </Card>
//                 <Card style={{ width: "100%", marginBottom: "16px", display: "block" }}>
//                     <Statistic title="Failed Students" value={50} suffix=" students" />
//                 </Card>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;


// import React from "react";
// import { Line } from "@ant-design/charts";
// import { Card, Progress, Statistic, Row, Col, Typography } from "antd";

// const { Title } = Typography;

// const Dashboard = () => {
//     const data = [
//         { year: "2019", value: 30 },
//         { year: "2020", value: 50 },
//         { year: "2021", value: 80 },
//         { year: "2022", value: 70 },
//         { year: "2023", value: 90 },
//     ];

//     const config = {
//         data,
//         xField: "year",
//         yField: "value",
//         point: {
//             size: 5,
//             shape: "diamond",
//         },
//         label: {
//             style: {
//                 fill: "#aaa",
//             },
//         },
//         smooth: true,
//         color: "#1890ff",
//     };

//     return (
//         <div style={{ padding: "24px", background: "#f5f7fa", minHeight: "100vh" }}>
//             <Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
//                 Student Result Management Dashboard
//             </Title>

//             <Row gutter={[24, 24]}>
//                 {/* Performance Chart */}
//                 <Col xs={24} md={16}>
//                     <Card
//                         title="Student Performance Over Years"
//                         style={{ borderRadius: 12 }}
//                         headStyle={{ background: "#e6f7ff" }}
//                     >
//                         <Line {...config} />
//                     </Card>
//                 </Col>

//                 {/* Results Distribution */}
//                 <Col xs={24} md={8}>
//                     <Card
//                         title="Results Distribution"
//                         style={{ borderRadius: 12 }}
//                         headStyle={{ background: "#fffbe6" }}
//                     >
//                         <p>Above 90%</p>
//                         <Progress percent={90} status="active" strokeColor="#52c41a" />
//                         <p>Above 80%</p>
//                         <Progress percent={80} status="active" strokeColor="#1890ff" />
//                         <p>Above 70%</p>
//                         <Progress percent={70} status="active" strokeColor="#faad14" />
//                     </Card>
//                 </Col>

//                 {/* Top Achievers */}
//                 <Col xs={24} md={8}>
//                     <Card
//                         title="Top Achievers"
//                         style={{ borderRadius: 12 }}
//                         headStyle={{ background: "#f6ffed" }}
//                     >
//                         <ul style={{ paddingLeft: 20 }}>
//                             <li>🎓 Student A - 95%</li>
//                             <li>🎓 Student B - 92%</li>
//                             <li>🎓 Student C - 90%</li>
//                         </ul>
//                     </Card>
//                 </Col>

//                 {/* Statistics */}
//                 <Col xs={24} md={16}>
//                     <Row gutter={[16, 16]}>
//                         {[
//                             { title: "Total Students", value: 500 },
//                             { title: "Average Score", value: 75, suffix: "%" },
//                             { title: "Passed Students", value: 450, suffix: " students" },
//                             { title: "Failed Students", value: 50, suffix: " students" },
//                         ].map((stat, idx) => (
//                             <Col xs={12} md={12} key={idx}>
//                                 <Card
//                                     className="custom-stat-card"
//                                     style={{ borderRadius: 10, backgroundColor: "#fafafa" }}
//                                 >
//                                     <Statistic
//                                         title={stat.title}
//                                         value={stat.value}
//                                         suffix={stat.suffix || ""}
//                                     />
//                                 </Card>
//                             </Col>
//                         ))}
//                     </Row>
//                 </Col>
//             </Row>
//         </div>
//     );
// };

// export default Dashboard;


import React from "react";
import { Line } from "@ant-design/charts";
import { Card, Progress, Statistic, Row, Col, Typography } from "antd";

const { Title } = Typography;

const Dashboard = () => {
    const data = [
        { year: "2019", value: 30 },
        { year: "2020", value: 50 },
        { year: "2021", value: 80 },
        { year: "2022", value: 70 },
        { year: "2023", value: 90 },
    ];

    const config = {
        data,
        xField: "year",
        yField: "value",
        point: {
            size: 5,
            shape: "diamond",
        },
        label: {
            style: {
                fill: "#aaa",
            },
        },
        smooth: true,
        color: "#1890ff",
    };

    return (
        <div
            style={{
                padding: "24px",
                background: "linear-gradient(to bottom right, rgb(182, 84, 71), rgb(79, 160, 225))",
                minHeight: "100vh",
                borderRadius: "16px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)"
            }}

        >



            <Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
                🎓 Student Result Management Dashboard
            </Title>

            <Row gutter={[24, 24]}>
                {/* Performance Chart */}
                <Col xs={24} md={16}>
                    <Card
                        title="📈 Student Performance Over Years"
                        style={{
                            borderRadius: 12,
                            background: "linear-gradient(to right, #e0f7fa, #ffffff)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                        headStyle={{ background: "#bae7ff", fontWeight: "bold" }}
                    >
                        <Line {...config} />
                    </Card>
                </Col>

                {/* Results Distribution */}
                <Col xs={24} md={8}>
                    <Card
                        title="📊 Results Distribution"
                        style={{
                            borderRadius: 12,
                            background: "linear-gradient(to right, #fffbe6, #ffffff)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                        headStyle={{ background: "#fff1b8", fontWeight: "bold" }}
                    >
                        <p>Above 90%</p>
                        <Progress percent={90} status="active" strokeColor="#52c41a" />
                        <p>Above 80%</p>
                        <Progress percent={80} status="active" strokeColor="#1890ff" />
                        <p>Above 70%</p>
                        <Progress percent={70} status="active" strokeColor="#faad14" />
                    </Card>
                </Col>

                {/* Top Achievers */}
                <Col xs={24} md={8}>
                    <Card
                        title="🏅 Top Achievers"
                        style={{
                            borderRadius: 12,
                            background: "linear-gradient(to right, #f6ffed, #ffffff)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                        headStyle={{ background: "#d9f7be", fontWeight: "bold" }}
                    >
                        <ul style={{ paddingLeft: 20, fontSize: 16 }}>
                            <li>🎓 Student A - 95%</li>
                            <li>🎓 Student B - 92%</li>
                            <li>🎓 Student C - 90%</li>
                        </ul>
                    </Card>
                </Col>

                {/* Statistics */}
                <Col xs={24} md={16}>
                    <Row gutter={[16, 16]}>
                        {[
                            {
                                title: "👥 Total Students",
                                value: 500,
                                bg: "#e6f7ff",
                            },
                            {
                                title: "📊 Average Score",
                                value: 75,
                                suffix: "%",
                                bg: "#fff1f0",
                            },
                            {
                                title: "✅ Passed Students",
                                value: 450,
                                suffix: " students",
                                bg: "#f6ffed",
                            },
                            {
                                title: "❌ Failed Students",
                                value: 50,
                                suffix: " students",
                                bg: "#fff0f6",
                            },
                        ].map((stat, idx) => (
                            <Col xs={12} md={12} key={idx}>
                                <Card
                                    style={{
                                        borderRadius: 12,
                                        backgroundColor: stat.bg,
                                        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                                    }}
                                >
                                    <Statistic
                                        title={stat.title}
                                        value={stat.value}
                                        suffix={stat.suffix || ""}
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
