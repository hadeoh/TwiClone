import { Schema, model } from 'mongoose';

const TweetSchema = new Schema(
  {
    body: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 500,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
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

export default model('Tweet', TweetSchema);
