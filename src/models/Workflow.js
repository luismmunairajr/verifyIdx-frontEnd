import mongoose from 'mongoose';

const nodeSchema = new mongoose.Schema({
  id: String,
  type: String,
  position: {
    x: Number,
    y: Number,
  },
  data: {
    title: String,
    description: String,
    iconName: String,
  },
  measured: {
    width: Number,
    height: Number,
  },
});

const edgeSchema = new mongoose.Schema({
  source: String,
  target: String,
  animated: Boolean,
  style: {
    stroke: String,
    strokeWidth: Number,
  },
  markerEnd: {
    type: { type: String },
  },
  id: String,
});

const workflowSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  nodes: [nodeSchema],
  edges: [edgeSchema],
  categories: {
    type: [String],
    default: [], 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Workflow || mongoose.model('Workflow', workflowSchema);
