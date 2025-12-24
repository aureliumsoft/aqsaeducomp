// app/api/stripe/webhook/route.ts
"use server";

import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { env } from "@/lib/env";

export const POST = async (req: NextRequest) => {
  const buf = await req.arrayBuffer();
  const sig = req.headers.get("Stripe-Signature")!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(buf),
      sig,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const enrolmentId = session.metadata.enrolmentId.toString();

    if (enrolmentId) {
      await prisma.enrolment.update({
        where: { id: enrolmentId },
        data: { status: "Active" },
      });
      console.log(`Enrolment ${enrolmentId} marked as Active.`);
    }
  }

  return NextResponse.json({ received: true });
};
