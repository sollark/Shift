import { model, Schema } from 'mongoose'

export type Profile = {
  firstName: string
  lastName: string
  ID: string
}

const ProfileSchema = new Schema({
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  ID: { type: String, default: '' },
})

const ProfileModel = model<Profile>('Profile', ProfileSchema)
export default ProfileModel
