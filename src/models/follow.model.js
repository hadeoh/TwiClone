import { Schema, model } from 'mongoose';

const FollowSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    followId: {
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
  toJSON() {
    const { _id, __v, ...rest } = this.toObject();
    const follow = { ...rest, id: _id };
    return follow;
  }
};

/**
 * Statics
 */
FollowSchema.statics = {};

module.exports = model('Follow', FollowSchema);
