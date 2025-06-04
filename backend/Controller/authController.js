    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');
    const User = require('../Models/User');

    // Generate JWT token
    const generateToken = (user) => {
        return jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
    };

    // Signup (Without Google)
    exports.signup = async (req, res) => {
        const { name, email, password, role } = req.body;

        try {
            // Check if password is provided
            if (!password) {
                return res.status(400).json({ success: false, message: 'Password is required.' });
            }
            console.log("signup data ",req.body);
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'User already exists.' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                role: role||'user',  // Default to 'general' if no role is provided
            });

            // Generate token for the user
            const token = generateToken(user);
            res.status(201).json({ success: true, user, token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error creating user.', error });
        }
    };

    // Login (Without Google)
    exports.login = async (req, res) => {
        const { email, password } = req.body;

        try {
            // Check if password is provided
            if (!password) {
                return res.status(400).json({ success: false, message: 'Password is required.' });
            }

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found.' });
            }

            // Check if password is correct
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ success: false, message: 'Invalid credentials.' });
            }

            // Generate token for the user
            const token = generateToken(user);
            res.status(200).json({ success: true, user, token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error logging in.', error });
        }
    };

    // Signup/Login with Google
    exports.googleAuth = async (req, res) => {
        const { token } = req.body;

        try {
            // Decode the token to get the user's data
            const decodedToken = jwt.decode(token);

            // Extract necessary information from the decoded token
            const { email, name, picture: profile_picture, sub: googleId } = decodedToken;

            // Check if the user already exists in the database
            let user = await User.findOne({ email });

            if (!user) {
                // If the user doesn't exist, create a new user
                user = await User.create({ name, email, googleId, profile_picture,role:'user'});
            }

            // Generate a JWT token for the user after authentication
            const newToken = generateToken(user);

            // Send back the user data and token in the response
            res.status(200).json({ success: true, user, token: newToken });
        } catch (error) {
            console.error('Error authenticating with Google:', error);
            res.status(500).json({ success: false, message: 'Error authenticating with Google.', error });
        }
    };
