import React from 'react';

const Attendance = () => {
  // Sample attendance data
  const attendanceData = [
    { studentId: '1', name: 'John Doe', attended: true },
    { studentId: '2', name: 'Jane Doe', attended: false },
    { studentId: '3', name: 'Alice Smith', attended: true },
    // Add more attendance records as needed
  ];

  return (
    <div className="container">
      <h1 className="my-4">Attendance</h1>
      <div className="table-responsive"> {/* Makes the table responsive */}
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Student ID</th>
              <th scope="col">Name</th>
              <th scope="col">Attended</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((record, index) => (
              <tr key={index}>
                <td>{record.studentId}</td>
                <td>{record.name}</td>
                <td>{record.attended ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
