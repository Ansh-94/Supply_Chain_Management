const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

async function forceReset() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
        const usersCollection = mongoose.connection.collection('users');
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('Admin123', salt);
        
        const result = await usersCollection.updateOne(
            { email: 'meghaniansh942005@gmail.com' },
            { $set: { role: 'admin', password: hashedPassword } }
        );
        
        if (result.matchedCount > 0) {
            console.log('SUCCESS: Password reset to "Admin123" and role set to "admin".');
        } else {
            console.log('ERROR: User not found.');
        }
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

forceReset();
