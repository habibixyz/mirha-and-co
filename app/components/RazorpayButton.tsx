"use client";

import { useState } from "react";

interface RazorpayButtonProps {
  amount: number;
  productName: string;
}

export default function RazorpayButton({
  amount,
  productName,
}: RazorpayButtonProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      alert("Please fill all fields.");
      return;
    }

    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const order = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Mirha & Co.",
      description: productName,
      order_id: order.id,
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },
      notes: {
        address: form.address,
      },
      handler: async function (response: any) {
        await fetch("/api/send-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            customer: form,
            product: productName,
            amount,
          }),
        });

        alert("Payment successful. We will contact you shortly.");
      },
      theme: {
        color: "#000000",
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div className="space-y-6 mt-10">

      <input
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        className="w-full border border-neutral-300 p-3 text-sm"
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full border border-neutral-300 p-3 text-sm"
      />

      <input
        name="phone"
        placeholder="Phone Number"
        onChange={handleChange}
        className="w-full border border-neutral-300 p-3 text-sm"
      />

      <textarea
        name="address"
        placeholder="Shipping Address"
        rows={4}
        onChange={handleChange}
        className="w-full border border-neutral-300 p-3 text-sm"
      />

      <button
        onClick={handlePayment}
        className="w-full py-4 border border-black hover:bg-black hover:text-white transition duration-300 tracking-widest text-sm"
      >
        ACQUIRE
      </button>
    </div>
  );
}
