import { NextResponse } from "next/server";
import { createB2BRetrievalToken } from "@/lib/b2bRetrievalToken";
import { redisRateLimit, getClientIp } from "@/lib/redisRateLimit";

/* ─── Per-IP rate limiter: max 10 checkout initiations/min (fixed window, Redis-backed) ─── */

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);

    if (await redisRateLimit(`rl:dodo-b2b-checkout:${ip}`, 10, 60)) {
      return NextResponse.json(
        { error: "Too many checkout requests. Please slow down." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { tier = "growth", billing = "monthly", email, brandName } = body;

    if (!email || !brandName) {
      return NextResponse.json(
        { error: "email and brandName are required" },
        { status: 400 }
      );
    }

    if (!["growth", "scale"].includes(tier)) {
      return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
    }

    const apiKey = process.env.DODO_PAYMENTS_API_KEY;
    
    // Select the correct product ID based on tier AND billing period
    let productId = "";
    if (billing === "annual") {
      productId = tier === "scale"
        ? process.env.DODO_B2B_SCALE_ANNUAL_PRODUCT_ID || ""
        : process.env.DODO_B2B_GROWTH_ANNUAL_PRODUCT_ID || "";
    } else {
      productId = tier === "scale"
        ? process.env.DODO_B2B_SCALE_PRODUCT_ID || ""
        : process.env.DODO_B2B_GROWTH_PRODUCT_ID || "";
    }

    if (!apiKey || !productId) {
      return NextResponse.json(
        { error: "Dodo Payments API Key or B2B Product ID is not configured" },
        { status: 500 }
      );
    }

    const baseUrl = apiKey.startsWith("test_") 
      ? "https://test.dodopayments.com" 
      : "https://live.dodopayments.com";

    // Where to send them after successful payment
    const returnUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.mirhaandco.com"}/b2b/dashboard?welcome=true`;

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
          email: email,
          name: brandName,
        },
        return_url: returnUrl,
        metadata: {
          b2b_email: email,
          b2b_brand: brandName,
          b2b_tier: tier,
          b2b_billing: billing,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Dodo Payments B2B checkout session creation failed:", data);
      return NextResponse.json(
        { error: data.message || "Failed to create checkout session" },
        { status: response.status }
      );
    }

    return NextResponse.json({
      checkoutUrl: data.checkout_url,
      retrievalToken: createB2BRetrievalToken(email),
    });
  } catch (error: any) {
    console.error("Dodo Payments B2B Checkout Error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
