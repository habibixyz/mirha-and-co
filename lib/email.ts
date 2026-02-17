import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderEmail(data: {
  product_name: string;
  amount: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
}) {
  await resend.emails.send({
    from: "Mirha & Co <tanvir@mirhaandco.com>",
    to: "tanvir@mirhaandco.com",
    subject: `New Order — ${data.product_name}`,
    html: `
      <h2>New Order Received</h2>
      <p><strong>Product:</strong> ${data.product_name}</p>
      <p><strong>Amount:</strong> ₹${data.amount}</p>
      <p><strong>Name:</strong> ${data.customer_name}</p>
      <p><strong>Email:</strong> ${data.customer_email}</p>
      <p><strong>Phone:</strong> ${data.customer_phone}</p>
      <p><strong>Address:</strong> ${data.customer_address}</p>
    `,
  });
}
