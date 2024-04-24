import { Schema, Types, model } from 'mongoose';
export const ACCOUNT_STATUS = {
    incomplete: 'incomplete',
    pending: 'pending',
    active: 'active',
    inactive: 'inactive',
    deleted: 'deleted',
};
export const USER_ROLE = {
    guest: 'guest',
    user: 'user',
    admin: 'admin',
};
const AccountSchema = new Schema({
    uuid: { type: String, unique: true },
    profile: {
        type: Types.ObjectId,
        ref: 'Profile',
    },
    status: {
        type: String,
        enum: Object.values(ACCOUNT_STATUS),
        default: ACCOUNT_STATUS.incomplete,
        required: true,
    },
    role: {
        type: String,
        enum: Object.values(USER_ROLE),
        default: USER_ROLE.user,
        required: true,
    },
});
const accountModel = model('Account', AccountSchema);
export default accountModel;
