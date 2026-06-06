const { applicationStatuses } = require("./applicationStatuses.schema");
const { applications } = require("./applications.schema");
const { certificates } = require("./certificates.schema");
const { connectionStatuses } = require("./connectionStatuses.schema");
const { connections } = require("./connections.schema");
const { controlLevel } = require("./controlLevel.schema");
const { documentTypes } = require("./documentTypes.schema");
const { documents } = require("./documents.schema");
const { eventParticipants } = require("./eventParticipants.schema");
const { events } = require("./events.schema");
const { jobs } = require("./jobs.schema");
const { media } = require("./media.schema");
const { messages } = require("./messages.schema");
const { notifications } = require("./notification.schema");
const { organizations } = require("./organization.schema");
const { organizationMembers } = require("./organizationMembers.schema");
const { organizationRefreshTokens } = require("./organizationRefreshToken.schema");
const { organizationRole } = require("./organizationRoles.schema");
const { organizationTypes } = require("./organizationTypes.schema");
const { organizationVerificationStatuses } = require("./organizationVerificationStatuses.schema");
const { refreshTokens } = require("./refreshToken.schema");
const { systemRoles } = require("./systemRoles.schema");
const { users } = require("./user.scehma");
const { userStatuses } = require("./userStatuses.schema");
const { userSystemRoles } = require("./userSystemRoles.schema");
const { verificationRequestes } = require("./verificationRequests.schema");
const { verificationStatuses } = require("./verificationStatuses.schema");

module.exports = {
    applicationStatuses,
    applications,
    certificates,
    connectionStatuses,
    connections,
    controlLevel,
    documentTypes,
    documents,
    eventParticipants,
    events,
    jobs,
    media,
    messages,
    notifications,
    organizations,
    organizationMembers,
    organizationRefreshTokens,
    organizationRole,
    organizationTypes,
    organizationVerificationStatuses,
    refreshTokens,
    systemRoles,
    users,
    userStatuses,
    userSystemRoles,
    verificationRequestes,
    verificationStatuses,
};