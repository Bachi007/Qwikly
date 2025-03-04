
const express = require('express');
const router = express.Router();
const ChangeRequest = require('../models/changeRequest');
const Task = require('../models/task');
var incident = require('../models/incident');
const changeRequest = require('../models/changeRequest');
const User = require('../models/user');
var nodemailer=require('nodemailer')

router.post('/Saveincident',(req,res)=>{
  var a = new incident(req.body);
  a.save()
    .then(()=>res.send({"status":"Data Saved"}))
    .catch((err)=>res.send(err))
})

router.get('/getincidents',(req,res)=>{
  incident.find({})
    .then((docs)=>res.send(docs))
    .catch((err)=>console.log(err))
})

router.patch('/data/:id', (req, res) => {
  incident.findByIdAndUpdate(
    req.params.id,
    { comments: req.body.comments },
    { new: true } // Return the updated document
  )
    .then(async (updatedData) => {
      if (!updatedData) {
        return res.status(404).json({ message: 'Data not found' });
      }
      //console.log(updatedData)
    await  User.findOne({userName:updatedData.createdBy})
      .then((docs)=>{
       
        var transport=nodemailer.createTransport({
          'service':'gmail',
          auth:{
            user:'chitturi.bhaskarasai@gmail.com',
            pass:'yfad nqus ydyt xbbg'
          }
        })
        console.log(docs)
        var mailOptions ={
          from:'chitturi.bhaskarasai@gmail.com',
          to:`${docs.email}`,
          subject:'update on your incident',
          text:`Hello ${docs.userName} your incident is updated with ${req.body.comments}`
        }
        console.log(mailOptions)
        transport.sendMail(mailOptions,(err)=>{
          if(err){
            console.log(err)
          }
          else{
            console.log("Email sent :)")
          }
        })
      })

      res.json({ message: 'Comment updated successfully', data: updatedData });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});


router.patch('/updaterequeststatus/:id', (req, res) => {
  changeRequest.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true } // Return the updated document
  )
    .then(async (updatedData) => {
      if (!updatedData) {
        return res.status(404).json({ message: 'Data not found' });
      }
      //console.log(updatedData)
    await  User.findOne({userName:updatedData.submittedBy})
      .then((docs)=>{
       
        var transport=nodemailer.createTransport({
          'service':'gmail',
          auth:{
            user:'chitturi.bhaskarasai@gmail.com',
            pass:'yfad nqus ydyt xbbg'
          }
        })
        console.log(docs)
        var mailOptions ={
          from:'chitturi.bhaskarasai@gmail.com',
          to:`${docs.email}`,
          subject:'update on your Request',
          text:`Hello ${docs.userName} your incident is updated with ${req.body.status}`
        }
        console.log(mailOptions)
        transport.sendMail(mailOptions,(err)=>{
          if(err){
            console.log(err)
          }
          else{
            console.log("Email sent :)")
          }
        })
      })

      res.json({ message: 'Comment updated successfully', data: updatedData });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});


router.get('/getincident/:id',(req,res)=>{
  incident.find({createdBy:req.params.id})
  .then((docs)=>res.send(docs))
  .catch((err)=>console.log(err))
})

router.delete('/deleteincident/:id',(req,res)=>{
  incident.findByIdAndDelete(req.params.id)
  .then((docs)=>res.send({"status":"deleted successfully"}))
  .catch((err)=>console.log(err))
})

router.post("/change-request", async (req, res) => {
  try {
    const { description, impactAssessment, urgency, status, fromDate, toDate, tasks, submittedBy, reviewedBy } = req.body;

    // Step 1: Create ChangeRequest without tasks first
    const newChangeRequest = new ChangeRequest({
      description,
      impactAssessment,
      urgency,
      status,
      fromDate,
      toDate,
      tasks: [],  // Temporarily empty
      submittedBy,
      reviewedBy
    });

    await newChangeRequest.save();
    const changeRequestId = newChangeRequest._id;

    // Step 2: Save each task with linkedToChange as the new ChangeRequest ID
    const taskIds = await Promise.all(tasks.map(async (task) => {
      const newTask = new Task({ 
        ...task, 
        linkedToChange: changeRequestId  // Linking task to ChangeRequest
      });
      await newTask.save();
      return newTask._id;
    }));

    // Step 3: Update ChangeRequest with task references
    newChangeRequest.tasks = taskIds;
    await newChangeRequest.save();

    res.status(201).json({ message: 'Change Request created successfully', changeRequest: newChangeRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.patch('/assign-task', async (req, res) => {
  const { requestId, taskId, assignedTo } = req.body;

  console.log("Received Request Data:", { requestId, taskId, assignedTo });

  if (!requestId || !taskId || !assignedTo) {
      return res.status(400).json({ message: "Missing required fields" });
  }

  try {
      const taskUpdate = await Task.updateOne(
          { _id: taskId },
          { $set: { assignedTo: assignedTo } }
      );

      if (taskUpdate.modifiedCount === 0) {
          return res.status(404).json({ message: "Task not found or not updated" });
      }

      console.log("Task updated successfully in DB");

      return res.status(200).json({ message: "Task assigned successfully" });

  } catch (error) {
      console.error("Error updating task:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
});




// GET /changeRequests - Get all Change Requests with Tasks
router.get("/getchangerequest", async (req, res) => {
  try {
    const changeRequests = await ChangeRequest.find()
      .populate('tasks')
      .populate('submittedBy', 'name email') // Assuming User schema has name and email
      .populate('reviewedBy', 'name email');
    res.status(200).json(changeRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/getchange/:id",(req,res)=>{
  changeRequest.find({submittedBy:req.params.id})
  .then((docs)=>{res.status(200).json(docs)})
  .catch((err)=>res.send(err))

})


router.get("/getalltasks", async (req, res) => {
  try{
      
        await Task.find({}).then((docs)=>{
          res.status(200).json(docs);
        })
  }
  catch(error){
    res.status(500).json({error: error.message});
  }
})

router.get("/gettasks/:id", async (req, res) => {
  try{
        uid=req.params.id;
        await Task.find({assignedTo: uid}).then((docs)=>{
          res.status(200).json(docs);
        })
  }
  catch(error){
    res.status(500).json({error: error.message});
  }
})




router.patch('/update-status/:id', async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    // Step 1: Update the Task status
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Step 2: Check if all tasks of the associated ChangeRequest are completed
    const changeRequest = await ChangeRequest.findById(task.linkedToChange).populate('tasks');

    if (!changeRequest) {
      return res.status(404).json({ message: "ChangeRequest not found" });
    }

    const allTasksCompleted = changeRequest.tasks.every(t => t.status === "Completed");

    // Step 3: If all tasks are completed, update ChangeRequest status
    if (allTasksCompleted) {
      changeRequest.status = "Completed";
      await changeRequest.save();
    }

    res.json({
      message: "Status updated successfully",
      task,
      changeRequestStatus: allTasksCompleted ? "Completed" : changeRequest.status
    });

  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete('/delete-request/:id',(req,res)=>{
  ChangeRequest.findByIdAndDelete(req.params.id).then((doc)=>{
    res.status(200).send({message: "Change Request Deleted"});
  }).catch((err)=>{
    res.status(500).json({error: err.message});
  })
})

router.get('/count',(req,res)=>{
  incident.countDocuments()
  .then((data)=>{
      changeRequest.countDocuments()
      .then((data2)=>{
        User.countDocuments()
        .then((data3)=>{
          res.send({"incidents":data,"changerequest":data2,"users":data3})
        })
       
      })
  })
})







module.exports= router