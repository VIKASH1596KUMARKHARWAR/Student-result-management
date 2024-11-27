import React, { useState } from 'react';
import { calculateCGPA } from './api';

const CalculateCGPA = () => {
    const [studentId, setStudentId] = useState(1);
    const [semester, setSemester] = useState('6');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleCalculateCGPA = async () => {
        try {
            const resultMessage = await calculateCGPA(studentId, semester);
            setMessage(resultMessage);
            setError('');
        } catch (err) {
            setError(err.message);
            setMessage('');
        }
    };

    return (
        <div>
            <h3>Calculate CGPA</h3>
            <input
                type="number"
                placeholder="Student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                required
            />
            <button onClick={handleCalculateCGPA}>Calculate CGPA</button>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default CalculateCGPA;
