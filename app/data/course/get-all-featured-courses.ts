import "server-only";
import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export type FeaturedCourseType = Prisma.CourseGetPayload<{
  select: {
    id: true;
    title: true;
    slug: true;
    fileKey: true;
    duration: true;
    level: true;
    smallDescription: true;
    isFree: true;
  };
}>;

export async function getAllFeaturedCourses(): Promise<FeaturedCourseType[]> {
  return prisma.course.findMany({
    where: {
      isFeatured: true,
      isPublished: true,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      fileKey: true,
      duration: true,
      level: true,
      smallDescription: true,
      isFree: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
