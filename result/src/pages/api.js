import axios from 'axios';

const API_URL = 'http://localhost:4000/api/students'; // Adjust based on your backend URL
const API_URL_RESULTS = 'http://localhost:4000/api/results'; // Adjust based on your backend URL

// Handle errors centrally
const handleError = (error) => {
  console.error('API error:', error);
  throw new Error(error.response ? error.response.data.message : 'API request failed.');
};

// Fetch all students
export const getAllStudents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Fetch a single student by ID
export const getStudentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Add a new student
export const addStudent = async (studentData) => {
  try {
    const response = await axios.post(API_URL, studentData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Update a student's details
export const updateStudent = async (id, studentData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, studentData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Delete a student
export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};




// ====================results=============

// Fetch all results
export const getAllResults = async () => {
  try {
    const response = await axios.get(API_URL_RESULTS);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getResultsByStudentId = async (id) => {
  try {
      const response = await axios.get(`${API_URL_RESULTS}/${id}`);
      return response.data; // Return the results data
  } catch (error) {
      console.error('Error fetching results:', error); 
      throw error; 
  }
};
export const addResult = async (result) => {
  const response = await axios.post(API_URL_RESULTS, result); 
  return response.data;
};

// Update existing result for a student
export const updateResult = async (id,semester, resultData) => {
  try {
    const response = await axios.put(`${API_URL_RESULTS}/${id}/${semester}`, resultData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Failed to update result.');
  }
};
export const deleteResult = async (id, semester) => {
  // Basic validation
  if (!id || !semester) {
    throw new Error('ID and semester are required.');
  }

  try {
    const response = await axios.delete(`${API_URL_RESULTS}/${id}/${semester}`);
    return response.data; // Assuming the response contains a message or confirmation
  } catch (error) {
    console.error('Error deleting result:', error); // Log the error for debugging
    throw new Error(error.response ? error.response.data.message : 'Failed to delete result.');
  }
};





const API_URL_SUBJECTS = 'http://localhost:4000/api/subject';

export const addSubjectMarks = async (subjectMarks) => {
    try {
        const promises = subjectMarks.map((marks) =>
            axios.post(`${API_URL_SUBJECTS}/add-subject-marks`, marks)
        );
        await Promise.all(promises);
        return true;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Failed to add subject marks.');
    }
};

export const calculateCGPA = async (student_id, semester) => {
    try {
        const response = await axios.post(`${API_URL_SUBJECTS}/calculate-cgpa`, {
            student_id,
            semester
        });
        return response.data.message; // Return success message
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Failed to calculate CGPA.');
    }
};
