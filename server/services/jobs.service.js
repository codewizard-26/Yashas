const { eq, and } = require("drizzle-orm");

const { db } = require("../config/db");
const { jobs } = require("../drizzle/schema/jobs.schema");
const { controlLevel } = require("../drizzle/schema/controlLevel.schema");
const { organizations } = require("../drizzle/schema/organization.schema");
const { organizationMembers } = require("../drizzle/schema/organizationMembers.schema");
const { applications } = require("../drizzle/schema/applications.schema");

class JobService {

    static async createJob(req) {
        const userId = req.user.id; // Set by auth middleware

        const {
            // organizationName,
            organizationId,
            title,
            description,
            location,
            salary,
            employmentType,
            experienceRequired,
            applicationDeadline,
        } = req.body;

        // Find organization by name
        // const organization = await db.query.organizations.findFirst({
        //     where: eq(organizations.name, organizationName),
        // });

        // if (!organization) {
        //     return {
        //         success: false,
        //         status: 404,
        //         message: "Organization not found",
        //     };
        // }

        // Check if user belongs to the organization
        const member = await db.query.organizationMembers.findFirst({
            where: and(
                eq(organizationMembers.userId, userId),
                eq(organizationMembers.organizationId, organizationId)
            ),
        });

        if (!member) {
            throw new Error("Not a member");
        }

        const level = await db.query.controlLevel.findFirst({
            where: eq(controlLevel.id, member.controllevelId),
        });
        
        if (
            level.levelName !== "Admin" &&
            level.levelName !== "SuperAdmin"
        ) {
            throw new Error("Unauthorized");
        }

        // Create job
        const [job] = await db
            .insert(jobs)
            .values({
                organizationId,
                postedbyMemberId: userId,
                title,
                description,
                location,
                salaryRange: salary,
                requirements: {
                    employmentType,
                    experienceRequired,
                },
                applicationDeadline,
            })
            .returning();

        return {
            success: true,
            status: 201,
            message: "Job created successfully",
            data: job,
        };
    }

    static async getJobs() {
        return await db.query.jobs.findMany();
    }

    static async searchJobs(query) {
        return await db.query.jobs.findMany();
    }

    static async getJobById(jobId) {
        const job = await db.query.jobs.findFirst({
            where: eq(jobs.id, jobId),
        });

        if (!job) {
            throw new Error("Job not found");
        }

        return job;
    }

    static async updateJob(req) {
        const userId = req.user.id;
        const { jobId } = req.params;

        const {
            // organizationName,
            organizationId,
            title,
            description,
            location,
            salary,
            employmentType,
            experienceRequired,
            applicationDeadline,
        } = req.body;

        // const organization = await db.query.organizations.findFirst({
        //     where: eq(organizations.name, organizationName),
        // });

        // if (!organization) {
        //     return {
        //         success: false,
        //         status: 404,
        //         message: "Organization not found",
        //     };
        // }

        const member = await db.query.organizationMembers.findFirst({
            where: and(
                eq(organizationMembers.userId, userId),
                eq(organizationMembers.organizationId, organizationId)
            ),
        });

        if (!member) {
            throw new Error("Not a member");
        }

        const level = await db.query.controlLevel.findFirst({
            where: eq(controlLevel.id, member.controllevelId),
        });

        if (
            level.levelName !== "Admin" &&
            level.levelName !== "SuperAdmin"
        ) {
            throw new Error("Unauthorized");
        }

        const job = await db.query.jobs.findFirst({
            where: and(
                eq(jobs.id, jobId),
                eq(jobs.organizationId, organizationId)
            ),
        });

        if (!job) {
            return {
                success: false,
                status: 404,
                message: "Job not found",
            };
        }

        const [updatedJob] = await db
            .update(jobs)
            .set({
                ...(title && { title }),
                ...(description && { description }),
                ...(location && { location }),
                ...(salary && { salaryRange: salary }),
                ...(applicationDeadline && { applicationDeadline }),
                ...((employmentType || experienceRequired) && {
                    requirements: {
                        ...job.requirements,
                        ...(employmentType && { employmentType }),
                        ...(experienceRequired && { experienceRequired }),
                    },
                }),
            })
            .where(eq(jobs.id, jobId))
            .returning();

        return {
            success: true,
            status: 200,
            message: "Job updated successfully",
            data: updatedJob,
        };
    }

