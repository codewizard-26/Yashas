const { eq } = require("drizzle-orm");

const { db } = require("../db");
const { organizations } = require("../schemas/organization.schema");

class OrganizationService {
    static async create(data) {
        const [organization] = await db
            .insert(organizations)
            .values({
                organizationTypeId: data.organizationTypeId,
                parentOrganizationId: data.parentOrganizationId,
                name: data.name,
                email: data.email,
                passwordHash: data.passwordHash,
                phone: data.phone,
                address: data.address,
                logo: data.logo,
                description: data.description,
                website: data.website,
                organizationVerificationStatusId:
                    data.organizationVerificationStatusId,
            })
            .returning();

        return organization;
    }

    static async getAll() {
        return await db
            .select()
            .from(organizations);
    }

    static async getById(id) {
        const [organization] = await db
            .select()
            .from(organizations)
            .where(eq(organizations.id, id));

        if (!organization) {
            throw new Error("Organization not found");
        }

        return organization;
    }

    static async update(id, data) {
        const [organization] = await db
            .update(organizations)
            .set(data)
            .where(eq(organizations.id, id))
            .returning();

        if (!organization) {
            throw new Error("Organization not found");
        }

        return organization;
    }

    static async remove(id) {
        const [organization] = await db
            .delete(organizations)
            .where(eq(organizations.id, id))
            .returning();

        if (!organization) {
            throw new Error("Organization not found");
        }

        return organization;
    }
}

module.exports = OrganizationService;