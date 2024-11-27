import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getResultsByStudentId, addResult } from './api'; // Import API functions

const ViewResults = () => {
    const { id } = useParams(); // Get the student ID from the URL
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [semester, setSemester] = useState('');
    const [cgpa, setCgpa] = useState('');

    // Fetch the student results when the component loads
    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await getResultsByStudentId(id); // Fetch results by student ID from the backend
                console.log('Fetched Results:', data); // Log the fetched results

                // Check the structure of the fetched data
                console.log('Fetched Results Structure:', Array.isArray(data) ? data : 'Not an array');

                setResults(data); // Set the fetched results data
            } catch (error) {
                console.error('Error fetching results:', error); // Log the error for better debugging
                if (error.response && error.response.data && error.response.data.message) {
                    setError(error.response.data.message); // Set specific error message
                } else {
                    setError('Failed to fetch results.'); // General error message
                }
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [id]);

    const handleAddResult = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const newResult = { id: parseInt(id), semester, cgpa }; // Create the result object
            await addResult(newResult); // Call API to add the result
            setResults((prevResults) => [...prevResults, newResult]); // Update local state
            setSemester(''); // Clear the input fields
            setCgpa('');
        } catch (error) {
            console.error('Error adding result:', error);
            setError('Failed to add result.'); // Set error message if there's an issue
        }
    };

    return (
        <div className="view-user p-5">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/admin/results">Results</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        View Results
                    </li>
                </ol>
            </nav>

            <div className="row mb-5">
                <div className="col text-center">
                    <h3>Student ID: {id}</h3>
                </div>
            </div>

            {loading ? (
                <div>Loading...</div> // Show a loading state
            ) : (
                <div className="row">
                    <div className="col">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Semester</th>
                                    <th scope="col">CGPA</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.length > 0 ? (
                                    results.map((result, index) => (
                                        <tr key={index}>
                                            <td>{result.semester}</td>
                                            <td>{result.cgpa}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" className="text-center">No results found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {error && <div className="alert alert-danger">{error}</div>} {/* Show error message if it exists */}

            <form onSubmit={handleAddResult}>
                <div className="mb-3">
                    <label htmlFor="semester" className="form-label">Semester</label>
                    <input
                        type="text"
                        className="form-control"
                        id="semester"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit" className="btn btn-primary">Add Result</button>
            </form>
        </div>
    );
};

export default ViewResults;
