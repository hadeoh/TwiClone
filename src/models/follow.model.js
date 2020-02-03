import { Schema, model } from 'mongoose';

const FollowSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    followerId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

/**
 * Methods
 */
FollowSchema.methods = {
  toJSON() {}
};

/**
 * Statics
 */
FollowSchema.statics = {};

module.exports = model('Follow', FollowSchema);
