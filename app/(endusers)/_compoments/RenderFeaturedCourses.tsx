import "server-only";
import { getAllFeaturedCourses } from "@/app/data/course/get-all-featured-courses";
import { EmptyState } from "@/components/general/EmptyState";
import { PublicCourseCard } from "../courses/_components/PublicCourseCard";

export async function RenderFeaturedCourses() {
  const courses = await getAllFeaturedCourses();

  return (
    <>
      {/* All Courses View */}
      {courses.length === 0 ? (
        <EmptyState
          title="No Featured Courses Found"
          description="There are no courses available publically"
          buttonText="See All Courses"
          href="/courses"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {courses.map((course) => (
            <PublicCourseCard key={course.id} data={course} />
          ))}
        </div>
      )}
    </>
  );
}
