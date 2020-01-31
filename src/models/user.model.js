import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 250,
      required: true
    },
    email: {
      type: String,
      index: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 5,
      maxlength: 150,
      default: null
    },
    phone: {
      type: String,
      index: true,
      unique: true,
      trim: true,
      minlength: 6,
      maxlength: 20,
      default: null
    },
    username: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 5,
      maxlength: 150,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    followers: {
      type: Number,
      default: 0
    },
    following: {
      type: Number,
      default: 0
    }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

/**
 * pre-save hooks
 */
UserSchema.pre('save', async function(next) {});

/**
 * Methods
 */
UserSchema.methods = {
  toJSON() {}
};

/**
 * Statics
 */
UserSchema.statics = {};

module.exports = model('User', UserSchema);
