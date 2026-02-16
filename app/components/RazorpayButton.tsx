"use client";

interface RazorpayButtonProps {
  amount: number;
  productName: string;
}

export default function RazorpayButton({
  amount,
  productName,
}: RazorpayButtonProps) {
  const handlePayment = async () => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Your public key
      amount: amount * 100, // Razorpay uses paise
      currency: "INR",
      name: "Mirha & Co.",
      description: productName,
      handler: function (response: any) {
        alert("Payment successful!");
        console.log(response);
      },
      theme: {
        color: "#000000",
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full py-4 border border-black hover:bg-black hover:text-white transition duration-300 tracking-widest text-sm"
    >
      ACQUIRE
    </button>
  );
}
