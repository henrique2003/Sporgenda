import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  password: string
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
})

export default model<IUser>('User', UserSchema)
