import React, { useState } from 'react';
import axios from 'axios';

const AddSubjectMarks = () => {
    const [student_id, setStudentId] = useState(1); // Modify as needed
    const [semester, setSemester] = useState('3'); // Modify as needed
    const [subjectMarks, setSubjectMarks] = useState([{ subject_name: '', marks: '' }]);
    const [message, setMessage] = useState('');

    const sanitizeInput = (input) => {
        return input.replace(/[<>\/]/g, ''); // Remove invalid characters
    };

    const handleSubjectChange = (index, e) => {
        const { name, value } = e.target;
        const updatedMarks = [...subjectMarks];
        updatedMarks[index][name] = name === 'marks' ? parseFloat(value) || '' : sanitizeInput(value);
        setSubjectMarks(updatedMarks);
    };

    const handleAddSubject = () => {
        setSubjectMarks([...subjectMarks, { subject_name: '', marks: '' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Add subject marks
            const addResponse = await axios.post('http://localhost:4000/api/subject/add-subject-marks', {
                subjectMarks: subjectMarks.map(mark => ({ ...mark, student_id, semester }))
            });
            console.log(addResponse.data);

            // Calculate CGPA
            const cgpaResponse = await axios.post('http://localhost:4000/api/subject/calculate-cgpa', { student_id, semester });
            console.log(cgpaResponse.data);
            setMessage('Subject marks added and CGPA calculated successfully!');

            // Clear form fields
            setSubjectMarks([{ subject_name: '', marks: '' }]);
            setStudentId(1); // Reset to default
            setSemester('3'); // Reset to default
        } catch (error) {
            console.error('Error adding subject marks or calculating CGPA:', error.response?.data || error.message);
            setMessage('Failed to add subject marks or calculate CGPA. Please try again.');
        }
    };

    return (
        <div>
            <h2>Add Subject Marks</h2>
            <form onSubmit={handleSubmit}>
                {subjectMarks.map((subject, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name="subject_name"
                            placeholder="Subject Name"
                            value={subject.subject_name}
                            onChange={(e) => handleSubjectChange(index, e)}
                            required
                        />
                        <input
                            type="number"
                            name="marks"
                            placeholder="Marks"
                            value={subject.marks}
                            onChange={(e) => handleSubjectChange(index, e)}
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddSubject}>Add Another Subject</button>
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddSubjectMarks;
