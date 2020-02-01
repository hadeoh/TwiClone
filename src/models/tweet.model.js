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
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    numberOfReplies: {
      type: Number,
      default: 0
    },
    replies: [{
      body: String,
      postedBy: {
          type: Schema.Types.ObjectId,
          ref: 'User'
      },
      timeReplied: {
        type: Date,
        default: null
      }
  }]
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
