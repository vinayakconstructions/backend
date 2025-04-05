const express = require('express')
const { feedBack,GetDetails } = require('../controllers/feedback')

const router = express.Router()

router.post("/feedback",feedBack)
router.get("/getdetails",GetDetails)

module.exports = router
