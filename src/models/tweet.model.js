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
    },
    replies: {
      type: Number,
      default: 0
    }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

/**
 * Methods
 */
TweetSchema.methods = {
  toJSON() {
    const { _id, __v, ...rest } = this.toObject();
    const tweet = { ...rest, id: _id };
    return tweet;
  }
};

/**
 * Statics
 */
TweetSchema.statics = {};

module.exports = model('Tweet', TweetSchema);
