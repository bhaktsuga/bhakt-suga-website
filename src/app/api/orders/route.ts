import { db } from "@/db";
import { orders } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, customerPhone, shippingAddress, city, zip, items, totalAmount, paymentUtr } = body;

    if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !city || !zip || !items || !totalAmount || !paymentUtr) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const [inserted] = await db.insert(orders).values({
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      city,
      zip,
      items,
      totalAmount: totalAmount.toString(),
      paymentUtr,
      status: "pending",
    }).returning({ id: orders.id });

    return NextResponse.json({ success: true, orderId: inserted.id });
  } catch (error: any) {
    console.error("Order insertion error:", error);
    return NextResponse.json({ error: "Failed to place order. Please try again." }, { status: 500 });
  }
}
