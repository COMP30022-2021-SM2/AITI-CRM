const express = require("express")
require('jsonwebtoken');
const passport = require('passport');
const scheduleController = require("../controllers/scheduleController")
const scheduleRouter = express.Router()

// add schedule
scheduleRouter.post('', scheduleController.addSchedule)

// update schedule status
scheduleRouter.put('/status/:scheduleId', scheduleController.updateScheduleStatus)

// update schedule details
scheduleRouter.put('/details/:scheduleId', scheduleController.updateScheduleDetails)

module.exports = scheduleRouter