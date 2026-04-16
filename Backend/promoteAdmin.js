const mongoose = require('mongoose');

async function promote() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
        const User = mongoose.model('User', new mongoose.Schema({
            email: String,
            role: String
        }));

        const result = await User.findOneAndUpdate(
            { email: 'meghaniansh942005@gmail.com' },
            { role: 'admin' },
            { new: true }
        );

        if (result) {
            console.log('SUCCESS: User promoted to admin.');
        } else {
            console.log('ERROR: User not found in local database.');
        }
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

promote();
