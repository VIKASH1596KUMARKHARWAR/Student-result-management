// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// // import './Register.css';

// const Register = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState('');
//     const navigate = useNavigate();

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('http://localhost:4000/api/users/register', {
//                 name,
//                 email,
//                 password,
//                 role,
//             });
//             alert('Registration successful');
//             navigate('/'); // Redirect to login after successful registration
//         } catch (error) {
//             const errorMessage = error.response?.data?.msg || 'Registration failed';
//             console.error('Registration failed:', errorMessage);
//             alert(errorMessage);
//         }
//     };

//     const handleRoleSelect = (selectedRole) => {
//         setRole(selectedRole);
//     };

//     return (
//         <div className="register-container">
//             <div className="register-box">
//                 <h2>Register</h2>
//                 <form onSubmit={handleRegister} className="register-form">
//                     <input
//                         type="text"
//                         placeholder="Name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                         className="register-input"
//                     />
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                         className="register-input"
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         className="register-input"
//                     />
//                     <div className="role-selection">
//                         <button
//                             type="button"
//                             className={`role-button ${role === 'admin' ? 'selected' : ''}`}
//                             onClick={() => handleRoleSelect('admin')}
//                         >
//                             Admin
//                         </button>
//                         <button
//                             type="button"
//                             className={`role-button ${role === 'instructor' ? 'selected' : ''}`}
//                             onClick={() => handleRoleSelect('instructor')}
//                         >
//                             Instructor
//                         </button>
//                         <button
//                             type="button"
//                             className={`role-button ${role === 'student' ? 'selected' : ''}`}
//                             onClick={() => handleRoleSelect('student')}
//                         >
//                             Student
//                         </button>
//                     </div>
//                     <button type="submit" className="register-button">Register</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Register;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
            body {
                margin: 0;
                font-family: 'Inter', sans-serif;
                background-image: url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop');
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
            }

            .register-container {
                width: 100%;
                max-width: 500px;
                padding: 20px;
                z-index: 2;
            }

            .register-box {
                background: rgba(255, 255, 255, 0.12);
                border: 1px solid rgba(255, 255, 255, 0.2);
                backdrop-filter: blur(25px);
                border-radius: 24px;
                box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
                padding: 50px 40px;
                color: #fff;
                text-align: center;
            }

            .register-box h2 {
                margin-bottom: 1.5rem;
                font-weight: 700;
                font-size: 26px;
                color: #fff;
            }

         .register-input {
    width: 100%;
    padding: 14px;
    margin-bottom: 20px;
    border: none;
    border-radius: 12px;
    outline: none;
    background-color: rgba(255, 255, 255, 0.25);
    font-size: 15px;
    color: #000;
    backdrop-filter: blur(10px);
    font-weight: 500;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.3);
}

    .register-input::placeholder {
    // color: #220; 
    font-weight: 400;   
    }


            

            .register-input:focus {
                background-color: rgba(255, 255, 255, 0.3);
                box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.4);
            }

            .register-button {
                width: 100%;
                padding: 14px;
                border: none;
                border-radius: 12px;
                background: linear-gradient(to right, #43cea2, #185a9d);
                color: #fff;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                margin-top: 15px;
            }

            .register-button:hover {
                background: linear-gradient(to right, #32c4a3, #104b94);
                transform: scale(1.02);
            }

            .role-selection {
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
                gap: 10px;
            }

    .role-button {
    flex: 1;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background-color: rgba(255, 255, 255, 0.25);
    color: #000;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s ease;
    backdrop-filter: blur(8px);
}

.role-button:hover {
    background-color: rgba(255, 255, 255, 0.35);
}

.role-button.selected {
    background-color: #43cea2;
    color: #000;
    border: 2px solid #185a9d;
}

            .register-logo {
                font-size: 34px;
                font-weight: 800;
                margin-bottom: 8px;
                color: #ffffff;
            }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!role) {
            alert("Please select a role before registering.");
            return;
        }

        try {
            await axios.post('http://localhost:4000/api/users/register', {
                name,
                email,
                password,
                role,
            });
            alert('Registration successful');
            navigate('/');
        } catch (error) {
            const errorMessage = error.response?.data?.msg || 'Registration failed';
            console.error('Registration failed:', errorMessage);
            alert(errorMessage);
        }
    };

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <div style={{
                    color: '#fff',
                    textAlign: 'center',
                    marginBottom: '20px',
                    maxWidth: '500px',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)'  // better contrast
                }}>
                    <h1 style={{
                        fontSize: '32px',
                        fontWeight: '700',
                        marginBottom: '10px',
                        background: 'linear-gradient(to right, #00c6ff, #0072ff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Welcome to SRMS
                    </h1>
                    <p style={{
                        fontSize: '16px',
                        fontWeight: '800',
                        background: 'linear-gradient(to right, #6dd5fa, #2980b9)',
                        WebkitBackgroundClip: 'text',
                        color: '#dbeafe'  
                    }}>
                        Student Result Management System (SRMS) helps administrators, instructors, and students efficiently manage academic records, results, and user access — all in one place.
                    </p>
                </div>

                {/* 
                <div className="register-logo">SRMS</div>
                <h2>Create Account</h2> */}
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="register-input"
                    />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="register-input"
                    />
                    <input
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="register-input"
                    />

                    <div className="role-selection">
                        <button
                            type="button"
                            className={`role-button ${role === 'admin' ? 'selected' : ''}`}
                            onClick={() => handleRoleSelect('admin')}
                        >
                            Admin
                        </button>
                        <button
                            type="button"
                            className={`role-button ${role === 'instructor' ? 'selected' : ''}`}
                            onClick={() => handleRoleSelect('instructor')}
                        >
                            Instructor
                        </button>
                        <button
                            type="button"
                            className={`role-button ${role === 'student' ? 'selected' : ''}`}
                            onClick={() => handleRoleSelect('student')}
                        >
                            Student
                        </button>
                    </div>

                    <button type="submit" className="register-button">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
