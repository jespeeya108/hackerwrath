const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true, maxlength: 100 },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 8,
      select: false, // never returned by queries unless explicitly asked for
    },
    role: { type: String, enum: ['student', 'admin'], default: 'student' },

    // Student profile (admins can leave these empty)
    rollNumber: { type: String, trim: true, unique: true, sparse: true },
    branch: { type: String, trim: true, uppercase: true }, // e.g. "CSE"
    semester: { type: Number, min: 1, max: 12 },
    graduationYear: { type: Number, min: 2000, max: 2100 },
  },
  { timestamps: true }
);

// Hash the password before saving (only if it changed)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

// Extra safety: strip password from any JSON output
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('User', userSchema);