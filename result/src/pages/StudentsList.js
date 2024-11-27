import React, { useEffect, useState } from 'react';
import { getAllStudents, deleteStudent } from './api'; 
import { useNavigate } from 'react-router-dom';

const StudentsList = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStudents, setFilteredStudents] = useState([]);
    const navigate = useNavigate();  

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await getAllStudents();
                setStudents(data);
                setFilteredStudents(data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() === '') {
            setFilteredStudents(students);
        } else {
            const results = students.filter((student) => student.id.toString() === searchTerm);
            setFilteredStudents(results);
        }
    };

    const handleView = (id) => {
        navigate(`/admin/viewuser/${id}`);  // Redirect to the view page
    };

    const handleEdit = (id) => {
        navigate(`/admin/edit-student/${id}`);  
    };

    const handleAddUser = () => {
        navigate('/admin/add-user'); 
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this student?");
        if (confirmDelete) {
            try {
                await deleteStudent(id); // Call the deleteStudent function from api.js
                setStudents((prevStudents) => prevStudents.filter(student => student.id !== id)); // Update the state to remove the deleted student
                setFilteredStudents((prevFiltered) => prevFiltered.filter(student => student.id !== id)); // Update filteredStudents as well
                alert('Student deleted successfully!');
            } catch (error) {
                console.error('Error deleting student:', error);
                alert('Failed to delete student. Please try again.');
            }
        }
    };

    return (
        <div className='students-container'>
            <div className="d-flex justify-content-between mb-4">
                <form className="d-flex" onSubmit={handleSearch} noValidate>
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search by Student ID"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        aria-label="Search"
                        style={{ width: '60%', height: '45px' }}
                    />
                    <button type="submit" className="btn btn-outline-success">Search</button>
                </form>
                <button className="btn btn-primary" onClick={handleAddUser}>
                    Add New Student
                </button>
            </div>

            <div className="view-user p-5">
                {filteredStudents.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="thead-dark">
                                <tr className="text-center">
                                    <th scope="col">Student ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Batch</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Department</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map((student) => (
                                    <tr key={student.id}>
                                        <td>{student.id}</td>
                                        <td>{student.name}</td>
                                        <td>{student.batch}</td>
                                        <td>{student.gender}</td>
                                        <td>{student.department}</td>
                                        <td>
                                            <button
                                                className="btn btn-info btn-sm me-2"
                                                onClick={() => handleView(student.id)}
                                            >
                                                View
                                            </button>

                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => handleEdit(student.id)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(student.id)} // Call handleDelete on click
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No students found</p>
                )}
            </div>
        </div>
    );
};

export default StudentsList;
