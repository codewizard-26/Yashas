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
        const { organizationId } = req.body;

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

        await db.delete(jobs).where(eq(jobs.id, jobId));

        return {
            success: true,
            status: 200,
            message: "Job deleted successfully",
        };
    }

    static async closeJob(organization, jobId) {

        const [job] = await db.update(jobs).set({
            appllicationDeadline: new Date(),
        }).where(eq(jobs.id, jobId)).returning();

        return job;
    }

    static async openJob(organization, jobId) {

        const [job] = await db.update(jobs).set({
            appllicationDeadline: null,
        }).where(eq(jobs.id, jobId)).returning();

        return job;
    }

    static async applyForJob(user, jobId, data) {

        const [application] = await db.insert(applications).values({
            jobId,
            userId: user.id,
            applicationStatusId:
            data.applicationStatusId,
            resumeURL: data.resumeURL,
        }).returning();

        return application;
    }

    static async withdrawApplication(user, jobId) {
        await db.delete(applications).where(eq(applications.jobId, jobId));

        return {
            message: "Application withdrawn successfully",
        };
    }

    static async getMyApplications(user) {

        return await db.query.applications.findMany({
            where: eq(
                applications.userId,
                user.id
            ),
        });

    }

    static async getMyJobs(organization) {

        return await db.query.jobs.findMany({
            where: eq(
                jobs.organizationId,
                organization.id
            ),
        });

    }

    static async getJobApplications(organization, jobId) {

        return await db.query.applications.findMany({
            where: eq(
                applications.jobId,
                jobId
            ),
        });

    }

    static async updateApplicationStatus( organization, jobId, applicationId, data ) {

        const [application] = await db .update(applications) .set({
            applicationStatusId:
            data.applicationStatusId,
        }).where(
            eq(
                applications.id,
                applicationId
            )
        ).returning();

        if (!application) {
            throw new Error(
                "Application not found"
            );
        }

        return application;
    }

}

module.exports = JobService;