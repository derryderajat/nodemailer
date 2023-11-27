const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const prismaClient = prisma;
const userModel = prisma.users;
const linkModel = prisma.links;
module.exports = { userModel, linkModel, prismaClient };
