import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStudentById, updateStudent } from './api'; // Import your API functions

const EditUser = () => {
  const { id } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [alert, setAlert] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getStudentById(id);
        setStudentData(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStudent(id, studentData); // Update the student data
      setAlert(`Student with ID ${id} edited successfully!`);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  return studentData ? (
    <div className="container mt-4">

<nav aria-label="breadcrumb">
    <ol className="breadcrumb">
        <li className="breadcrumb-item">
            <Link to="/admin/students">Students</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
            Edit Student
        </li>
    </ol>
</nav>

      {alert && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {alert}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={studentData.name}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">
            Please enter a name.
          </div>
        </div>

        <div className="col-md-6">
          <label htmlFor="batch" className="form-label">Batch</label>
          <input
            type="text"
            name="batch"
            className="form-control"
            value={studentData.batch}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">
            Please enter a batch.
          </div>
        </div>

        <div className="col-md-6">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={studentData.phone}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">
            Please enter a phone number.
          </div>
        </div>

        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={studentData.email}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">
            Please enter a valid email.
          </div>
        </div>

        <div className="col-md-6">
          <label htmlFor="department" className="form-label">Department</label>
          <input
            type="text"
            name="department"
            className="form-control"
            value={studentData.department}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">
            Please enter a department.
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="gender" className="form-label">Gender</label>
          <select
            name="gender"
            className="form-select"
            value={studentData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <div className="invalid-feedback">
            Please select a gender.
          </div>
        </div>


        <div className="col-12">
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default EditUser;
