import { Schema, model } from 'mongoose';
import config from '../config';
import { hashPassword } from '../services/bcrypt.service';
import TweetSchema from '../models/tweet.model';

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
    userName: {
      type: String,
      index: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 2,
      maxlength: 250,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true,
      default: config.avatar
    },
    location: {
      type: String,
      default: null,
      trim: true
    },
    website: {
      type: String,
      default: null,
      trim: true
    },
    numberOfFollowers: {
      type: Number,
      default: 0
    },
    numberOfFollowing: {
      type: Number,
      default: 0
    },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    tweets: [{ type: Schema.Types.ObjectId, ref: 'Tweet' }]
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

UserSchema.index({email:1}, {phone:1}, {userName:1});
/**
 * pre-save hooks
 */
UserSchema.pre('save', async function(next) {
  try {
    this.password = await hashPassword(this.toObject());
    next();
  } catch (err) {
    next(err);
  }
});

/**
 * Methods
 */
UserSchema.methods = {
  toJSON() {
    const { password, _id, __v, ...rest } = this.toObject();
    const user = { ...rest, id: _id };
    return user;
  }
};

/**
 * Statics
 */
UserSchema.statics = {};

module.exports = model('User', UserSchema);
