import { model, Schema } from 'mongoose';
const AuthSchema = new Schema({
    uuid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
});
const authModel = model('Auth', AuthSchema);
export default authModel;
