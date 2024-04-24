import { model, Schema } from 'mongoose';
const ProfileSchema = new Schema({
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    ID: { type: String, default: '' },
});
const ProfileModel = model('Profile', ProfileSchema);
export default ProfileModel;
