import { model, Schema } from 'mongoose'

export type Credentials = {
  email: string
  password: string
}

const AuthSchema = new Schema({
  uuid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
})

const authModel = model<Credentials & { uuid: string }>('Auth', AuthSchema)
export default authModel
