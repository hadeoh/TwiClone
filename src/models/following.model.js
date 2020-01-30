import { Schema, model } from 'mongoose';

const FollowingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    followingId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

/**
 * Methods
 */
FollowingSchema.methods = {
  toJSON() {}
};

/**
 * Statics
 */
FollowingSchema.statics = {};

export default model('User', FollowingSchema);
