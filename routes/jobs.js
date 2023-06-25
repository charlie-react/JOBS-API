const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
  getJob,
} = require("../controllers/jobs");

router.route("/").get(getAllJobs).post(createJob)
router.route("/:id").patch(updateJob).delete(deleteJob).get(getJob)

module.exports = router