import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getResultsByStudentId, updateResult } from './api'; // Removed addResult since it's only for editing

const EditResultForm = () => {
    const { id, semester } = useParams(); // Get student ID and semester from the URL
    const [cgpa, setCgpa] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    // Fetch existing result data if editing
    useEffect(() => {
        const fetchResult = async () => {
            try {
                if (id && semester) { // Only fetch if ID and semester are provided
                    const resultData = await getResultsByStudentId(id);
                    const resultForSemester = resultData.find(r => r.semester === semester);
                    if (resultForSemester) {
                        setCgpa(resultForSemester.cgpa);
                    }
                }
            } catch (error) {
                console.error('Error fetching result:', error);
                setError('Failed to fetch result data.');
            }
        };

        fetchResult();
    }, [id, semester]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Sending:', { cgpa }); // Log the data you're sending
            await updateResult(id, semester, { cgpa }); // Update the existing result
            navigate(`/admin/viewresult/${id}`); // Redirect to the results page
        } catch (error) {
            console.error('Error saving result:', error.response?.data || error.message);
            setError('Failed to save result.');
        }
    };


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
        <div className="edit-result-form p-5">
            <h3>Edit Result for Semester {semester}</h3>
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="cgpa" className="form-label">CGPA</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cgpa"
                        value={cgpa}
                        onChange={(e) => setCgpa(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update Result</button>
            </form>
        </div>
        </div>
    );
};

export default EditResultForm;
