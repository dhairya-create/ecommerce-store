"use client";
import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import Currency from "@/components/ui/Currency";
import useCart from "@/hooks/useCart";
import toast from "react-hot-toast";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment Completed");
      removeAll();
    }
    if (searchParams.get("canceled")) {
      toast.error("Something went wrong"); // Changed to error message
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onCheckOut = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          productIds: items.map((item) => item.id),
        }
      );

      // Redirect to the checkout URL
      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Checkout failed. Please try again.");
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      {items.length === 0 ? (
        <p className="mt-6 text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <div className="text-base font-medium text-gray-900">
                Order total
              </div>
              <Currency value={totalPrice} />
            </div>
          </div>

          <Button
            disabled={items.length === 0}
            onClick={onCheckOut}
            className="w-full mt-6 bg-black text-white text-center flex justify-center items-center"
          >
            Checkout
          </Button>
        </>
      )}
    </div>
  );
};

export default Summary;
