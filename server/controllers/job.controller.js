const JobService = require("../services/jobs.service");

class JobController {
    static async createJob(req, res, next) {
        try {
            const data = await JobService.createJob(req);
            res.status(201).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async getJobs(req, res, next) {
        try {
            const data = await JobService.getJobs(req.query);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async searchJobs(req, res, next) {
        try {
            const data = await JobService.searchJobs(req.query);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async getJobById(req, res, next) {
        try {
            const data = await JobService.getJobById(req.params.jobId);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async updateJob(req, res, next) {
        try {
            const data = await JobService.updateJob(req);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async deleteJob(req, res, next) {
        try {
            const data = await JobService.deleteJob(req);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async closeJob(req, res, next) {
        try {
            const data = await JobService.closeJob(req);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async openJob(req, res, next) {
        try {
            const data = await JobService.openJob(req);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async applyForJob(req, res, next) {
        try {
            const data = await JobService.applyForJob(req);
            res.status(201).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async withdrawApplication(req, res, next) {
        try {
            const data = await JobService.withdrawApplication(req);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async getMyApplications(req, res, next) {
        try {
            const data = await JobService.getMyApplications(req);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async getMyJobs(req, res, next) {
        try {
            const data = await JobService.getMyJobs(req.user);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async getJobApplications(req, res, next) {
        try {
            const data = await JobService.getJobApplications(req);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async updateApplicationStatus(req, res, next) {
        try {
            const data = await JobService.updateApplicationStatus(req);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = JobController;