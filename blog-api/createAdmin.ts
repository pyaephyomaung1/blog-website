import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "05DPiqnPYj3o";

async function createAdminUser() {
  try {
    console.log("Connecting to database");
    await prisma.$connect();
    console.log("Database Connected");

    const existingAdmin = await prisma.user.findFirst({
      where: { username: ADMIN_USERNAME },
    });

    if (existingAdmin) {
      console.log(`Admin user ${ADMIN_USERNAME} is already exists.`);
      return;
    }
    console.log(`Hashing Password for ${ADMIN_USERNAME}`);
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    const newAdmin = await prisma.user.create({
      data: {
        id: uuidv4(),
        username: ADMIN_USERNAME,
        password: hashedPassword,
      },
    });
    console.log("----------------------------------------------------");
    console.log(`🎉 Admin user "${newAdmin.username}" created successfully!`);
    console.log(`   ID: ${newAdmin.id}`);
    console.log("   Please remember your username and password.");
    console.log(
      "   !!! IMPORTANT: DELETE OR COMMENT OUT THIS SCRIPT AFTER RUNNING IT IN PRODUCTION !!!"
    );
    console.log("----------------------------------------------------");
  } catch (error: any) {
    console.error("❌ Error creating admin user:", error.message);
    if (error.code === "P2002") {
      // Prisma unique constraint violation code
      console.error(
        "This username might already exist or there was a unique constraint error."
      );
    }
    console.error(error.stack);
  } finally {
    await prisma.$disconnect();
    console.log("Database disconnected.");
  }
}


createAdminUser();