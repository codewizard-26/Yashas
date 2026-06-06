const { eq } = require("drizzle-orm");

const { db } = require("../config/db");
const { jobs } = require("../drizzle/schema/jobs.schema");
const { applications } = require("../drizzle/schema/applications.schema");

class JobService {

    static async createJob(organization, data) {
        const [job] = await db.insert(jobs).values({
            ...data,
            organizationId: organization.id,
            postedbyMemberId: organization.id,
        }).returning();

        return job;
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

    static async updateJob(organization, jobId, data) {

        const [job] = await db.update(jobs).set(data).where(eq(jobs.id, jobId)).returning();

        if (!job) {
            throw new Error("Job not found");
        }

        return job;
    }

    static async deleteJob( organization, jobId) {

        await db.delete(jobs).where(eq(jobs.id, jobId));

        return {
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