"use client";

import { useDispatch, useSelector } from "react-redux";
import { StateProps } from "@/app/interface";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { resetCart } from "@/redux/ecommSlice";
import emptyCart from "@/assets/emptyCart.png";
import Image from "next/image";
import Link from "next/link";
import Price from "./Price";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";

const Cart = () => {
  const { productData } = useSelector((state: StateProps) => state.ecomm);
  const dispatch = useDispatch();
  const [totalAmt, setTotalAmt] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    let price = 0;
    productData.map((item) => {
      price += item?.price * item?.quantity;
      return price;
    });
    setTotalAmt(price);
  }, [productData]);

  const handleReset = () => {
    const confirmed = window.confirm("Are you sure to reset your Cart?");
    confirmed && dispatch(resetCart());
    toast.success("Cart reset successfull!");
  };

  // Stripe payment

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  const createCheckout = async () => {
    if (session?.user) {
      const stripe = await stripePromise;
      const response = await fetch("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "appication/json" },
        body: JSON.stringify({
          items: productData,
          email: session?.user?.email,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        stripe?.redirectToCheckout({ sessionId: data.id });
      }
    } else {
      toast.error("Please sign in to make Checkout");
    }
  };

  // console.log(productData);

  return (
    <div>
      {productData?.length > 0 ? (
        <div className='pb-20'>
          <div className='w-full h-20 bg-[#f5f7f7] text-primeColor hidden lg:grid grid-cols-5 place-content-center px-6 text-lg font-semibold'>
            <h2 className='col-span-2'>Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>
          <div className='mt-5'>
            {productData.map((item) => (
              <div key={item?._id}>
                <CartItem item={item} />
              </div>
            ))}
          </div>
          <button
            onClick={handleReset}
            className='py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300'
          >
            Reset cart
          </button>
          
          <div className='max-w-7xl gap-4 flex justify-end mt-4'>
            <div className='w-96 flex flex-col gap-4'>
              <h1 className='text-2xl font-semibold text-right'>Cart totals</h1>
              <div>
                <p className='flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium'>
                  Subtotal{" "}
                  <span>
                    <Price amount={totalAmt} />
                  </span>
                </p>
                <p className='flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium'>
                  Shipping Charge
                  <span className='font-semibold tracking-wide font-titleFont'>
                    <Price amount={0} />
                  </span>
                </p>
                <p className='flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium'>
                  Total
                  <span className='font-bold tracking-wide text-lg font-titleFont'>
                    <Price amount={totalAmt} />
                  </span>
                </p>
              </div>
              <div className='flex justify-end'>
                <button
                  onClick={createCheckout}
                  className='w-52 h-10 bg-black text-white hover:bg-black duration-300'
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col md:flex-row justify-center items-center gap-4 pb-20'>
          <div>
            <Image
              src={emptyCart}
              alt='emptyCart'
              className='w-80 rounded-lg p-4 mx-auto'
            />
          </div>
          <div className='max-w-[500px] p-4 py-8 bg-white flex flex-col gap-4 items-center rounded-md shadow-lg'>
            <h1 className='text-xl font-bold uppercase'>
              Your Cart feels lonely.
            </h1>
            <p className='text-sm text-center px-10 -mt-2'>
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link
              href={"/"}
              className='bg-black rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-semibold text-lg text-gray-200 hover:text-white duration-300'
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;
