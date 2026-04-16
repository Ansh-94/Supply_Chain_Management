const mongoose = require('mongoose');
const User = require('./models/userModel');
const dotenv = require('dotenv').config();

async function setupAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/ecommerce');
        console.log('Connected to DB...');

        const email = 'meghaniansh942005@gmail.com';
        let user = await User.findOne({ email });

        if (user) {
            console.log('User exists. Updating to admin...');
            user.role = 'admin';
            user.password = 'Admin123'; // Setting a known password
            await user.save();
            console.log('User updated to admin with password: Admin123');
        } else {
            console.log('Creating new admin user...');
            await User.create({
                firstname: 'Meghani',
                lastname: 'Ansh',
                email: email,
                mobile: '1234567890',
                password: 'Admin123',
                role: 'admin'
            });
            console.log('Admin user created successfully.');
        }
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

setupAdmin();
