const { client, connectDB } = require('../config/db');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

let dbPromise = null;
function getDB() {
  if (!dbPromise) {
    dbPromise = connectDB();
  }
  return dbPromise;
}

// Validation functions
const isValidUsername = (username) => /^[A-Za-z]+$/.test(username);
const isEmail = (str) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
const isValidPassword = (password) =>
  /^(?![0-9@#$&_])(?=.*[A-Z])(?=.*\d)(?=.*[@#$&_])[A-Za-z\d@#$&_]{6,}$/.test(password);

// OTP Cache with expiry time and cooldown to avoid spamming resend
let OTP_CACHE = {};

// Nodemailer transporter (replace with your email and app password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'subanlathu@gmail.com',         // your Gmail email
    pass: 'loxx rhhb urhg odpk',          // your Gmail App Password
  },
});

// Send OTP email
async function sendOTPEmail(toEmail, otpCode) {
  const mailOptions = {
    from: '"Admin System" <subanlathu@gmail.com>',
    to: toEmail,
    subject: 'Your OTP Code (Valid for 60 seconds)',
    text: `Your OTP code is: ${otpCode}. It will expire in 60 seconds.`,
  };

  await transporter.sendMail(mailOptions);
}

// Admin registration with OTP verification
const adminRegister = async (req, res) => {
  try {
    const { username, password, otp } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    if (!isValidUsername(username) && !isEmail(username)) {
      return res.status(400).json({ message: 'Username must be only letters or a valid email' });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 6 characters, include 1 uppercase, 1 number, 1 special symbol (@#$&_), and not start with number or symbol.',
      });
    }

    const db = await getDB();
    const adminCollection = db.collection('adminUser');

    // Check if user already exists
    const existingUser = await adminCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // If username is email, handle OTP verification
    if (isEmail(username)) {
      const cachedOTP = OTP_CACHE[username];
      const now = Date.now();

      // Send OTP if no OTP provided or expired
      if (!otp) {
        if (!cachedOTP || now > cachedOTP.expiresAt) {
          const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

          OTP_CACHE[username] = {
            code: generatedOTP,
            expiresAt: now + 60 * 1000,
          };

          // Automatically clear OTP after expiry
          setTimeout(() => {
            delete OTP_CACHE[username];
          }, 60 * 1000);

          await sendOTPEmail(username, generatedOTP);
          return res.status(200).json({ message: 'OTP sent to email. Confirm within 60 seconds.' });
        } else {
          return res.status(400).json({ message: 'OTP already sent. Please wait before resending.' });
        }
      }

      // Validate OTP
      if (!cachedOTP || cachedOTP.code !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }

      // Check expiry
      if (now > cachedOTP.expiresAt) {
        delete OTP_CACHE[username];
        return res.status(400).json({ message: 'OTP expired. Please request a new one.' });
      }
    }

    // Hash password and save admin user
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await adminCollection.insertOne({ username, password: hashedPassword });

    if (result.insertedId) {
      delete OTP_CACHE[username];
      return res.status(201).json({ message: 'Admin registered successfully' });
    } else {
      return res.status(500).json({ message: 'Failed to register admin' });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Resend OTP endpoint for email usernames
const resendAdminOTP = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username || !isEmail(username)) {
      return res.status(400).json({ message: 'Valid email username is required for OTP resend.' });
    }

    const db = await getDB();
    const adminCollection = db.collection('adminUser');

    const existingUser = await adminCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'This email is already registered.' });
    }

    const now = Date.now();
    const cachedOTP = OTP_CACHE[username];

    if (cachedOTP && now < cachedOTP.expiresAt) {
      return res.status(400).json({ message: 'OTP already sent. Please wait before resending.' });
    }

    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

    OTP_CACHE[username] = {
      code: generatedOTP,
      expiresAt: now + 60 * 1000,
    };

    // Auto clear OTP after 60 seconds
    setTimeout(() => {
      delete OTP_CACHE[username];
    }, 60 * 1000);

    await sendOTPEmail(username, generatedOTP);
    return res.status(200).json({ message: 'New OTP resent to your email.' });
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const changeAdminPassword = async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;

    if (!username || !oldPassword || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const db = await getDB();
    const adminCollection = db.collection('adminUser');

    // 1. Check if admin with username and oldPassword exists
    const admin = await adminCollection.findOne({ username, password: oldPassword });

    if (!admin) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }

    // 2. Update password
    const result = await adminCollection.updateOne(
      { username },
      { $set: { password: newPassword } }
    );

    if (result.modifiedCount === 1) {
      return res.status(200).json({ message: 'Password updated successfully' });
    } else {
      return res.status(500).json({ message: 'Failed to update password' });
    }
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }
    const db = await getDB();
    const adminCollection = db.collection('adminUser');
    // Find user by username
    const admin = await adminCollection.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password', auth: false });
    }
    // Compare password hash
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (passwordMatch) {
      return res.status(200).json({ message: 'Login successful', auth: true });
    } else {
      return res.status(401).json({ message: 'Invalid username or password', auth: false });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  adminLogin,
  adminRegister,
  changeAdminPassword
};
