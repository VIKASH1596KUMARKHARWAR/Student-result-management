const bcrypt = require('bcryptjs');
const pool = require('../config/createPool'); // Corrected the pool import
const jwt = require('jsonwebtoken');


// Function to register a new user
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if the user already exists
        const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert the new user into the database
        await pool.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role]
        );

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const user = rows[0];

        // Compare the entered password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // If password matches, generate a JWT (optional)
        const payload = {
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return the token and user info (without password)
        res.status(200).json({ token, user: { id: user.id, email: user.email, role: user.role } });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};




const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the user exists
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(400).json({ msg: 'User not found' });
        }

        const user = rows[0];

        // Create a JWT reset token with a short expiration time
        const resetToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the reset token to the user (you can simply return it in the response)
        res.status(200).json({ msg: 'Password reset token generated', resetToken });
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Reset Password (Update Password)
const resetPassword = async (req, res) => {
    const { resetToken, newPassword } = req.body;

    try {
        // Verify the reset token
        const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);

        // Check if the token is valid
        if (!decoded) {
            return res.status(400).json({ msg: 'Invalid or expired token' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the password in the database
        await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, decoded.id]);

        res.status(200).json({ msg: 'Password reset successfully' });
    } catch (error) {
        console.error('Error in resetPassword:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};



module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword
};
