import React, { useState } from "react";

const Subjects = () => {
  const [selectedSemester, setSelectedSemester] = useState("1"); // Default semester selected

  const subjectsData = [
    { semester: "1", subjects: ["Mathematics", "Physics", "Chemistry"] },
    { semester: "2", subjects: ["Biology", "Computer Science", "History"] },
    { semester: "3", subjects: ["Data Structures", "Algorithms", "Networks"] },
    { semester: "4", subjects: ["Operating Systems", "Databases", "Software Engineering"] },
    { semester: "5", subjects: ["Web Development", "Machine Learning", "Cloud Computing"] },
    { semester: "6", subjects: ["Mobile App Development", "AI", "Cybersecurity"] },
    { semester: "7", subjects: ["Distributed Systems", "Blockchain", "Big Data"] },
    { semester: "8", subjects: ["Capstone Project", "Elective Subject"] },
    // Add more semesters and subjects as needed
  ];

  // Filter subjects based on the selected semester
  const selectedSubjects = subjectsData.find(
    (sub) => sub.semester === selectedSemester
  );

  return (
    <div className="container">
      <h2 className="my-4">Select Semester</h2>
      <div className="mb-3">
        <select
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          className="form-select"
          style={{ width: '200px' }} // Adjust width for better visibility
        >
          <option value="1">Semester 1</option>
          <option value="2">Semester 2</option>
          <option value="3">Semester 3</option>
          <option value="4">Semester 4</option>
          <option value="5">Semester 5</option>
          <option value="6">Semester 6</option>
          <option value="7">Semester 7</option>
          <option value="8">Semester 8</option>
          {/* Add more options as needed */}
        </select>
      </div>

          <h3 className="card-title mt-5">Subjects for Semester {selectedSemester}</h3>
      <div className="card mb-4 mt-2">
        <div className="card-body">
          {selectedSubjects && selectedSubjects.subjects.length > 0 ? (
            <ul className="list-group">
              {selectedSubjects.subjects.map((subject, index) => (
                <li key={index} className="list-group-item">
                  {subject}
                </li>
              ))}
            </ul>
          ) : (
            <p>No subjects found for this semester.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subjects;
