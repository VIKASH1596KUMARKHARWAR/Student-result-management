// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { getStudentById } from './api'; // Ensure correct import path

// const StudentDetail = () => {
//     const { id } = useParams(); // Get the student ID from the URL
//     const [student, setStudent] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchStudent = async () => {
//             try {
//                 const data = await getStudentById(id); // Fetch student by ID
//                 setStudent(data); // Set the student data
//                 console.log(setStudent(data));
//             } catch (error) {
//                 console.error('Error fetching student:', error);
//                 setError('Student not found');
//             }
//         };

//         fetchStudent();
//     }, [id]); // Effect runs when the component mounts or when `id` changes

//     if (error) {
//         return <div>{error}</div>; // Display error if there is one
//     }

//     if (!student) {
//         return <div>Loading...</div>; // Display loading state while fetching
//     }

//     // Render the student details
//     return (
//         <div   style={{
//             padding: "24px",
//             background: "linear-gradient(to bottom right,rgb(182, 84, 71),rgb(79, 160, 225))",
//             minHeight: "100vh",
//         }} className='container'>
//             <nav aria-label="breadcrumb">
//                 <ol className="breadcrumb">
//                     <li className="breadcrumb-item">
//                         <Link to="/admin/students">Students</Link>
//                     </li>
//                     <li className="breadcrumb-item active" aria-current="page">
//                         Student ID:  {student.id}
//                     </li>
//                 </ol>
//             </nav>
//             <h2>Student Details</h2>
//             <p><strong>ID:</strong> {student.id}</p>
//             <p><strong>Name:</strong> {student.name}</p>
//             <p><strong>Batch:</strong> {student.batch}</p>
//             <p><strong>Gender:</strong> {student.gender}</p>
//             <p><strong>Department:</strong> {student.department}</p>
//             <p><strong>Phone:</strong> {student.phone}</p>
//             <p><strong>Email:</strong> {student.email}</p>
//         </div>
//     );
// };

// export default StudentDetail;




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
                console.log(setStudent(data));
            } catch (error) {
                console.error('Error fetching student:', error);
                setError('Student not found');
            }
        };

        fetchStudent();
    }, [id]); // Effect runs when the component mounts or when `id` changes

    if (error) {
        return <div className="text-danger fs-4 p-4">{error}</div>; // Display error if there is one
    }

    if (!student) {
        return <div className="fs-4 p-4">Loading...</div>; // Display loading state while fetching
    }

    // Render the student details
    return (
        <div
            style={{
                padding: "24px",
                background: "linear-gradient(to bottom right, rgb(182, 84, 71), rgb(79, 160, 225))",
                minHeight: "100vh",
                color: "#fff",
                fontSize: "1.2rem",
            }}
            className="container"
        >
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb bg-light p-2 rounded">
                    <li className="breadcrumb-item">
                        <Link to="/admin/students" className="text-decoration-none text-primary fw-bold">
                            Students
                        </Link>
                    </li>
                    <li className="breadcrumb-item active fw-semibold" aria-current="page">
                        Student ID: {student.id}
                    </li>
                </ol>
            </nav>

            <h2 className="mb-4 fw-bold" style={{ fontSize: "2rem" }}>Student Details</h2>

            <div className="text-dark p-4 rounded shadow-lg">
                <p><strong>ID:</strong> {student.id}</p>
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Batch:</strong> {student.batch}</p>
                <p><strong>Gender:</strong> {student.gender}</p>
                <p><strong>Department:</strong> {student.department}</p>
                <p><strong>Phone:</strong> {student.phone}</p>
                <p><strong>Email:</strong> {student.email}</p>
            </div>
        </div>
    );
};

export default StudentDetail;
