import React from "react";
import { Line } from "@ant-design/charts";
import { Card, Progress, Statistic } from "antd";


const Dashboard = () => {
    // Sample data for the line chart
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
        // Add a smooth line style
        smooth: true,
    };

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-header">Student Result Management Dashboard</h2>
            <div className="dashboard-statistics d-block">
    <Card style={{ width: "100%", marginBottom: "16px", display: "block" }}>
        <Statistic title="Total Students" value={500} />
    </Card>
    <Card style={{ width: "100%", marginBottom: "16px", display: "block" }}>
        <Statistic title="Average Score" value={75} suffix="%" />
    </Card>
    <Card style={{ width: "100%", marginBottom: "16px", display: "block" }}>
        <Statistic title="Passed Students" value={450} suffix=" students" />
    </Card>
    <Card style={{ width: "100%", marginBottom: "16px", display: "block" }}>
        <Statistic title="Failed Students" value={50} suffix=" students" />
    </Card>
</div>

            <div className="dashboard-card">
                <h3 className="dashboard-card-title">Student Performance Over Years</h3>
                <Line {...config} />
            </div>

            <div className="dashboard-card">
                <h3 className="dashboard-card-title">Results Distribution</h3>
                <Progress percent={90} type="line" />
                <Progress percent={80} type="line" />
                <Progress percent={70} type="line" />
            </div>

            <div className="dashboard-card">
                <h3 className="dashboard-card-title">Top Achievers</h3>
                <ul>
                    <li>Student A - 95%</li>
                    <li>Student B - 92%</li>
                    <li>Student C - 90%</li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
