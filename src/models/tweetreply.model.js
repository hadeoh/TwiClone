import { Schema, model } from 'mongoose';

const TweetReplySchema = new Schema(
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
    tweetId: {
      type: Schema.Types.ObjectId,
      ref: 'Tweet'
    }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

/**
 * pre-save hooks
 */
TweetReplySchema.pre('save', async function(next) {});

/**
 * Methods
 */
TweetReplySchema.methods = {
  toJSON() {}
};

/**
 * Statics
 */
TweetReplySchema.statics = {};

module.exports = model('TweetReply', TweetReplySchema);
