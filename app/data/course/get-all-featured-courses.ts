import "server-only";

import { prisma } from "@/lib/db";

export async function getAllFeaturedCourses() {
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const data = await prisma.course.findMany({
    where: {
      status: "Published",
      isFeatured: true,
    },
    select: {
      title: true,
      price: true,
      smallDescription: true,
      slug: true,
      fileKey: true,
      id: true,
      level: true,
      duration: true,
      category: true,
      isFree: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 3,
  });

  return data;
}

export type PublicFeaturedCourseType = Awaited<
  ReturnType<typeof getAllFeaturedCourses>
>[0];
