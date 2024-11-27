import React from 'react';

const AttendanceList = ({ rows, alert, removedUser }) => {
  return (
    <div className="container">
      {/* Alert for removed user */}
      {removedUser && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          User has been removed.
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      {/* Alert for other messages */}
      {alert && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {alert}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      <h1 className="my-4">Attendance</h1>
      <div className="table-responsive"> {/* Makes the table responsive */}
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Student ID</th>
              <th scope="col">Name</th>
              <th scope="col">Attendance Status</th>
            </tr>
          </thead>
          <tbody>
            {rows && rows.length > 0 ? (
              rows.map((student) => (
                <tr key={student.id}>
                  <th scope="row">{student.id}</th>
                  <td>{student.name}</td>
                  <td>{student.attendance}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No attendance records available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceList;
