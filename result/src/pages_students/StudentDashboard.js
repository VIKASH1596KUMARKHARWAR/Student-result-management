import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, CircularProgress, Grid, Box, Button, Divider } from '@mui/material';

const quotes = [
    "Education is the most powerful weapon which you can use to change the world. – Nelson Mandela",
    "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
    "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. – Albert Schweitzer",
    "The only way to do great work is to love what you do. – Steve Jobs",
    "Your limitation—it's only your imagination. – Unknown",
    "Live as if you were to die tomorrow. Learn as if you were to live forever. – Mahatma Gandhi",
];

const StudentDashboard = () => {
    const [student, setStudent] = useState(null);
    const [results, setResults] = useState([]); // State for results
    const [loading, setLoading] = useState(true);
    const [showResults, setShowResults] = useState(false); // State to toggle results visibility
    const loggedInUserEmail = JSON.parse(localStorage.getItem('user')).email;

    useEffect(() => {
        const fetchStudentsData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/students');
                const currentUser = response.data.find(student => 
                    student.email.toLowerCase() === loggedInUserEmail.toLowerCase()
                );
                setStudent(currentUser);

                // Fetch results for the current student
                if (currentUser) {
                    const resultsResponse = await axios.get(`http://localhost:4000/api/results/${currentUser.id}`);
                    setResults(resultsResponse.data); // Set the results in state
                }
            } catch (error) {
                console.error('Error fetching student data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentsData();
    }, [loggedInUserEmail]);

    if (loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    if (!student) {
        return (
            <Container>
                <Typography variant="h6">Student not found.</Typography>
            </Container>
        );
    }

    const { id, name, batch, gender, department, phone, email } = student;

    // Select a random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    return (
        <Container maxWidth="md" sx={{ mt: 12, bgcolor: 'background.default', borderRadius: 1, p: 2, boxShadow: 3 }}>
            <Typography variant="h5" align="center" sx={{ mb: 2, color: 'text.secondary' }}>
                "{randomQuote}"
            </Typography>
            <Typography variant="h4" align="center" sx={{ mb: 2, color: 'primary.main' }}>
                Student Dashboard
            </Typography>
            <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Personal Information
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1"><strong>Name:</strong> {name}</Typography>
                            <Typography variant="body1"><strong>ID:</strong> {id}</Typography>
                            <Typography variant="body1"><strong>Batch:</strong> {batch}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1"><strong>Gender:</strong> {gender}</Typography>
                            <Typography variant="body1"><strong>Department:</strong> {department}</Typography>
                            <Typography variant="body1"><strong>Phone:</strong> {phone}</Typography>
                            <Typography variant="body1"><strong>Email:</strong> {email}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Divider sx={{ my: 2 }} />

            <Box>
                <Typography variant="h6" gutterBottom>
                    Your Results
                </Typography>
                <Button
                    variant="contained"
                    sx={{ mt: 2, bgcolor: 'secondary.main', color: 'common.white', '&:hover': { bgcolor: 'secondary.dark' } }}
                    onClick={() => setShowResults(prev => !prev)} // Toggle results visibility
                >
                    {showResults ? 'Hide Your Results' : 'View Your Results'}
                </Button>
                {showResults && ( // Only display results if showResults is true
                    <>
                        {results.length > 0 ? (
                            results.map((result, index) => (
                                <Card variant="outlined" sx={{ mt: 2 }} key={index}>
                                    <CardContent>
                                        <Typography variant="body1"><strong>Semester:</strong> {result.semester}</Typography>
                                        <Typography variant="body1"><strong>CGPA:</strong> {result.cgpa}</Typography>
                                        {/* Add more fields if needed */}
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <Card variant="outlined" sx={{ mt: 2 }}>
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary">
                                        No results found for this student.
                                    </Typography>
                                </CardContent>
                            </Card>
                        )}
                    </>
                )}
            </Box>
        </Container>
    );
};

export default StudentDashboard;
