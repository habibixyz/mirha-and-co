import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const apiKey = process.env.DODO_PAYMENTS_API_KEY;
    const productId = process.env.NEXT_PUBLIC_DODO_PRODUCT_ID;

    if (!apiKey || apiKey === "dodo_api_key_placeholder") {
      return NextResponse.json({ error: "Dodo Payments API Key is not configured" }, { status: 500 });
    }
    if (!productId) {
      return NextResponse.json({ error: "Dodo Payments Product ID is not configured" }, { status: 500 });
    }

    // Detect if we should use test or live endpoint based on API key prefix
    const baseUrl = apiKey.startsWith("test_") 
      ? "https://test.dodopayments.com" 
      : "https://live.dodopayments.com";

    const returnUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.mirhaandco.com"}/dashboard/subscription`;

    const response = await fetch(`${baseUrl}/checkouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        product_cart: [
          {
            product_id: productId,
            quantity: 1,
          },
        ],
        customer: {
          email: user.email,
          name: user.name || "Customer",
        },
        return_url: returnUrl,
        metadata: {
          userId: user.id,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Dodo Payments checkout session creation failed:", data);
      return NextResponse.json({ error: data.message || "Failed to create checkout session" }, { status: response.status });
    }

    return NextResponse.json({
      checkoutUrl: data.checkout_url,
    });
  } catch (error: any) {
    console.error("Dodo Payments Checkout Error:", error);
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}
