import React, { useState } from 'react';
import UserForm from './UserForm'; // Assuming you have the UserForm component
import { addStudent } from './api'; // Import the addStudent function
import { Link } from 'react-router-dom';

const AddUser = () => {
    const [userData, setUserData] = useState({});
    const [alert, setAlert] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if userData contains an id
        if (!userData.id) {
            setAlert('ID is required.');
            return;
        }

        try {
            await addStudent(userData); // Call the API to add the student
            setAlert('User added successfully!');
            setUserData({}); // Reset form after successful submission
        } catch (error) {
            console.error('Error adding user:', error);
            setAlert('Failed to add user. Please try again.');
        }
    };


    return (
        <div className="container">
            {/* Breadcrumb Navigation */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/admin/students">Students</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        New User
                    </li>
                </ol>
            </nav>

            {/* Conditional Alert Message */}
            {alert && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {alert}
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                        onClick={() => setAlert('')}
                    ></button>
                </div>
            )}

            {/* Form for Adding User */}
            <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
                {/* Pass userData and setUserData to UserForm to handle new user input */}
                <UserForm userData={userData} setUserData={setUserData} />

                {/* Submit Button */}
                <div className="col-12">
                    <button className="btn btn-primary w-100" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddUser;
