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
 * pre-save hooks
 */

// FollowSchema.post('deleteOne', async function(_, next) {
//   const { User: UserQuery } = this._collection.collection.conn.models;

//   try {
//     const { followId, user } = this.options;
//     const decreaseFollowers = UserQuery.findOneAndUpdate(
//       { _id: followId },
//       { $inc: { followers: -1 } }
//     );

//     const decreaseFollowing = UserQuery.findOneAndUpdate(
//       { _id: user },
//       { $inc: { following: -1 } }
//     );

//     await Promise.all([decreaseFollowers, decreaseFollowing]);

//     next();
//   } catch (err) {
//     next(err);
//   }
// });

FollowSchema.post('save', async function(_, next) {
  try {
    const { followId, user } = this.toObject();

    const increaseFollowers = this.model('User').findOneAndUpdate(
      { _id: followId },
      { $inc: { followers: 1 } }
    );

    const increaseFollowing = this.model('User').findOneAndUpdate(
      { _id: user },
      { $inc: { following: 1 } }
    );

    await Promise.all([increaseFollowers, increaseFollowing]);

    next();
  } catch (err) {
    next(err);
  }
});

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
