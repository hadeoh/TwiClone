import { Schema, model } from 'mongoose';

const TweetSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 500,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    replyTo: {
      type: Schema.Types.ObjectId,
      ref: 'Tweet',
      default: null
    }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

/**
 * Methods
 */
TweetSchema.methods = {
  toJSON() {}
};

/**
 * Statics
 */
TweetSchema.statics = {};

module.exports = model('Tweet', TweetSchema);
