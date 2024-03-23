import { Schema, model } from 'mongoose'

export type Visitor = {
  ip: string
  userAgent: string
  paths: string[]
  timestamps: Date[]
  device: string
}

const VisitorSchema = new Schema({
  ip: { type: String, default: '' },
  userAgent: { type: String, default: '' },
  paths: { type: [String], default: [] },
  timestamps: { type: [Date], default: [] },
  device: { type: String, default: '' },
})

const VisitorModel = model<Visitor>('Visitor', VisitorSchema)
export default VisitorModel
