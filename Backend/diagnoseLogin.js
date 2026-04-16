const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/userModel');

async function diagnoseLogin() {
    try {
        console.log('\n🔍 ADMIN LOGIN DIAGNOSTIC TOOL\n');
        console.log('═'.repeat(60));
        
        // Connect to MongoDB
        await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
        console.log('✅ Connected to MongoDB\n');
        
        // Step 1: Find the admin user
        const targetEmail = 'meghaniansh942005@gmail.com';
        console.log(`📧 Looking for user with email: ${targetEmail}`);
        const findAdmin = await User.findOne({ email: targetEmail });
        
        if (!findAdmin) {
            console.log('❌ USER NOT FOUND in database');
            console.log('\n   Solution: Run forceReset.js or setupAdmin.js to create admin user');
            await mongoose.connection.close();
            return;
        }
        
        console.log('✅ User found!\n');
        
        // Step 2: Check role
        console.log(`📋 Role field: "${findAdmin.role}"`);
        if (findAdmin.role === 'admin') {
            console.log('   ✅ Role is correctly set to "admin"\n');
        } else {
            console.log(`   ❌ ERROR: Role is "${findAdmin.role}", should be "admin"`);
            console.log('   Solution: Run forceReset.js to update role\n');
        }
        
        // Step 3: Check password hash
        console.log(`🔒 Password field check:`);
        if (!findAdmin.password) {
            console.log('   ❌ ERROR: Password field is EMPTY!');
            console.log('   Solution: Run forceReset.js to set password\n');
        } else if (!findAdmin.password.startsWith('$2b$') && !findAdmin.password.startsWith('$2a$')) {
            console.log(`   ❌ ERROR: Password doesn't look like a bcrypt hash: ${findAdmin.password.substring(0, 30)}...`);
            console.log('   Solution: Run forceReset.js to properly hash password\n');
        } else {
            console.log(`   ✅ Password is a valid bcrypt hash (${findAdmin.password.length} chars)\n`);
        }
        
        // Step 4: Test password matching
        console.log('🔑 Testing password match with "Admin123":');
        try {
            const isMatch = await bcrypt.compare('Admin123', findAdmin.password);
            if (isMatch) {
                console.log('   ✅ Password "Admin123" MATCHES!\n');
            } else {
                console.log('   ❌ ERROR: Password "Admin123" does NOT match the hash in database');
                console.log('   Solution: Run forceReset.js to reset password\n');
            }
        } catch (err) {
            console.log(`   ❌ ERROR during password comparison: ${err.message}`);
            console.log('   This usually means the password hash is corrupted\n');
        }
        
        // Step 5: Show user details
        console.log('─'.repeat(60));
        console.log('📝 Full User Details:\n');
        console.log(`  ID:        ${findAdmin._id}`);
        console.log(`  Email:     ${findAdmin.email}`);
        console.log(`  Role:      ${findAdmin.role}`);
        console.log(`  firstname: ${findAdmin.firstname}`);
        console.log(`  lastname:  ${findAdmin.lastname}`);
        console.log(`  Mobile:    ${findAdmin.mobile}`);
        console.log(`  Created:   ${findAdmin.createdAt}`);
        console.log(`  Updated:   ${findAdmin.updatedAt}`);
        
        // Step 6: Final recommendation
        console.log('\n' + '═'.repeat(60));
        console.log('📋 DIAGNOSIS COMPLETE\n');
        
        const issues = [];
        if (findAdmin.role !== 'admin') issues.push('role');
        if (!findAdmin.password || (!findAdmin.password.startsWith('$2b$') && !findAdmin.password.startsWith('$2a$'))) issues.push('password');
        
        if (issues.length === 0) {
            console.log('✅ ALL CHECKS PASSED! Admin account is correctly configured.');
            console.log('   If login still fails, check that you\'re entering the correct password.');
            console.log('   Try: email = meghaniansh942005@gmail.com, password = Admin123\n');
        } else {
            console.log('⚠️  ISSUES FOUND: ' + issues.join(', '));
            console.log('\n📌 RECOMMENDED ACTION:');
            console.log('   Run: node forceReset.js');
            console.log('   This will fix role and/or password hash\n');
        }
        
    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    }
}

diagnoseLogin();
