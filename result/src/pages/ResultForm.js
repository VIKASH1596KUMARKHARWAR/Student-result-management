import React, { useState, useEffect } from 'react';
import { addResult, updateResult, getResultsByStudentId } from './api';

const ResultForm = ({ studentId, existingResult, onSuccess }) => {
  const [semester, setSemester] = useState(existingResult ? existingResult.semester : '');
  const [cgpa, setCgpa] = useState(existingResult ? existingResult.cgpa : '');
  const [isEditing, setIsEditing] = useState(!!existingResult);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultData = { id: studentId, semester, cgpa }; // Use `studentId` for result's `id` as well

    try {
      if (isEditing) {
        // Update the existing result based on result id (same as student id)
        await updateResult(existingResult.id, resultData);
      } else {
        // Add a new result with the studentId
        await addResult(resultData);
      }
      onSuccess(); // Callback to refresh data after adding/updating
    } catch (error) {
      console.error('Error saving result:', error);
    }
  };

  useEffect(() => {
    if (isEditing && existingResult) {
      setSemester(existingResult.semester);
      setCgpa(existingResult.cgpa);
    }
  }, [existingResult]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Semester:</label>
        <input
          type="text"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          required
        />
      </div>
      <div>
        <label>CGPA:</label>
        <input
          type="text"
          value={cgpa}
          onChange={(e) => setCgpa(e.target.value)}
          required
        />
      </div>
      <button type="submit">{isEditing ? 'Update Result' : 'Add Result'}</button>
    </form>
  );
};

export default ResultForm;
