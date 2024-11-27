import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getStudentById } from './api'; // Ensure correct import path

const StudentDetail = () => {
    const { id } = useParams(); // Get the student ID from the URL
    const [student, setStudent] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const data = await getStudentById(id); // Fetch student by ID
                setStudent(data); // Set the student data
                console.log( setStudent(data));
            } catch (error) {
                console.error('Error fetching student:', error);
                setError('Student not found');
            }
        };

        fetchStudent();
    }, [id]); // Effect runs when the component mounts or when `id` changes

    if (error) {
        return <div>{error}</div>; // Display error if there is one
    }

    if (!student) {
        return <div>Loading...</div>; // Display loading state while fetching
    }

    // Render the student details
    return (
        <div>
            <nav aria-label="breadcrumb">
    <ol className="breadcrumb">
        <li className="breadcrumb-item">
            <Link to="/admin/students">Students</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
            Student ID:  {student.id}
        </li>
    </ol>
</nav>
            <h2>Student Details</h2>
            <p><strong>ID:</strong> {student.id}</p>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Batch:</strong> {student.batch}</p>
            <p><strong>Gender:</strong> {student.gender}</p>
            <p><strong>Department:</strong> {student.department}</p>
            <p><strong>Phone:</strong> {student.phone}</p>
            <p><strong>Email:</strong> {student.email}</p>
        </div>
    );
};

export default StudentDetail;
