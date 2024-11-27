// pages/Students.js
import React from 'react';
import StudentsList from './StudentsList'; // Adjust the path if necessary

const Students = () => {
    const alertMessage = "Welcome to the student list!";
    const removedUser = false; // You can toggle this based on your application's state

    return (
        <div className="container">
            <h2>{alertMessage}</h2>
            <StudentsList alert={alertMessage} removedUser={removedUser} />
        </div>
    );
};

export default Students;
