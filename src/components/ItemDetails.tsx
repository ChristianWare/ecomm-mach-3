"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ItemDetails = ({ data }: any) => {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(data.price);

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      setPrice(Number((newQuantity * data.price).toFixed(2)));
    }
  };

  const handleIncrease = () => {
    if (quantity < data.quantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      setPrice(Number((newQuantity * data.price).toFixed(2)));
    }
  };

  return (
    <div>
      <div className='mb-2 md:mb-3'>
        <span className='mb-0.5 inline-block text-gray-500'>
          {data.categoryName}
        </span>
        <h2 className='text-2xl font-bold text-gray-800 lg:text-3xl'>
          {data.name}
        </h2>
      </div>

      <div className='mb-6 flex items-center gap-3 md:mb-10'>
        <button className='rounded-full gap-x-2'>
          <span className='text-sm'>4.2</span>
        </button>

        <span className='text-sm text-gray-500 transition duration-100'>
          56 Ratings
        </span>
      </div>

      <div className='mb-4'>
        <div className='flex items-end gap-2'>
          <span className='text-xl font-bold text-gray-800 md:text-2xl'>
            ${price}
          </span>
          {/* <span className='mb-0.5 text-red-500 line-through'>
            ${data.price + 30}
          </span> */}
        </div>
        {data.quantity < 10 && (
          <div className='texat-sm text-red-500'>
            Only {data.quantity} left!
          </div>
        )}
        <span className='texat-sm text-gray-500'>Incl. Vat plus shipping</span>
      </div>

      <div className='mb-6 flex items-center gap-2 text-gray-500'>
        <span className='text-sm'>2-4 Day Shipping</span>
      </div>
      <div className='flex items-center justify-center gap-5'>
        <button onClick={handleDecrease} disabled={quantity === 1}>
          -
        </button>
        <input
          type='text'
          className='border outline-none border-gray-300 rounded px-2 py-1 text-center w-12'
          value={quantity}
          readOnly
        />
        <button onClick={handleIncrease} disabled={quantity === data.quantity}>
          +
        </button>
        <button
          onClick={() => {
            // dispatch(addToCart(data));
            toast.success(`${data?.name.substring(0, 12)}... added to cart`);
          }}
          className='w-full py-4 bg-black text-white text-lg rounded-md'
          disabled={quantity === 0}
        >
          Add to Cart
        </button>
      </div>

      <p className='mt-12 text-base text-gray-500 tracking-wide'>
        {data.description}
      </p>
      <Toaster
        position='bottom-right'
        toastOptions={{
          style: {
            background: "#000",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};
export default ItemDetails;