    static async deleteJob(req) {
        const userId = req.user.id;
        const { jobId } = req.params;

        // Find the job
        const job = await db.query.jobs.findFirst({
            where: eq(jobs.id, jobId),
        });

        if (!job) {
            return {
                success: false,
                status: 404,
                message: "Job not found",
            };
        }

        // Check if user is a member of the organization that owns the job
        const member = await db.query.organizationMembers.findFirst({
            where: and(
                eq(organizationMembers.userId, userId),
                eq(organizationMembers.organizationId, job.organizationId)
            ),
        });

        if (!member) {
            throw new Error("Not a member");
        }

        // Check control level
        const level = await db.query.controlLevel.findFirst({
            where: eq(controlLevel.id, member.controllevelId),
        });

        if (
            level.levelName !== "Admin" &&
            level.levelName !== "SuperAdmin"
        ) {
            throw new Error("Unauthorized");
        }

        // Delete the job
        await db.delete(jobs).where(eq(jobs.id, jobId));

        return {
            success: true,
            status: 200,
            message: "Job deleted successfully",
        };
    }

    static async closeJob(req) {
        const userId = req.user.id;
        const { jobId } = req.params;

        // Find the job
        const job = await db.query.jobs.findFirst({
            where: eq(jobs.id, jobId),
        });

        if (!job) {
            return {
                success: false,
                status: 404,
                message: "Job not found",
            };
        }

        // Check if user is a member of the organization
        const member = await db.query.organizationMembers.findFirst({
            where: and(
                eq(organizationMembers.userId, userId),
                eq(organizationMembers.organizationId, job.organizationId)
            ),
        });

        if (!member) {
            throw new Error("Not a member");
        }

        // Check control level
        const level = await db.query.controlLevel.findFirst({
            where: eq(controlLevel.id, member.controllevelId),
        });

        if (
            level.levelName !== "Admin" &&
            level.levelName !== "SuperAdmin"
        ) {
            throw new Error("Unauthorized");
        }

        // Close the job
        await db
            .update(jobs)
            .set({ isOpen: false })
            .where(eq(jobs.id, jobId));

        return {
            success: true,
            status: 200,
            message: "Job closed successfully",
        };
    }

    static async openJob(req) {
        const userId = req.user.id;
        const { jobId } = req.params;

        // Find the job
        const job = await db.query.jobs.findFirst({
            where: eq(jobs.id, jobId),
        });

        if (!job) {
            return {
                success: false,
                status: 404,
                message: "Job not found",
            };
        }

        // Check if user is a member of the organization
        const member = await db.query.organizationMembers.findFirst({
            where: and(
                eq(organizationMembers.userId, userId),
                eq(organizationMembers.organizationId, job.organizationId)
            ),
        });

        if (!member) {
            throw new Error("Not a member");
        }

        // Check control level
        const level = await db.query.controlLevel.findFirst({
            where: eq(controlLevel.id, member.controllevelId),
        });

        if (
            level.levelName !== "Admin" &&
            level.levelName !== "SuperAdmin"
        ) {
            throw new Error("Unauthorized");
        }

        // Open the job
        await db
            .update(jobs)
            .set({ isOpen: true })
            .where(eq(jobs.id, jobId));

        return {
            success: true,
            status: 200,
            message: "Job opened successfully",
        };
    }

