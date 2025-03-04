const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  status: { type: String, enum: ["Open",'Assigned', "Pending","Closed", 'InProgress', 'Completed'], default: 'Assigned' },
  assignedTo: { type: String},
  createdBy: { type: String },
  linkedToChange: { type: Schema.Types.ObjectId, ref: 'ChangeRequest' },
  dueDate: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
