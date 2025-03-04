const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const changeRequestSchema = new Schema({
  description: { type: String, required: true },
  impactAssessment: { type: String },
  urgency: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Completed'], default: 'Pending' },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  submittedBy: { type: String},
  reviewedBy: { type: String}
}, { timestamps: true });

module.exports = mongoose.model('ChangeRequest', changeRequestSchema);
