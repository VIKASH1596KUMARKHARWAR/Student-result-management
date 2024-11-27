// pages/Reports.js
import React from 'react';

const Reports = () => {
  const reportsData = [
    { id: 1, title: "Attendance Report", description: "Summary of attendance for the semester." },
    { id: 2, title: "Grades Report", description: "Overview of grades for each student." },
    { id: 3, title: "Subject Enrollment Report", description: "List of students enrolled in each subject." },
    { id: 4, title: "Results Report", description: "Summary of student results." },
    // Add more report objects as needed
  ];

  return (
    <div className="container">
      <h1>Reports</h1>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Report ID</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col" className="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {reportsData.map((report) => (
            <tr key={report.id}>
              <th scope="row">{report.id}</th>
              <td>{report.title}</td>
              <td>{report.description}</td>
              <td className="text-end">
                <button className="btn btn-light btn-small">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
