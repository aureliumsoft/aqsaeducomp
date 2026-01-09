import { prisma } from "@/lib/db";
import { PublicCourseType } from "./get-all-courses";

export async function getAllFeaturedCourses(): Promise<PublicCourseType[]> {
  return prisma.course.findMany({
    where: {
      isFeatured: true,
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
      category: true,
      price: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
