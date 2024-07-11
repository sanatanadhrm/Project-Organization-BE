
const prisma = require('@prisma/client');

const mysql = new prisma.PrismaClient();

module.exports = mysql;