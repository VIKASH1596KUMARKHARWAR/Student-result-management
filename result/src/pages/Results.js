import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllStudents } from './api'; // Adjust the import path based on your project structure

const Results = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [resultsData, setResultsData] = useState([]);
  const [sortBySemester, setSortBySemester] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getAllStudents(); // Fetch all students from the backend
        setResultsData(data);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      }
    };

    fetchResults();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  // Filter results based on search term
  const filteredResults = resultsData.filter((result) =>
    String(result.id).includes(searchTerm)
  );

  // Sort results based on semester
  const sortedResults = sortBySemester
    ? filteredResults.sort((a, b) => {
      const semesterA = a.semester ? parseInt(a.semester) : 0;
      const semesterB = b.semester ? parseInt(b.semester) : 0;
      return semesterA - semesterB;
    })
    : filteredResults;

  return (
    <div>
      <div className="row">
        <div className="col-6">
          <h1>Results</h1>
        </div>
        <div className="d-flex justify-content-between mb-4 t">
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
       
        
        </div>
      </div>
      <br />
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr className="text-center">
            <th scope="col">Student ID</th>
            <th scope="col">Student Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedResults.length > 0 ? (
            sortedResults.map((result) => (
              <tr key={result.id} className="text-center"> {/* Center content for each row */}
                <th scope="row">{result.id}</th>
                <td>{result.name}</td>
                <td>
                  <button
                    className="btn btn-light btn-small"
                    onClick={() => navigate(`/admin/viewresult/${result.id}`)}
                  >
                    <i className="bi bi-eye"></i> View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No results found.</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
};

export default Results;
