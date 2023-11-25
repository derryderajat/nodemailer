const prisma = require("./mailer.models");

const prismaClient = prisma;
const userModel = prisma.users;
const linkModel = prisma.links;
module.exports = { userModel, linkModel, prismaClient };
