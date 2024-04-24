import { model, Schema } from 'mongoose';
const RefreshTokenSchema = new Schema();
const RefreshTokenModel = model('RefreshTokenData', RefreshTokenSchema);
export default RefreshTokenModel;
