import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getResultsByStudentId, addResult, deleteResult } from '../pages/api'; // Import API functions

const ViewResults = () => {
  const { id } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [semester, setSemester] = useState('');
  const [cgpa, setCgpa] = useState('');

  // Fetch the student results when the component loads
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getResultsByStudentId(id);
        const sortedResults = data.sort((a, b) => a.semester - b.semester);
        setResults(sortedResults);
      } catch (error) {
        console.error('Error fetching results:', error);
        setError('Failed to fetch results.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [id]);

  const handleAddResult = async (e) => {
    e.preventDefault();
    try {
      const newResult = { id: parseInt(id), semester, cgpa };
      await addResult(newResult);
      setResults((prevResults) => [...prevResults, newResult]);
      setSemester('');
      setCgpa('');
    } catch (error) {
      console.error('Error adding result:', error);
      setError('Failed to add result.');
    }
  };

  const handleDeleteResult = async (semester) => {
    try {
      await deleteResult(id, semester); // Call the delete API
      setResults((prevResults) => prevResults.filter(result => result.semester !== semester)); // Update the state
    } catch (error) {
      console.error('Error deleting result:', error);
      setError('Failed to delete result.');
    }
  };

  return (
    <div className="view-user p-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/instructor/results">Results</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            View Results
          </li>
        </ol>
      </nav>

      <h3>Student ID: {id}</h3>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="row">
          <div className="col">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Semester</th>
                  <th scope="col">CGPA</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {results.length > 0 ? (
                  results.map((result) => (
                    <tr key={`${result.id}-${result.semester}`}>
                      <td>{result.semester}</td>
                      <td>{result.cgpa}</td>
                      <td>
                        <Link to={`/instructor/edit-result/${id}/${result.semester}`} className="btn btn-warning">
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDeleteResult(result.semester)} 
                          className="btn btn-danger ms-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">No results found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

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
