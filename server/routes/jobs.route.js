const express = require("express");

const JobController = require("../controllers/job.controller");

const publicRouter = express.Router();
const privateRouter = express.Router();

/* ---------- Public Routes ---------- */
publicRouter.get("/", JobController.getJobs);  // Get all jobs
publicRouter.get("/search", JobController.searchJobs);  // Search/filter jobs
publicRouter.get("/:jobId", JobController.getJobById);  // Get job by id

/* ---------- User Routes ---------- */
privateRouter.post("/:jobId/apply", JobController.applyForJob);
privateRouter.delete("/:jobId/apply", JobController.withdrawApplication);
privateRouter.get("/my/applications", JobController.getMyApplications);

/* ---------- Organization Routes ---------- */
privateRouter.post("/", JobController.createJob);
privateRouter.get("/my/jobs", JobController.getMyJobs);
privateRouter.patch("/:jobId", JobController.updateJob);
privateRouter.delete("/:jobId", JobController.deleteJob);
privateRouter.patch("/:jobId/close", JobController.closeJob);
privateRouter.patch("/:jobId/open", JobController.openJob);
privateRouter.get("/:jobId/applications", JobController.getJobApplications);
privateRouter.patch("/:jobId/applications/:applicationId", JobController.updateApplicationStatus);

module.exports = {
    public: publicRouter,
    private: privateRouter,
};