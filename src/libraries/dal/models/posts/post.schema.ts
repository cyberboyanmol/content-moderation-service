import * as mongoose from 'mongoose';
import { IPostDoc, IPostModel } from './post.entity';
import toJSON from '../plugins/toJSON';

const postSchema = new mongoose.Schema<IPostDoc, IPostModel>(
  {
    objType: {
      type: String,
      default: 'post',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      maxlength: 3000,
      required: true,
    },
    is_safe: {
      type: Boolean,
      default: true,
    },
    media: [
      {
        url: {
          type: String,
          default: null,
        },
        format: {
          type: String,
          default: null,
        },
        publicId: {
          type: String,
          default: null,
        },
        resource_type: {
          type: String,
          default: null,
        },
        thumbnail_url: {
          type: String,
          default: null,
        },
        asset_id: {
          type: String,
          default: null,
        },
      },
    ],
    likes: [
      {
        _id: false,
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
      },
    ],
    comments: [
      {
        _id: false,
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

postSchema.plugin(toJSON);
const Post = mongoose.model<IPostDoc, IPostModel>('Post', postSchema);
export default Post;