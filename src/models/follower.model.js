import { Schema, model } from 'mongoose';

const FollowersSchema = new Schema(
  {
    userId: {
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
FollowersSchema.methods = {
  toJSON() {}
};

/**
 * Statics
 */
FollowersSchema.statics = {};

export default model('Follower', FollowersSchema);
