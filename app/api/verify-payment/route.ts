import { sendOrderEmail } from "@/lib/email";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    product_id,
    customer_name,
    customer_email,
    customer_phone,
    customer_address,
  } = body;

  // 1️⃣ Verify Razorpay signature here (you should already have this)

  // 2️⃣ Connect to Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 3️⃣ Get product
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", product_id)
    .single();

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  // 4️⃣ Update stock to 0 (since it's 1/1)
  await supabase
    .from("products")
    .update({ stock: 0 })
    .eq("id", product_id);

  // 5️⃣ Send Email Notification
  await sendOrderEmail({
    product_name: product.name,
    amount: product.price,
    customer_name,
    customer_email,
    customer_phone,
    customer_address,
  });

  return Response.json({ success: true });
}
