const mongoose = require('mongoose');

async function checkAndFix() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
        
        // Use generic collection access to avoid schema issues
        const usersCollection = mongoose.connection.collection('users');
        
        const user = await usersCollection.findOne({ email: 'meghaniansh942005@gmail.com' });
        
        if (user) {
            console.log('Current user data:', JSON.stringify(user));
            const updateResult = await usersCollection.updateOne(
                { _id: user._id },
                { $set: { role: 'admin' } }
            );
            console.log('Update result:', updateResult.modifiedCount > 0 ? 'Role updated to admin.' : 'Role was already admin.');
        } else {
            console.log('User NOT found in "users" collection.');
            // Check all collections
            const collections = await mongoose.connection.db.listCollections().toArray();
            console.log('Available collections:', collections.map(c => c.name).join(', '));
        }
        
        process.exit();
    } catch (err) {
        console.error('Error during check:', err);
        process.exit(1);
    }
}

checkAndFix();
