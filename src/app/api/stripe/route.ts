import { fullProduct } from "@/app/interface";
import { NextResponse } from "next/server";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request, res: Response) {
  const cartItems = (await req.json()) as fullProduct[];
  const origin = req.headers.get("origin");

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: cartItems.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.images[0].url],
          },
          unit_amount: parseInt((item.price * 100).toString()),
        },
      })),
      payment_method_types: ["card"],
      billing_address_collection: "required",
      mode: "payment",
      success_url: `${origin}/success`,
    });

    return NextResponse.json(session, {
      status: 200,
      statusText: "payment successful",
    });
  } catch (error: any) {
    console.log("Error", error);
    return new NextResponse(error, { status: 500 });
  }
}
