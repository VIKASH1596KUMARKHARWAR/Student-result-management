import React, { useState } from 'react';
import axios from 'axios';

const CreateResult = () => {
    const [student_id, setStudentId] = useState(''); 
    const [semester, setSemester] = useState(''); 
    const [subjectMarks, setSubjectMarks] = useState([{ subject_name: '', marks: '' }]);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); 

    const handleSubjectChange = (index, e) => {
        const { name, value } = e.target;
        const updatedMarks = [...subjectMarks];
        updatedMarks[index][name] = value;
        setSubjectMarks(updatedMarks);
    };

    const handleAddSubject = () => {
        setSubjectMarks([...subjectMarks, { subject_name: '', marks: '' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isSubmitting) return; 
        setIsSubmitting(true); 
        setMessage(''); 

        try {
            // Add the subject marks and let the backend handle CGPA calculation
            const addResponse = await axios.post('http://localhost:4000/api/subject/add-subject-marks', {
                subjectMarks: subjectMarks.map(mark => ({ ...mark, student_id, semester }))
            });
            console.log('Add Response:', addResponse.data); 

            setMessage(`Subject marks added successfully! CGPA: ${addResponse.data.cgpa}`);

            // Clear the form
            setSubjectMarks([{ subject_name: '', marks: '' }]);
            setStudentId(''); 
            setSemester(''); 
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            setMessage('Failed to add subject marks. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="create-result-container">
            <h2>Create Result</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Enter Student ID"
                        value={student_id}
                        onChange={(e) => setStudentId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Enter Semester"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit" disabled={isSubmitting}>Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateResult;
