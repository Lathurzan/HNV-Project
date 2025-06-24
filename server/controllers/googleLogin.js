// Google login endpoint for admin
const { OAuth2Client } = require('google-auth-library');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID'; // Set in .env
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com'; // Set in .env

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

async function googleLogin(req, res) {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: 'No token provided', auth: false });
  }
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (payload.email === ADMIN_EMAIL) {
      return res.status(200).json({ message: 'Google login successful', auth: true, email: payload.email });
    } else {
      return res.status(403).json({ message: 'Unauthorized email', auth: false, email: payload.email });
    }
  } catch (err) {
    console.error('Google login error:', err);
    return res.status(401).json({ message: 'Invalid Google token', auth: false });
  }
}

module.exports = googleLogin;
