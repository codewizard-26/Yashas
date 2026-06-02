require("dotenv").config();
const {db} = require("../config/db");
const { organizationTypes } = require("./schema/organizationTypes.schema");
const { organizationRole } = require("./schema/organizationRoles.schema");
const { controlLevel } = require("./schema/controlLevel.schema");
const { userStatuses } = require("./schema/userStatuses.schema");
const { verificationStatuses } = require("./schema/verificationStatuses.schema");
const { organizationVerificationStatuses } = require("./schema/organizationVerificationStatuses.schema");
const { connectionStatuses } = require("./schema/connectionStatuses.schema");
const { applicationStatuses } = require("./schema/applicationStatuses.schema");
const { systemRoles } = require("./schema/systemRoles.schema");

async function seed() {
  try {
    console.log("🌱 Starting seed...");

    // Organization Types
    await db.insert(organizationTypes).values([
        {
          typeName: "University",
          description: "University Organization",
        },
        {
          typeName: "College",
          description: "College Organization",
        },
        {
          typeName: "Department",
          description: "Department",
        },
        {
          typeName: "Company",
          description: "Company",
        },
        {
          typeName: "Committee",
          description: "Committee",
        },
        {
            typeName: "Counsil",
            description: "Counsil"
        }
      ]).onConflictDoNothing();

    // Organization Roles
    await db.insert(organizationRole).values([
        { roleName: "Student" },
        { roleName: "Intern" },
        { roleName: "Employee" },
        { roleName: "Recruiter" },
        { roleName: "Verifier" },
        { roleName: "Committee Lead" },
        { roleName: "Coordinator" },
      ]).onConflictDoNothing();

    // Control Levels
    await db.insert(controlLevel).values([
        {
          levelName: "SuperAdmin",
          hierarchyRank: 1,
        },
        {
          levelName: "Admin",
          hierarchyRank: 2,
        },
        {
          levelName: "Moderator",
          hierarchyRank: 3,
        },
        {
          levelName: "Member",
          hierarchyRank: 4,
        },
        {
          levelName: "Viewer",
          hierarchyRank: 5,
        },
      ]).onConflictDoNothing();

    // User Statuses
    await db.insert(userStatuses).values([
        { statusName: "Active" },
        { statusName: "Inactive" },
        { statusName: "Suspended" },
        { statusName: "Deleted" },
      ]).onConflictDoNothing();

    // Certificate Verification Statuses
    await db.insert(verificationStatuses).values([
        { statusName: "Pending" },
        { statusName: "UnderReview" },
        { statusName: "Verified" },
        { statusName: "Rejected" },
      ]).onConflictDoNothing();

    // Organization Verification Statuses
    await db.insert(organizationVerificationStatuses).values([
        { statusName: "Pending" },
        { statusName: "Verified" },
        { statusName: "Rejected" },
        { statusName: "Suspended" },
        { statusName: "Blacklisted" },
      ]).onConflictDoNothing();

    // Connection Statuses
    await db.insert(connectionStatuses).values([
        { statusName: "Pending" },
        { statusName: "Accepted" },
        { statusName: "Rejected" },
        { statusName: "Blocked" },
      ]).onConflictDoNothing();

    // Application Statuses
    await db.insert(applicationStatuses).values([
        { statusName: "Applied" },
        { statusName: "Shortlisted" },
        { statusName: "Interviewing" },
        { statusName: "Selected" },
        { statusName: "Rejected" },
        { statusName: "Withdrawn" },
      ]).onConflictDoNothing();

    //System Roles
    await db.insert(systemRoles).values([
        {
          roleName: "PlatformAdmin",
          description: "Full platform access",
        },
        {
          roleName: "PlatformModerator",
          description: "Moderation privileges",
        },
        {
          roleName: "SupportAgent",
          description: "Support and issue handling",
        },
      ]).onConflictDoNothing();


    console.log("✅ Seed completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed");
    console.error(error);
    process.exit(1);
  }
}

seed();