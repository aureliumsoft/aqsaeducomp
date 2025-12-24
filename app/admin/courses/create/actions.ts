"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchema";
import { headers } from "next/headers";
import { JSONContent } from "@tiptap/react";
import { tiptapToPlainText } from "@/lib/tiptapToPlainText";

export async function CreateCourse(
  data: CourseSchemaType
): Promise<ApiResponse> {
  const session = await requireAdmin();

  try {
    if (!session) {
      return {
        status: "error",
        message: "User not authenticated",
      };
    }
    const validation = courseSchema.safeParse(data);

    const json: JSONContent = JSON.parse(validation.data?.description || "");

    const plainTextDescription = tiptapToPlainText(json);

    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid form data",
      };
    }

    const stripeProduct = await stripe.products.create({
      name: validation.data.title,
      description: plainTextDescription,
      default_price_data: {
        currency: "pkr",
        unit_amount: validation.data.price * 100,
      },
    });

    await prisma.course.create({
      data: {
        userId: session?.user.id as string,
        stripePriceId: stripeProduct.default_price as string,
        ...validation.data,
      },
    });

    return {
      status: "success",
      message: "Course created successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to create course",
    };
  }
}
