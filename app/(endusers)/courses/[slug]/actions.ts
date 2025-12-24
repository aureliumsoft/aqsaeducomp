"use server";

import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { stripe } from "@/lib/stripe";
import { ApiResponse } from "@/lib/types";
import { redirect } from "next/navigation";

export async function enrollInCourseAction(
  courseId: string
): Promise<ApiResponse> | never {
  const user = await requireUser();

  let checkoutUrl: string;

  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: { id: true, title: true, price: true, stripePriceId: true },
    });

    if (!course || !course.stripePriceId) {
      return { status: "error", message: "Course or payment config not found" };
    }

    let stripeCustomerId: string;
    const userWithStripeCustomerId = await prisma.user.findUnique({
      where: { id: user.id },
      select: { stripeCustomerId: true },
    });

    if (userWithStripeCustomerId?.stripeCustomerId) {
      stripeCustomerId = userWithStripeCustomerId.stripeCustomerId;
    } else {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: { userId: user.id },
      });
      stripeCustomerId = customer.id;
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId },
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      // Check if already enrolled
      const existingEnrolment = await tx.enrolment.findUnique({
        where: { courseId_userId: { courseId, userId: user.id } },
        select: { id: true, status: true },
      });

      if (existingEnrolment?.status === "Active") {
        return { alreadyEnrolled: true };
      }

      // Create or update enrolment as Pending
      const enrolment = existingEnrolment
        ? await tx.enrolment.update({
            where: { id: existingEnrolment.id },
            data: {
              amount: course.price,
              status: "Pending",
              updatedAt: new Date(),
            },
          })
        : await tx.enrolment.create({
            data: {
              userId: user.id,
              courseId,
              amount: course.price,
              status: "Pending",
            },
          });

      // Create Stripe Checkout
      const checkoutSession = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        line_items: [{ price: course.stripePriceId, quantity: 1 }],
        mode: "payment",
        success_url: `${env.BETTER_AUTH_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${env.BETTER_AUTH_URL}/payment/cancel`,
        metadata: {
          enrolmentId: enrolment.id.toString(),
          userId: user.id,
          courseId: course.id,
        },
      });

      return { checkoutUrl: checkoutSession.url };
    });

    if ((result as any).alreadyEnrolled) {
      return {
        status: "success",
        message: "You are already enrolled in this course",
      };
    }

    checkoutUrl = (result as any).checkoutUrl;
  } catch (error) {
    console.error("Enroll Error:", error);
    return { status: "error", message: "Failed to enroll in course" };
  }

  redirect(checkoutUrl);
}
