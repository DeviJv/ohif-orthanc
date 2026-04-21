"use server";

import { prisma } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getRolesWithPermissions() {
  try {
    const roles = await prisma.role.findMany({
      include: {
        permissions: true,
        _count: {
          select: { users: true }
        }
      },
      orderBy: {
        name: "asc",
      },
    });
    return { success: true, data: roles };
  } catch (error) {
    return { success: false, error: "Failed to fetch roles" };
  }
}

export async function getPermissions() {
  try {
    const perms = await prisma.permission.findMany({
      orderBy: { name: "asc" },
    });
    return { success: true, data: perms };
  } catch (error) {
    return { success: false, error: "Failed to fetch permissions" };
  }
}

export async function upsertRole(data: any) {
  try {
    const { id, name, permissionIds } = data;

    if (id) {
      await prisma.role.update({
        where: { id },
        data: {
          name,
          permissions: {
            set: permissionIds.map((id: string) => ({ id })),
          },
        },
      });
    } else {
      await prisma.role.create({
        data: {
          name,
          permissions: {
            connect: permissionIds.map((id: string) => ({ id })),
          },
        },
      });
    }

    revalidatePath("/admin/roles");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to save role" };
  }
}

export async function deleteRole(id: string) {
  try {
    const role = await prisma.role.findUnique({
      where: { id },
      include: { _count: { select: { users: true } } }
    });

    if (role?.name === 'ROOT') {
        return { success: false, error: "Cannot delete ROOT role" };
    }

    if (role?._count.users && role._count.users > 0) {
      return { success: false, error: "Cannot delete role with assigned users" };
    }

    await prisma.role.delete({
      where: { id },
    });

    revalidatePath("/admin/roles");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete role" };
  }
}
