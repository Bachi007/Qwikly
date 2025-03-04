var mongoose = require('mongoose');
var incidentSchema = mongoose.Schema({
    incidentId:String,
  title:String,
  description: String,
  priority:String,
  category:String,
  status:String,
  createdBy:String,
  comments:String,
})
var incident = mongoose.model('incidentDB',incidentSchema);
module.exports = incident;