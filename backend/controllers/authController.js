const prisma = require('../lib/prisma');
const jwt = require('jsonwebtoken');

exports.googleLogin = async (req, res) => {
  try {
    const { email, name, avatar } = req.body;

    // 1. Find or Create User
    let user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          avatar,
          authProvider: 'google'
        }
      });
    }

    // 2. Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'hackathon_secret_123',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      },
      token
    });
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(500).json({ success: false, message: 'Authentication failed' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId }
    });
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not fetch profile' });
  }
};
