const express = require('express');
const router = express.Router();
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../utils/tokens');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

// In-memory store for refresh tokens (for demo only)
let refreshTokensStore = new Set();

// Dummy user check — in real app validate credentials against DB
const USERS = [{ id: 1, email: 'user@example.com', password: 'password123', name: 'Demo User' }];

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = USERS.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const payload = { id: user.id, email: user.email, name: user.name };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken({ id: user.id });

  refreshTokensStore.add(refreshToken);

  return res.json({ accessToken, refreshToken, user: payload });
});

router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: 'Missing refresh token' });
  if (!refreshTokensStore.has(refreshToken)) return res.status(403).json({ message: 'Refresh token revoked' });

  try {
    const payload = verifyRefreshToken(refreshToken); // contains { id, iat, exp... } depending on sign
    // For demo: find user by id
    const user = USERS.find(u => u.id === payload.id);
    if (!user) return res.status(403).json({ message: 'Invalid refresh token payload' });

    const newAccessToken = signAccessToken({ id: user.id, email: user.email, name: user.name });
    const newRefreshToken = signRefreshToken({ id: user.id });

    // rotate refresh tokens: remove old, add new
    refreshTokensStore.delete(refreshToken);
    refreshTokensStore.add(newRefreshToken);

    return res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (err) {
    return res.status(403).json({ message: 'Refresh token invalid or expired' });
  }
});

router.post('/logout', (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken && refreshTokensStore.has(refreshToken)) {
    refreshTokensStore.delete(refreshToken);
  }
  // Client should also clear access token in memory
  return res.json({ message: 'Logged out' });
});

module.exports = router;
