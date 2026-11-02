
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters']
    },

    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address'
      ]
    },

    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false
    },

    phone: {
      type: String,
      trim: true,
      default: ''
    },

    role: {
      type: String,
      enum: {
        values: ['guest', 'admin', 'staff','waiter'],
        message: '{VALUE} is not a valid role'
      },
      default: 'guest'
    },

    avatar: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },

    wishlist: [
      {
        type: String
      }
    ],

    bookings: [
      {
        type: String
      }
    ],

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Hash the password before saving the user
userSchema.pre('save', async function () { if (!this.isModified('password')) return; const salt = await bcrypt.genSalt(10); this.password = await bcrypt.hash(this.password, salt); });

// Compare the entered password with the stored hash
userSchema.methods.comparePassword = async function (
  candidatePassword
) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
