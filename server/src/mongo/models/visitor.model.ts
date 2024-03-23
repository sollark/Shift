import { Schema, model } from 'mongoose'

export type Visitor = {
  publicId: string
  ips: string[]
  paths: string[]
  timestamps: Date[]
  deviceInfo: {
    device: string
    os: {
      name: string
      version: string
    }
    browser: {
      name: string
      version: string
      major: string
    }
  }
  geoInfo: {
    country: string
    city: string
  }
}

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
})

const VisitorModel = model<Visitor>('Visitor', VisitorSchema)
export default VisitorModel
