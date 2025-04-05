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
          className="form-select shadow"
          style={{
            width: "250px",
            color: "#ffffff", // white text for better contrast
            fontWeight: "600",
            border: "none",
            padding: "10px 12px",
            borderRadius: "12px",
            background: "linear-gradient(to right, rgb(182, 84, 71), rgb(79, 160, 225))",
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
          }}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <option
              key={i + 1}
              value={i + 1}
              style={{
                color: "#000",
                background: "#fff",
              }}
            >
              Semester {i + 1}
            </option>
          ))}
        </select>


      </div>

      <h3 className="card-title mt-5">Subjects for Semester {selectedSemester}</h3>
      <div className="card mb-4 mt-2">
        <div className="card-body">
          {selectedSubjects && selectedSubjects.subjects.length > 0 ? (
            <ul className="list-group">
              {selectedSubjects.subjects.map((subject, index) => (
                <li
                  key={index}
                  className="list-group-item mb-2"
                  style={{
                    background: "linear-gradient(to bottom right, #d9d9f7, #e6ebef)",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    fontWeight: "500",
                    color: "#333",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
                  }}
                >
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
