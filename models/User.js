const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please add a name']
  },
  pass: { // Use 'pass' to match your existing data
    type: String,// Do not return the password by default when querying
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// // Middleware to hash password before saving (if modified)
// UserSchema.pre('save', async function(next) {
//   // Only hash the password if it has been modified (or is new)
//   if (!this.isModified('pass')) return next();

//   // Generate a salt and hash on separate function calls
//   const salt = await bcrypt.genSalt(10);
//   this.pass = await bcrypt.hash(this.pass, salt);
//   next();
// });

// // Method to compare the provided password with the database hash
// UserSchema.methods.matchPassword = async function(enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.pass);
// };

module.exports = mongoose.model('User', UserSchema);
