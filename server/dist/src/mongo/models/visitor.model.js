import { Schema, model } from 'mongoose';
const VisitorSchema = new Schema({
    publicId: { type: String, required: true },
    ips: { type: [String], default: [] },
    paths: { type: [String], default: [] },
    timestamps: { type: [Date], default: [] },
    deviceInfo: {
        device: { type: String, default: '' },
        os: {
            name: { type: String, default: '' },
            version: { type: String, default: '' },
        },
        browser: {
            name: { type: String, default: '' },
            version: { type: String, default: '' },
            major: { type: String, default: '' },
        },
    },
    geoInfo: {
        country: { type: String, default: '' },
        city: { type: String, default: '' },
    },
});
const VisitorModel = model('Visitor', VisitorSchema);
export default VisitorModel;
