import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentResults = ({ studentId }) => {
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [semester, setSemester] = useState(''); // State for new semester
    const [cgpa, setCgpa] = useState(''); // State for new CGPA

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/results/results/${studentId}`);
                setResults(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Error fetching results');
            }
        };

        fetchResults();
    }, [studentId]);

    // Function to handle adding a new result
    const addResult = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            const newResult = { semester, cgpa }; // Create new result object
            await axios.post(`http://localhost:4000/api/results/results`, { studentId, ...newResult }); // Post new result to API
            setResults((prevResults) => [...prevResults, newResult]); // Update local state with the new result
            setSemester(''); // Clear the semester input
            setCgpa(''); // Clear the CGPA input
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Error adding result');
        }
    };

    return (
        <div>
            <h2>Results for Student ID: {studentId}</h2>
            {error && <p>{error}</p>}
            <ul>
                {results.map((result, index) => (
                    <li key={index}>
                        Semester: {result.semester}, CGPA: {result.cgpa}
                    </li>
                ))}
            </ul>

            {/* Form to add a new result */}
            <form onSubmit={addResult}>
                <div>
                    <label>
                        Semester:
                        <input
                            type="text"
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)} // Update semester state
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        CGPA:
                        <input
                            type="text"
                            value={cgpa}
                            onChange={(e) => setCgpa(e.target.value)} // Update CGPA state
                            required
                        />
                    </label>
                </div>
                <button type="submit">Add Result</button>
            </form>
        </div>
    );
};

export default StudentResults;