    static async applyForJob(req) {
        const userId = req.user.id;
        const { jobId } = req.params;

        // Check if job exists
        const job = await db.query.jobs.findFirst({
            where: eq(jobs.id, jobId),
        });

        if (!job) {
            return {
                success: false,
                status: 404,
                message: "Job not found",
            };
        }

        if (!job.isOpen) {
            return {
                success: false,
                status: 400,
                message: "Job is closed",
            };
        }

        // Check if already applied
        const existing = await db.query.applications.findFirst({
            where: and(
                eq(applications.userId, userId),
                eq(applications.jobId, jobId)
            ),
        });

        if (existing) {
            return {
                success: false,
                status: 400,
                message: "Already applied for this job",
            };
        }

        // Create application
        await db.insert(applications).values({
            userId,
            jobId,
            applicationStatusId: "7bc16a92-d78a-42c8-b436-db483e4f427a",
        });

        return {
            success: true,
            status: 201,
            message: "Application submitted successfully",
        };
    }

    static async withdrawApplication(req) {
        const userId = req.user.id;
        const { jobId } = req.params;

        const application = await db.query.applications.findFirst({
            where: and(
                eq(applications.userId, userId),
                eq(applications.jobId, jobId)
            ),
        });

        if (!application) {
            return {
                success: false,
                status: 404,
                message: "Application not found",
            };
        }

        await db
            .delete(applications)
            .where(eq(applications.id, application.id));

        return {
            success: true,
            status: 200,
            message: "Application withdrawn successfully",
        };
    }

    static async getMyApplications(req) {
        const userId = req.user.id;

        const myApplications = await db.query.applications.findMany({
            where: eq(applications.userId, userId),
        });

        return {
            success: true,
            status: 200,
            data: myApplications,
        };
    }

    static async getMyJobs(organization) {

        return await db.query.jobs.findMany({
            where: eq(
                jobs.organizationId,
                organization.id
            ),
        });

    }

    static async getJobApplications(req) {
        const userId = req.user.id;
        const { jobId } = req.params;

        // Find the job
        const job = await db.query.jobs.findFirst({
            where: eq(jobs.id, jobId),
        });

        if (!job) {
            return {
                success: false,
                status: 404,
                message: "Job not found",
            };
        }

        // Check if the user is a member of the organization
        const member = await db.query.organizationMembers.findFirst({
            where: and(
                eq(organizationMembers.userId, userId),
                eq(organizationMembers.organizationId, job.organizationId)
            ),
        });

        if (!member) {
            throw new Error("Not a member");
        }

        // Check control level
        const level = await db.query.controlLevel.findFirst({
            where: eq(controlLevel.id, member.controllevelId),
        });

        if (
            level.levelName !== "Admin" &&
            level.levelName !== "SuperAdmin"
        ) {
            throw new Error("Unauthorized");
        }

        // Get all applications for the job
        const jobApplications = await db.query.applications.findMany({
            where: eq(applications.jobId, jobId),
        });

        return {
            success: true,
            status: 200,
            data: jobApplications,
        };
    }

    static async updateApplicationStatus(req) {
        const userId = req.user.id;
        const { jobId, applicationId } = req.params;
        const { applicationStatusId } = req.body;

        // Find the job
        const job = await db.query.jobs.findFirst({
            where: eq(jobs.id, jobId),
        });

        if (!job) {
            return {
                success: false,
                status: 404,
                message: "Job not found",
            };
        }

        // Check if user is a member of the organization
        const member = await db.query.organizationMembers.findFirst({
            where: and(
                eq(organizationMembers.userId, userId),
                eq(organizationMembers.organizationId, job.organizationId)
            ),
        });

        if (!member) {
            throw new Error("Not a member");
        }

        // Check control level
        const level = await db.query.controlLevel.findFirst({
            where: eq(controlLevel.id, member.controllevelId),
        });

        if (
            level.levelName !== "Admin" &&
            level.levelName !== "SuperAdmin"
        ) {
            throw new Error("Unauthorized");
        }

        // Update application status
        const [application] = await db
            .update(applications)
            .set({
                applicationStatusId,
            })
            .where(eq(applications.id, applicationId))
            .returning();

        if (!application) {
            return {
                success: false,
                status: 404,
                message: "Application not found",
            };
        }

        return {
            success: true,
            status: 200,
            message: "Application status updated successfully",
            data: application,
        };
    };
};
module.exports = JobService;