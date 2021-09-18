const express = require("express");
const router = express.Router();
const { messaging } = require("../controller/message");



router.get(`/message`, messaging);
module.exports = router;