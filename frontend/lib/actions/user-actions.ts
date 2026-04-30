"use server";

import { prisma, auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      include: {
        role: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, data: users };
  } catch (error) {
    return { success: false, error: "Failed to fetch users" };
  }
}

export async function getRoles() {
  try {
    const roles = await prisma.role.findMany({
      orderBy: { name: "asc" },
    });
    return { success: true, data: roles };
  } catch (error) {
    return { success: false, error: "Failed to fetch roles" };
  }
}

export async function createUser(data: any) {
  try {
    const { name, email, password, roleId } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        roleId,
      },
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { success: false, error: "Email already exists" };
    }
    return { success: false, error: "Failed to create user" };
  }
}

export async function updateUser(id: string, data: any) {
  try {
    const { name, email, password, roleId } = data;
    const updateData: any = { name, email, roleId };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    await prisma.user.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update user" };
  }
}

export async function deleteUser(id: string) {
  try {
    // Prevent deleting the last ROOT user? 
    const userToDelete = await prisma.user.findUnique({
        where: { id },
        include: { role: true }
    });

    if (userToDelete?.role?.name === 'ROOT') {
        const rootCount = await prisma.user.count({
            where: { role: { name: 'ROOT' } }
        });
        if (rootCount <= 1) {
            return { success: false, error: "Cannot delete the last ROOT user" };
        }
    }

    await prisma.user.delete({
      where: { id },
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete user" };
  }
}

export async function verifyPassword(password: string) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: "Unauthorized" };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || !user.password) {
      return { success: false, error: "User not found" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    return { success: isPasswordValid };
  } catch (error) {
    return { success: false, error: "Failed to verify password" };
  }
}
