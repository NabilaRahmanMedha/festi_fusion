import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const createAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(adminPassword, salt);

      const admin = new User({
        username: 'admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });

      await admin.save();
      console.log('Admin account created');
    } else {
      console.log('Admin account already exists');
    }
  } catch (error) {
    console.error('Error creating admin:', error);
  }
};

export default createAdmin;
