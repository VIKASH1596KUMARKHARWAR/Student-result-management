// src/components/Dashboard.js
import React from 'react';
import { useUser } from '../UserContext'; // Import the user context

const userDashboard = () => {
    const { user } = useUser(); // Access user info from context

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            {user ? (
                <div className="user-info">
                    <h3>Welcome, {user.name}!</h3>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                </div>
            ) : (
                <p>Please log in to see your dashboard.</p>
            )}
        </div>
    );
};

export default userDashboard;
