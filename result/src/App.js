import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword'; // Ensure filenames match the imports
import ForgotPassword from './pages/ForgotPassword';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Results from './pages/Results';

import ViewResults from './pages/ViewResults';
import Students from './pages/Students';
import Subjects from './pages/Subjects';
import Attendance from './pages/Attendance';
import Reports from './pages/Reports';
import EditUser from './pages/Edituser';
import AddUser from './pages/AddUser';
import StudentDetail from './pages/StudentDetails';
import EditResultForm from './pages/EditResultForm';
// import AddSubjectMarks from './pages/AddSubjectMarks';
// import CalculateCGPA from './pages/CalculateCGPA';
import CreateResult from './pages/CreateResult';
import MainLayoutinst from './components/MainLayout-inst';
import EditResultForm1 from './pages_inst/EditResultForm1';
import Result1 from './pages_inst/Results1';
import ViewResults1 from './pages_inst/ViewResults1';
import Register from './pages/Register';
import StudentDashboard from './pages_students/Student-dashboard';
import ResultTable from './pages_students/ResultTable';

const App = () => {

  const studentsData = [
    { id: '1', name: 'John Doe', department: 'Computer Science' },
    { id: '2', name: 'Jane Smith', department: 'Mathematics' },
    // Add more students as needed
  ];
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="subjects/:semester" element={<Subjects />} /> {/* Add the Subjects route */}
        <Route path="attendance" element={<Attendance />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/dashboard" element={<userDashboard />} /> {/* Add Dashboard Route */}

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="results" element={<Results />} />
          <Route path="viewresult/:id" element={<ViewResults />} />
          <Route path="subjects" element={<Subjects />} /> {/*admin route for subjects */}
          <Route path="subjects/:semester" element={<Subjects />} /> {/*admin route for subjects */}
          <Route path="attendance" element={<Attendance />} />
          <Route path="reports" element={<Reports />} />
          {/* <Route path="viewuser/:id" element={<ViewStudent />} /> */}
          <Route path="add-user" element={<AddUser />} />
          <Route path="viewuser/:id" element={<StudentDetail />} />
          <Route path="edit-student/:id" element={<EditUser />} />
          <Route path="/admin/results/:id" component={ViewResults} />
          <Route path="edit-result/:id/:semester" element={<EditResultForm />} />
          {/* <Route path="add-subject-marks" element={<AddSubjectMarks />} /> */}
          {/* <Route path="calculate-cgpa" element={<CalculateCGPA />} /> */}

          <Route path="create-new-result" element={<CreateResult />} />

          {/* <Route path="edituser/:id" element={<EditUser students={studentsData} />} /> */}
        </Route>

        {/* for instructor */}
        <Route path="/instructor" element={<MainLayoutinst />}>
          <Route index element={<Dashboard />} />
          <Route path="results" element={<Result1/>} />
          <Route path="viewresult/:id" element={<ViewResults1 />} />
          <Route path="subjects" element={<Subjects />} /> {/*admin route for subjects */}
          <Route path="subjects/:semester" element={<Subjects />} /> {/*admin route for subjects */}
          <Route path="attendance" element={<Attendance />} />
          <Route path="reports" element={<Reports />} />
          {/* <Route path="viewresult/:id" element={<ViewResults1 />} /> */}
          {/* <Route path="results/:id" component={ViewResults} /> */}
          <Route path="edit-result/:id/:semester" element={<EditResultForm1 />} />
          <Route path="create-new-result" element={<CreateResult />} />
        </Route>
                    {/* student Routes */}
        <Route path="/students" element={<MainLayoutinst />}>
          <Route index element={<StudentDashboard />} />
          <Route path="results" element={<ResultTable/>} />
        </Route>


      </Routes>
    </Router>
  );
};

export default App;
